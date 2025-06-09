"""
ASGI config for pro05 project.
ASGI(Asynchronous Server Gateway Interface): 비동기식 표준 인터페이스
웹 서버에 요청을 했을 때 전체 내용을 한 꺼번에 전송하는 것이 아니라
필요한 부분만 전송하여 화면 일부가 변경되는 인터페이스를 제공함
It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pro05.settings')

application = get_asgi_application()
