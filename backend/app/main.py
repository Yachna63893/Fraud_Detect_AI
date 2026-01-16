from fastapi import FastAPI
from app.core.cors import setup_cors
from app.api.routes import dashboard, analytics, fraud, alerts, complaints
from app.database.db import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fraud-AI Backend",
    description="National Fraud Detection Platform",
    version="1.0"
)

setup_cors(app)

app.include_router(dashboard.router, prefix="/api/dashboard")
app.include_router(analytics.router, prefix="/api/analytics")
app.include_router(fraud.router, prefix="/api/fraud")
app.include_router(alerts.router, prefix="/api/alerts")
app.include_router(complaints.router, prefix="/api/complaints")

@app.get("/")
def root():
    return {"status": "Fraud-AI Backend Running"}
