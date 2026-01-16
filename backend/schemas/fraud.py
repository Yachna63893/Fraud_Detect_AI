from pydantic import BaseModel

class FraudTransaction(BaseModel):
    id: int
    amount: float
    city: str
    device: str
    risk_score: float
    is_fraud: bool

    class Config:
        orm_mode = True
