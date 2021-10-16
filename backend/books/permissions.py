from rest_framework import permissions


class IsCreatorOrReadOnly(permissions.BasePermission):
    message = 'Недостатній рівень доступу. Тільки власник цієї книги може її редагувати.'

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.creator == request.user
