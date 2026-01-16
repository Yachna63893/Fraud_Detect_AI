# ============================================================
# Anomaly Detection with Explainability (UI Ready)
# File: anomaly_detection.py
# ============================================================

import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

# -----------------------------
# 1. Load Processed Data
# -----------------------------
print("Loading processed data...")
df = pd.read_csv("processed_data.csv")
print("Data shape:", df.shape)

# -----------------------------
# 2. Select Features for ML
# -----------------------------
# Keep identifiers for UI, remove them for ML
feature_cols = df.drop(
    columns=['nameOrig', 'nameDest', 'isFraud', 'isFlaggedFraud'],
    errors='ignore'
)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(feature_cols)

# -----------------------------
# 3. Train Isolation Forest
# -----------------------------
print("Training Isolation Forest...")

iso_forest = IsolationForest(
    n_estimators=150,
    contamination=0.001,
    random_state=42
)

iso_forest.fit(X_scaled)

# -----------------------------
# 4. Anomaly Score (Continuous)
# -----------------------------
# Higher score = more anomalous
df['anomaly_score_raw'] = -iso_forest.decision_function(X_scaled)

# Normalize to 0–100
df['anomaly_score'] = (
    (df['anomaly_score_raw'] - df['anomaly_score_raw'].min()) /
    (df['anomaly_score_raw'].max() - df['anomaly_score_raw'].min())
) * 100

# -----------------------------
# 5. Binary Anomaly Flag
# -----------------------------
df['is_anomaly'] = df['anomaly_score'].apply(lambda x: 1 if x >= 70 else 0)

# -----------------------------
# 6. Risk Level Assignment
# -----------------------------
def get_risk_level(score):
    if score >= 80:
        return "High"
    elif score >= 50:
        return "Medium"
    else:
        return "Low"

df['risk_level'] = df['anomaly_score'].apply(get_risk_level)

# -----------------------------
# 7. Explainability (Reason)
# -----------------------------
def get_reason(row):
    if row['anomaly_score'] >= 80:
        return "Unusual transaction pattern detected (high deviation from normal behavior)"
    elif row['anomaly_score'] >= 50:
        return "Moderate deviation from historical transaction behavior"
    else:
        return "Transaction behavior within normal range"

df['reason'] = df.apply(get_reason, axis=1)

# -----------------------------
# 8. Prepare UI-Ready Output
# -----------------------------
ui_columns = [
    'step',
    'nameOrig',      # UPI / Sender Account
    'nameDest',      # Receiver / Vendor
    'amount',
    'anomaly_score',
    'risk_level',
    'reason'
]

ui_df = df[ui_columns]

# -----------------------------
# 9. Save Output
# -----------------------------
ui_df.to_csv("anomaly_output.csv", index=False)

# Save scaler + model for real-time scoring
try:
    joblib.dump({"scaler": scaler, "model": iso_forest}, "anomaly_model.joblib")
    print("Saved model bundle: anomaly_model.joblib")
except Exception as e:
    print("Failed to save anomaly model:", e)

print("Anomaly detection completed successfully.")
print("UI-ready file generated: anomaly_output.csv")