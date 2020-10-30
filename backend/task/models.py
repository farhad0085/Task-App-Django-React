from django.db import models
from django.conf import settings

class Task(models.Model):

    body = models.CharField(max_length=500)
    created_utc = models.DateTimeField(auto_now_add=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    completed = models.BooleanField(default=False, blank=True)
    starred = models.BooleanField(default=False, blank=True)


    def __str__(self):
        return self.body[:40]

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'