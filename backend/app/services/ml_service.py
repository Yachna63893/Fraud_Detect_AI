import os
from typing import List, Dict, Optional, Any

import pandas as pd
import joblib
from pathlib import Path

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))


def _csv_path(rel_path: str) -> str:
    return os.path.join(ROOT, rel_path)


def _load_csv_records(rel_path: str, limit: Optional[int] = None) -> List[Dict[str, Any]]:
    path = _csv_path(rel_path)
    if not os.path.exists(path):
        return []
    df = pd.read_csv(path)
    if limit is not None:
        df = df.head(limit)
    return df.fillna("").to_dict(orient="records")


def _load_df(rel_path: str) -> Optional[pd.DataFrame]:
    path = _csv_path(rel_path)
    if not os.path.exists(path):
        return None
    return pd.read_csv(path)


def get_anomaly(limit: Optional[int] = 100) -> List[Dict[str, Any]]:
    return _load_csv_records(os.path.join("ml-service", "Anomaly", "anomaly_output.csv"), limit)


def get_credit(limit: Optional[int] = 100) -> List[Dict[str, Any]]:
    return _load_csv_records(os.path.join("ml-service", "Credit", "fraud_predictions_creditcard.csv"), limit)


def get_ecom(limit: Optional[int] = 100) -> List[Dict[str, Any]]:
    return _load_csv_records(os.path.join("ml-service", "Ecom", "ecom_fraud_predictions.csv"), limit)


def get_upi(limit: Optional[int] = 100) -> List[Dict[str, Any]]:
    return _load_csv_records(os.path.join("ml-service", "UPI", "fraud_predictions_upi.csv"), limit)


def _prob_to_risk(prob: float) -> str:
    if prob >= 0.8:
        return "HIGH"
    if prob >= 0.5:
        return "MEDIUM"
    return "LOW"


def _safe_number(x: Any) -> float:
    try:
        return float(x)
    except Exception:
        return 0.0


