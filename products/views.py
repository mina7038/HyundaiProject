from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count

class ProductPagination(PageNumberPagination):
    page_size = 10  # 페이지당 항목 수
    page_size_query_param = 'page_size'

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = [MultiPartParser, FormParser] 

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset

    # ProductViewSet 안에 있는 category_counts 함수
    @action(detail=False, methods=["get"], url_path="category-counts", permission_classes=[AllowAny])
    def category_counts(self, request):
        # name 기반으로 mapping해서 응답 생성
        category_name_map = {
            "ev": "수소/전기차",
            "n": "N",
            "sedan": "승용",
            "suv": "SUV",
            "mpv": "MPV",
            "small": "소형트럭&택시",
            "truck": "트럭",
            "bus": "버스"
        }

        data = (
            Product.objects
            .values("category")
            .annotate(count=Count("id"))
        )

        # category 값을 name으로 매핑
        result = []
        for item in data:
            code = item["category"]
            name = category_name_map.get(code, code)
            result.append({
                "category": name,
                "count": item["count"]
            })

        return Response(result)

