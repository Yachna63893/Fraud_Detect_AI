from fastapi import APIRouter

router = APIRouter()

@router.post("/")
def file_complaint(name: str, description: str):
    return {
        "message": "Complaint registered",
        "status": "OPEN"
    }
