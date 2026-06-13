from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


def index(request):
    """Vue SPA 首页"""
    return render(request, 'rides/index.html')


def api_status(request):
    """API 健康检查"""
    return JsonResponse({
        'status': 'ok',
        'message': '川藏线骑行规划 API 运行中',
        'version': '1.0'
    })


def vue_test(request):
    return render(request, 'rides/vue_test.html')
