import pandas as pd

print("Loading fraud prediction data...")
df = pd.read_csv("fraud_predictions_creditcard.csv")
print("Data shape:", df.shape)

# Fraud probability is between 0 and 1
df['risk_score'] = df['fraud_probability'] * 100

def assign_risk_level(score):
    if score >= 75:
        return "High"
    elif score >= 40:
        return "Medium"
    else:
        return "Low"

df['risk_level'] = df['risk_score'].apply(assign_risk_level)

df['fraud_decision'] = df['risk_level'].apply(
    lambda x: "Fraud" if x == "High" else "Genuine"
)

df.to_csv("final_fraud_output_creditcard.csv", index=False)

print("Risk score generation completed.")
print("Final output saved as final_fraud_output_creditcard.csv")
