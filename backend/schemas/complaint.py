from pydantic import BaseModel

class ComplaintCreate(BaseModel):
    user_name: str
    description: str

class ComplaintResponse(BaseModel):
    message: str
    status: str
