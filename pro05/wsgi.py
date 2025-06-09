"""
WSGI(Web Server Gateway Interface): 동기식 표준 인터페이스
웹 서버에 요청을 했을 때 전체 내용을 한 꺼번에 전송하여 화면 전체가 변경되는
인터페이스를 제공함
WSGI config for pro05 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pro05.settings')

application = get_wsgi_application()
