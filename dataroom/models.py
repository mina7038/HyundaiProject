from django.db import models
# Create your models here.
class Dataroom(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="dataroom/")
    resdate = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title