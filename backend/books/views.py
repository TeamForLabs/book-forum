from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, generics
from rest_framework import permissions
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from books.models import Book, Comment
from books.permissions import IsCreatorOrReadOnly
from books.serializers import BookSerializer, CommentSerializer, BookDetailsSerializer, UserSerializer


class BookList(mixins.ListModelMixin,
               mixins.CreateModelMixin,
               generics.GenericAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['published_year', 'author', 'genres']

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class BookDetails(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  generics.GenericAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class CommentCreate(mixins.CreateModelMixin,
                    generics.GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        book = Book.objects.get(pk=self.kwargs.get('pk'))
        serializer.save(user=self.request.user, book=book)


class BookmarkCreate(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @staticmethod
    def post(request, pk):
        book = get_object_or_404(Book, pk=pk)
        user = request.user
        response = {"status": None}

        if book not in user.bookmarks.all():
            user.bookmarks.add(book)
            response['status'] = 'added'
        else:
            user.bookmarks.remove(book)
            response['status'] = 'removed'

        serializer = UserSerializer(user)
        response['user'] = serializer.data
        return Response(response)
