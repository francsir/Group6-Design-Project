FROM python:3.10
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx

WORKDIR /backend
COPY . .

EXPOSE 8000


