def generate_alert(risk_score: float):
    if risk_score >= 0.8:
        return {"action": "block", "reason": "high risk"}
    if risk_score >= 0.5:
        return {"action": "review", "reason": "medium risk"}
    return {"action": "allow", "reason": "low risk"}
