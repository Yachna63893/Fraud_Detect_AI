# ============================================================
# Data Processing - UPI Fraud Detection
# File: data_processing.py
# ============================================================

import pandas as pd

print("Loading UPI fraud dataset...")
df = pd.read_csv("upi_fraud.csv")
print("Original shape:", df.shape)

# -----------------------------
# Basic cleaning
# -----------------------------
df.fillna("Unknown", inplace=True)

# -----------------------------
# Encode categorical columns
# -----------------------------
categorical_cols = df.select_dtypes(include=['object']).columns
df = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

# -----------------------------
# Save processed dataset
# -----------------------------
df.to_csv("processed_upi_fraud.csv", index=False)

print("Data processing completed.")
print("Processed data saved as processed_upi_fraud.csv")
print("Final shape:", df.shape)