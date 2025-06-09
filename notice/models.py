from django.db import models

class Notice(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    hits = models.PositiveIntegerField(default=0)
    resdate = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "notice"
        ordering = ["-id"]
    
    def __str__(self):
        return self.title