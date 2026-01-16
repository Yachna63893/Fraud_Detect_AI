from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.services.analytics_service import fraud_vs_non_fraud, fraud_by_device

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/fraud-vs-nonfraud")
def fraud_split(db: Session = Depends(get_db)):
    return fraud_vs_non_fraud(db)

@router.get("/fraud-by-device")
def device_stats(db: Session = Depends(get_db)):
    return fraud_by_device(db)
