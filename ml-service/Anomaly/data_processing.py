# ============================================================
# Data Processing for PaySim (UI & ML Ready)
# File: data_processing.py
# ============================================================

import pandas as pd

# -----------------------------
# 1. Load Raw Dataset
# -----------------------------
print("Loading PaySim raw dataset...")
df = pd.read_csv("PS_20174392719_1491204439457_log.csv")
print("Original dataset shape:", df.shape)

# -----------------------------
# 2. Preserve Identifiers for UI
# -----------------------------
# IMPORTANT:
# nameOrig -> Sender account / UPI ID
# nameDest -> Receiver account / Vendor ID
# Do NOT drop these columns

# -----------------------------
# 3. Encode Transaction Type
# -----------------------------
# Convert 'type' categorical column into numeric
df = pd.get_dummies(df, columns=['type'], drop_first=True)

# -----------------------------
# 4. Handle Missing Values
# -----------------------------
# PaySim usually has no missing values,
# but this is added for safety
df.fillna(0, inplace=True)

# -----------------------------
# 5. Save Processed Dataset
# -----------------------------
df.to_csv("processed_data.csv", index=False)

print("Data processing completed successfully.")
print("Processed data saved as processed_data.csv")
print("Final dataset shape:", df.shape)