from django.db import models

"""
회원 더미데이터 생성 - 터미널에 입력
python manage.py shell ->

from django.contrib.auth import get_user_model
User = get_user_model()

for i in range(1, 31):
    User.objects.create_user(
        username=f'user{i}', 
        email=f'user{i}@example.com', 
        password='1234',
        first_name=f'{i}', 
        last_name=f'user' 
    )
"""