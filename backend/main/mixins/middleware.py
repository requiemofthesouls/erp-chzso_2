import time
import json
from datetime import datetime

from django.contrib.auth.middleware import get_user
from django.utils.functional import SimpleLazyObject
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.core.exceptions import ObjectDoesNotExist

from core.models import Record
from settings.base import LOGALL_LOG_HTML_RESPONSE, LOGALL_HTML_START


class JWTAuthenticationMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.user = SimpleLazyObject(lambda: self.__class__.get_jwt_user(request))
        return self.get_response(request)

    @staticmethod
    def get_jwt_user(request):
        user = get_user(request)
        if user.is_authenticated:
            return user
        jwt_authentication = JSONWebTokenAuthentication()
        if jwt_authentication.get_jwt_value(request):
            user, jwt = jwt_authentication.authenticate(request)
        return user


class LogAllMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)
        return response

        # Code to be executed for each request/response after
        # the view is called.


    def process_view(self, request, view_func, view_args, view_kwargs):
        try:
            if not request.user.is_authenticated or not request.session:
                return None
        except AttributeError:
            return None

        # Fix the issue with the authorization request
        try:
            newRecord = Record(
                created_at=datetime.now(),
                # sessionId=request.session.session_key,
                requestUser=request.user,
                requestPath=request.path,
                requestQueryString=request.META["QUERY_STRING"],
                requestVars=json.dumps({"POST": request.POST, "GET": request.GET}),
                requestMethod=request.method,
                requestSecure=request.is_secure(),
                requestAjax=request.is_ajax(),
                requestMETA=request.META.__str__(),
                requestAddress=request.META["REMOTE_ADDR"],
            )

            newRecord.save()
        except ObjectDoesNotExist:
            pass

        return None

