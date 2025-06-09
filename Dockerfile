FROM python:3.10
WORKDIR /app
COPY ./backend /app
RUN pip install --upgrade pip && \pip install -r requirements.txt
# 환경 변수 설정
ENV PYTHONUNBUFFERED=1
# 포트 개방
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
