from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict

from app.services import ml_service

router = APIRouter()


@router.get("/", summary="Basic fraud route")
def get_fraud_cases():
    return {"message": "Fraud cases list"}


@router.get("/anomaly", response_model=List[Dict])
def get_anomalies(limit: int = Query(100, ge=1, le=1000)):
    data = ml_service.get_anomaly(limit)
    if data == []:
        raise HTTPException(status_code=404, detail="Anomaly output not found")
    return data


@router.get("/credit", response_model=List[Dict])
def get_credit_predictions(limit: int = Query(100, ge=1, le=1000)):
    data = ml_service.get_credit(limit)
    if data == []:
        raise HTTPException(status_code=404, detail="Credit predictions not found")
    return data


@router.get("/ecom", response_model=List[Dict])
def get_ecom_predictions(limit: int = Query(100, ge=1, le=1000)):
    data = ml_service.get_ecom(limit)
    if data == []:
        raise HTTPException(status_code=404, detail="Ecom predictions not found")
    return data


@router.get("/upi", response_model=List[Dict])
def get_upi_predictions(limit: int = Query(100, ge=1, le=1000)):
    data = ml_service.get_upi(limit)
    if data == []:
        raise HTTPException(status_code=404, detail="UPI predictions not found")
    return data



@router.post("/predict/{domain}")
def predict_domain(domain: str, payload: Dict):
    """Real-time prediction endpoint.

    domain: anomaly | credit | ecom | upi
    payload: JSON body containing transaction fields
    """
    domain = (domain or "").lower()
    if domain not in ("anomaly", "credit", "card", "ecom", "upi", "e-commerce"):
        raise HTTPException(status_code=400, detail="Unsupported domain for prediction")

    result = ml_service.predict(domain, payload)
    return result
