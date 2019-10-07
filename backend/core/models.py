from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.

class LogRecord(models.Model):
    """
    Basic log record describing all user interaction with the UI.
    Will be propagated by a middle ware.
    This will be one BIG DB table!
    """
    created_at = models.DateTimeField(auto_now_add=True)
    # sessionId = models.CharField(max_length=256, null=True, blank=True)

    requestUser = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    requestPath = models.TextField(default='')
    requestBody = models.TextField(default='')
    requestQueryString = models.TextField(default='')
    requestVars = models.TextField(default='')
    requestMethod = models.CharField(max_length=10)
    requestSecure = models.BooleanField(default=False)
    requestAjax = models.BooleanField(default=False)
    requestMETA = models.TextField(null=True, blank=True)
    requestAddress = models.GenericIPAddressField()

    viewFunction = models.CharField(max_length=256)
    viewDocString = models.TextField(null=True, blank=True)
    viewArgs = models.TextField(default='')

    responseCode = models.CharField(max_length=3)
    responseContent = models.TextField(default='')
