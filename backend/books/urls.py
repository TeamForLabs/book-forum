from django.urls import path

from . import views

urlpatterns = [
    path('books/', views.BookList.as_view()),
    path('books/<int:pk>/', views.BookDetails.as_view()),
    path('books/<int:pk>/comment', views.CommentCreate.as_view()),
    path('books/<int:pk>/bookmark', views.BookmarkCreate.as_view()),
    path('me/', views.BookmarkList.as_view()),
]
