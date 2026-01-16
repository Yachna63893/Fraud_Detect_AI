# ============================================================
# Fraud Detection - Credit Card Dataset (Supervised ML)
# File: fraud_detection.py
# ============================================================

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

print("Loading processed credit card data...")
df = pd.read_csv("processed_creditcard.csv")
print("Data shape:", df.shape)

# Features & target
X = df.drop(columns=['Class'])
y = df['Class']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=42
)

# Logistic Regression
print("\nTraining Logistic Regression...")
lr = LogisticRegression(
    max_iter=1000,
    class_weight='balanced',
    n_jobs=-1
)
lr.fit(X_train, y_train)
lr_preds = lr.predict(X_test)
lr_probs = lr.predict_proba(X_test)[:, 1]

print("\nLogistic Regression Results:")
print(classification_report(y_test, lr_preds))
print("ROC-AUC:", roc_auc_score(y_test, lr_probs))

# Random Forest
print("\nTraining Random Forest...")
rf = RandomForestClassifier(
    n_estimators=150,
    class_weight='balanced',
    random_state=42,
    n_jobs=-1
)
rf.fit(X_train, y_train)
rf_preds = rf.predict(X_test)
rf_probs = rf.predict_proba(X_test)[:, 1]

print("\nRandom Forest Results:")
print(classification_report(y_test, rf_preds))
print("ROC-AUC:", roc_auc_score(y_test, rf_probs))

# Fraud probability for ALL data
df['fraud_probability'] = rf.predict_proba(X)[:, 1]

# SAVE OUTPUT (IMPORTANT)
df.to_csv("fraud_predictions_creditcard.csv", index=False)

print("\nFraud detection completed.")
print("Saved: fraud_predictions_creditcard.csv")
