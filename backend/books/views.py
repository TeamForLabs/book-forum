from django.http import HttpResponse
from django.shortcuts import render
from django.views import View


class HelloView(View):
    def get(self, request):
        return HttpResponse(f"<h1>Hello {request.META['REMOTE_ADDR']}</h1>")
