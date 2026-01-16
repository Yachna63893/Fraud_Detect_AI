from fastapi import APIRouter
from app.services.alert_service import generate_alert

router = APIRouter()

@router.post("/")
def alert(risk_score: float):
    return {"alert": generate_alert(risk_score)}
