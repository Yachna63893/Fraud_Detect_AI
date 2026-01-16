from pydantic import BaseModel
from typing import Dict

class FraudSplit(BaseModel):
    fraud: int
    non_fraud: int

class DeviceStats(BaseModel):
    device: str
    fraud: int
    normal: int

class FraudByDeviceResponse(BaseModel):
    data: Dict[str, Dict[str, int]]
