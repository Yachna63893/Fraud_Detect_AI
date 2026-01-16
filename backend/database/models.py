from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.db import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    city = Column(String)
    device = Column(String)
    is_fraud = Column(Boolean, default=False)
    risk_score = Column(Float)

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String)
    description = Column(String)
    status = Column(String, default="OPEN")
