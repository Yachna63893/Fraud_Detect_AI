import pandas as pd
from sklearn.preprocessing import StandardScaler

print("Loading credit card dataset...")
df = pd.read_csv("creditcard.csv")
print("Original shape:", df.shape)
scaler = StandardScaler()
df['scaled_amount'] = scaler.fit_transform(df[['Amount']])

df.drop(columns=['Amount', 'Time'], inplace=True)

df.to_csv("processed_creditcard.csv", index=False)

print("Data processing completed.")
print("Processed data saved as processed_creditcard.csv")
