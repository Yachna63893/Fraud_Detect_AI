# ============================================================
# Fraud Detection (Supervised ML)
# File: fraud_detection.py
# ============================================================

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# -----------------------------
# 1. Load Processed Data
# -----------------------------
print("Loading processed data...")
df = pd.read_csv("processed_data.csv")
print("Data shape:", df.shape)

# -----------------------------
# 2. Prepare Features & Target
# -----------------------------
# Keep nameOrig & nameDest for UI, remove them for ML
X = df.drop(
    columns=['isFraud', 'isFlaggedFraud', 'nameOrig', 'nameDest'],
    errors='ignore'
)
y = df['isFraud']

# -----------------------------
# 3. Train-Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.3,
    stratify=y,
    random_state=42
)

# -----------------------------
# 4. Train Random Forest Model
# -----------------------------
print("Training Random Forest fraud detection model...")

rf_model = RandomForestClassifier(
    n_estimators=120,
    class_weight='balanced',
    random_state=42,
    n_jobs=-1
)

rf_model.fit(X_train, y_train)

# -----------------------------
# 5. Model Evaluation
# -----------------------------
y_pred = rf_model.predict(X_test)

print("\nFraud Detection Model Evaluation:")
print(classification_report(y_test, y_pred))

# -----------------------------
# 6. Fraud Probability (for ALL records)
# -----------------------------
df['fraud_probability'] = rf_model.predict_proba(X)[:, 1]

# -----------------------------
# 7. Save Output
# -----------------------------
df.to_csv("fraud_predictions.csv", index=False)

print("Fraud detection completed successfully.")
print("fraud_predictions.csv generated.")