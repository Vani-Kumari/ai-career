from fastapi import APIRouter
from app.models.user import users_db
from app.services.auth_service import hash_password, verify_password, create_token

router = APIRouter()

# 🔹 Signup
@router.post("/signup")
def signup(data: dict):
    email = data["email"]
    password = data["password"]

    if email in users_db:
        return {"error": "User already exists"}

    users_db[email] = {
        "password": hash_password(password)
    }

    return {"message": "User created successfully"}


# 🔹 Login
@router.post("/login")
def login(data: dict):
    email = data["email"]
    password = data["password"]

    user = users_db.get(email)

    if not user or not verify_password(password, user["password"]):
        return {"error": "Invalid credentials"}

    token = create_token({"email": email})

    return {"token": token}