def predict(domain: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """Lightweight real-time predictor.

    Strategy:
    - If model artifacts exist (not implemented), use them.
    - Otherwise compute a heuristic score using amount vs dataset statistics or use stored fraud_probability columns.
    """
    domain = (domain or "").lower()
    amount = _safe_number(payload.get("amount") or payload.get("amt") or 0)

    # Default low probability
    prob = 0.02
    reason = "Heuristic default: insufficient data"

    # Attempt to load a saved model for the domain (joblib).
    # Map domain -> folder name in ml-service to handle cases like UPI (uppercase)
    domain_to_folder = {
        "upi": "UPI",
        "credit": "Credit",
        "card": "Credit",
        "ecom": "Ecom",
        "e-commerce": "Ecom",
        "anomaly": "Anomaly",
    }
    folder = domain_to_folder.get(domain, domain.capitalize())
    model_path = Path(_csv_path(os.path.join("ml-service", folder, f"{domain}_model.joblib")))
    loaded_model = None
    try:
        if model_path.exists():
            loaded_model = joblib.load(str(model_path))
    except Exception:
        loaded_model = None

    if domain == "upi":
        df = _load_df(os.path.join("ml-service", "UPI", "fraud_predictions_upi.csv"))
        # If a model is available, try to use it for prediction
        if loaded_model is not None:
            try:
                X = pd.DataFrame([payload])
                probs = loaded_model.predict_proba(X)[:, 1]
                prob = float(probs[0])
                reason = "Model prediction (UPI)"
            except Exception:
                loaded_model = None
        if loaded_model is None:
            if df is not None and "fraud_probability" in df.columns:
                # use distribution to scale amount
                max_amt = df["amount"].max() if "amount" in df.columns else 1
                avg_prob = df["fraud_probability"].mean()
                denom = max(max_amt, amount, 1)
                prob = min(1.0, (amount / denom) * max(avg_prob * 3, 0.1))
                reason = "Scaled by amount vs historical UPI distribution"
            else:
                # fallback: linear scale with arbitrary cap
                prob = min(1.0, amount / max(amount, 100000))
                reason = "Scaled by amount (no dataset available)"

    elif domain == "credit" or domain == "card":
        df = _load_df(os.path.join("ml-service", "Credit", "fraud_predictions_creditcard.csv"))
        # Use loaded model if present
        if loaded_model is not None:
            try:
                X = pd.DataFrame([payload])
                probs = loaded_model.predict_proba(X)[:, 1]
                prob = float(probs[0])
                reason = "Model prediction (Credit)"
            except Exception:
                loaded_model = None

        if loaded_model is None:
            if df is not None and "fraud_probability" in df.columns:
                prob = float(df["fraud_probability"].mean())
                # small adjustment if amount provided
                if amount > 0:
                    prob = min(1.0, prob + (amount / (amount + 100000)) * 0.3)
                reason = "Estimate from historical credit model outputs"
            else:
                prob = min(0.9, 0.01 + (amount / (amount + 50000)))
                reason = "Heuristic credit scoring (no model available)"

    elif domain == "ecom" or domain == "e-commerce":
        df = _load_df(os.path.join("ml-service", "Ecom", "ecom_fraud_predictions.csv"))
        if loaded_model is not None:
            try:
                X = pd.DataFrame([payload])
                probs = loaded_model.predict_proba(X)[:, 1]
                prob = float(probs[0])
                reason = "Model prediction (Ecom)"
            except Exception:
                loaded_model = None

        if loaded_model is None:
            if df is not None and "fraud_probability" in df.columns:
                # try match by seller or order id if provided
                seller = payload.get("seller") or payload.get("vendor")
                if seller and "seller" in df.columns:
                    matches = df[df["seller"].astype(str).str.contains(str(seller))]
                    if len(matches) > 0:
                        prob = float(matches["fraud_probability"].mean())
                        reason = "Matched seller historical fraud probability"
                    else:
                        prob = float(df["fraud_probability"].mean())
                        reason = "Fallback to mean e-commerce fraud probability"
                else:
                    prob = float(df["fraud_probability"].mean())
                    reason = "Mean e-commerce fraud probability used"
            else:
                prob = min(0.95, 0.01 + (amount / (amount + 40000)))
                reason = "Heuristic ecom scoring (no model available)"

    elif domain == "anomaly":
        # use anomaly CSV: anomaly_score likely in 0-100
        df = _load_df(os.path.join("ml-service", "Anomaly", "anomaly_output.csv"))
        # try model prediction first if available
        if loaded_model is not None:
            try:
                X = pd.DataFrame([payload])
                probs = loaded_model.predict_proba(X)[:, 1]
                prob = float(probs[0])
                reason = "Model prediction (Anomaly)"
            except Exception:
                loaded_model = None

        if df is not None and "anomaly_score" in df.columns:
            # if origin and dest provided, try to find matching row
            orig = payload.get("nameOrig") or payload.get("origin")
            dest = payload.get("nameDest") or payload.get("dest")
            prob = 0.02
            if orig and dest and "nameOrig" in df.columns and "nameDest" in df.columns:
                matches = df[(df["nameOrig"] == orig) & (df["nameDest"] == dest)]
                if len(matches) > 0:
                    score = float(matches.iloc[0]["anomaly_score"] or 0) / 100.0
                    prob = min(1.0, score)
                    reason = "Matched historical anomaly score"
                else:
                    # use mean anomaly
                    prob = float(df["anomaly_score"].mean() / 100.0)
                    reason = "Mean anomaly score used"
            else:
                prob = float(df["anomaly_score"].mean() / 100.0)
                reason = "Mean anomaly score used"
        else:
            prob = 0.02
            reason = "No anomaly output available"

    else:
        prob = 0.01
        reason = "Unknown domain, default low probability"

    prob = float(max(0.0, min(1.0, prob)))
    risk = _prob_to_risk(prob)
    result = {
        "probability": prob,
        "risk": risk,
        "fraud": True if prob >= 0.5 else False,
        "reason": reason,
        "amount": amount,
        "input": payload,
    }

    return result
