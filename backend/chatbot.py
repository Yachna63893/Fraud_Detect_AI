from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

QA = {
    "what does this fraud detection system do":
        "This system analyzes government financial transactions to detect anomalies, assess fraud risk, and support audits using explainable AI.",
    "how does fraudshield ai help the government":
        "FraudShield AI detects suspicious transactions early, reduces financial losses, improves transparency, and supports decision making.",
    "what is fraud detection":
        "Fraud detection is the process of identifying suspicious activities indicating misuse of public funds.",
    "what is anomaly detection":
        "Anomaly detection finds transactions that deviate from normal behavior.",
    "what is a risk score":
        "A risk score measures the likelihood that a transaction or entity is fraudulent.",
    "what happens when a transaction is flagged":
        "The transaction is assigned a risk score and recommended for audit review.",
    "can you explain a fraud alert":
        "Each alert includes the anomaly type, risk level, and explanation for transparency.",
    "how does ai help auditors":
        "AI highlights risky cases so auditors can focus on the most critical investigations.",
    "can this system detect subsidy fraud":
        "Yes, it detects duplicate beneficiaries, abnormal payouts, and misuse.",
    "can transactions be blocked automatically":
        "The system provides recommendations; final decisions remain with authorized officers."
}

def ask_ai(user_message):
    msg = user_message.lower()
    for q, a in QA.items():
        if q in msg:
            return a
    return "I am FraudShield AI for government fraud detection. Ask me about fraud, risk, audits, or anomalies."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    reply = ask_ai(user_message)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
