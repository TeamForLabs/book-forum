from . import views
from django.urls import path

urlpatterns = [
    path('', views.HelloView.as_view()),
]
