from . import views
from django.urls import path

urlpatterns = [
    path('books/', views.BookList.as_view()),
    path('books/<int:pk>/', views.BookDetails.as_view()),
    path('books/<int:pk>/comment', views.CommentCreate.as_view()),
]
