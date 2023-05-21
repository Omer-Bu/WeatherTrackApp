### Omer Boucris ###
## ID: 314969817 ##

FROM python:3.8
WORKDIR /app/backend
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]