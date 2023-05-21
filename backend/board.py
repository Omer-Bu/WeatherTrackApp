### Omer Boucris ###
## ID: 314969817 ##

from typing import List
from pydantic import BaseModel, validator


class Board(BaseModel):
    name: str
    cities: List[str] = []

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('name cannot be empty')
        return v

    @validator('cities')
    def cities_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('cities cannot be empty')
        return v


def ResponseMessage(data, message, status_code=200):
    return {"data": data, "message": message, "status_code": status_code}


def ErrorMessage(data, message, status_code=404):
    return {"data": data, "message": message, "status_code": status_code}

