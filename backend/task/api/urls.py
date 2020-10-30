from django.urls import path
from .views import (
    TaskListView,
    TaskCreateAPIView,
    TaskDeleteAPIView,
    TaskUpdateAPIView,
)

urlpatterns = [
    path('', TaskListView.as_view(), name="task_list_view"),
    path('create/', TaskCreateAPIView.as_view(), name="task_create_view"),
    path('delete/<pk>/', TaskDeleteAPIView.as_view(), name="task_delete_view"),
    path('update/<pk>/', TaskUpdateAPIView.as_view(), name="task_update_view"),
]
