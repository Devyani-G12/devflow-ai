from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    bio: str
    skills: str
    github_link: str
    portfolio_link: str

    class Config:
        from_attributes = True


class ProfileUpdate(BaseModel):
    name: str
    bio: str
    skills: str
    github_link: str
    portfolio_link: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class ProjectCreate(BaseModel):
    title: str
    description: str
    status: str = "In Progress"


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    owner_id: int

    class Config:
        from_attributes = True


class TaskCreate(BaseModel):
    title: str
    status: str = "Todo"
    priority: str = "Medium"
    deadline: str = ""
    project_id: int


class TaskResponse(BaseModel):
    id: int
    title: str
    status: str
    priority: str
    deadline: str
    project_id: int

    class Config:
        from_attributes = True


class AIRequest(BaseModel):
    code: str


class AIResponse(BaseModel):
    explanation: str