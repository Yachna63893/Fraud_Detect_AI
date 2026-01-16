from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.services.dashboard_service import get_kpis

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/overview")
def dashboard_overview(db: Session = Depends(get_db)):
    return get_kpis(db)
