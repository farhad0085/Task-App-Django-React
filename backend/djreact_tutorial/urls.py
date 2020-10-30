from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('task.urls')),
    path('api/task/', include('task.api.urls')),
    
    # auth
    path('api/auth/', auth_views.obtain_auth_token, name="obtain_auth_token"),
]
