from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ['get_trimmed_body', 'created_utc', 'user', 'completed', 'starred']
    search_fields = ['body', 'user__username', 'completed', 'starred']
    list_filter = ['completed', 'starred']

    def get_trimmed_body(self, instance):
        return instance.body[:40]

admin.site.register(Task, TaskAdmin)
