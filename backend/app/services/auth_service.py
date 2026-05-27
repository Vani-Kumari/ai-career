import os
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "secret123"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🔹 Hash password
def hash_password(password: str):
    return pwd_context.hash(password)

# 🔹 Verify password
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

# 🔹 Create token
def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)