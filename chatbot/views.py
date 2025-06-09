from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.conf import settings
# :아래쪽_화살표: OpenAI Python SDK v1.x 방식
from openai import OpenAI
# 클라이언트 인스턴스 생성(전역으로 한 번만)
client = OpenAI(api_key=settings.OPENAI_API_KEY)
@api_view(["POST"])
def chat_view(request):
    """
    POST /api/chat/
    {
        "messages": [
            {"role": "user", "content": "안녕!"}
        ]
    }
    """
    messages = request.data.get("messages", [])
    print(":말풍선: 받은 메시지:", messages)
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",     # 필요 시 gpt-4o, gpt-4-turbo 등으로 변경
            messages=messages,
            temperature=0.7,
        )
        reply = completion.choices[0].message.content
        print(":흰색_확인_표시: 챗봇 응답:", reply)
        # 프런트엔드에서 바로 append할 수 있도록 동일 포맷 반환
        return Response({"role": "assistant", "content": reply})
    except Exception as e:
        # 콘솔에 상세 오류 출력
        print(":x: OpenAI 오류:", str(e))
        return JsonResponse({"error": str(e)}, status=500)