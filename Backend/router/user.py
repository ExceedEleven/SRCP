from fastapi import APIRouter

router = APIRouter(prefix="/user",
                   tags=["user"])


@router.get("/{user_id}", status_code=200)
def get_user():
    pass

# optional
@router.put("/update/{user_id}", status_code=200)
def update_user():
    pass

# username
# password
@router.post("/signin", status_code=200)
def signin():
    pass

# username 
# password
# credit card
@router.post("/signup", status_code=200)
def signup():
    pass