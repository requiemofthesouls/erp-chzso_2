import socket

from .base import *

# Webpack Loader by Owais Lane
# ------------------------------------------------------------------------------
# https://github.com/owais/django-webpack-loader

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'builds-development/',
        'STATS_FILE': os.path.join(FRONTEND_DIR, 'static', 'builds-development', 'webpack-stats.dev.json')
    }
}

# Django Debug Toolbar
# ------------------------------------------------------------------------------
# https://github.com/jazzband/django-debug-toolbar


INSTALLED_APPS += ('debug_toolbar', 'corsheaders')

INTERNAL_IPS = ['127.0.0.1', '10.0.2.2', ]

# Hack to have debug toolbar when developing with docker
ip = socket.gethostbyname(socket.gethostname())
INTERNAL_IPS += [ip[:-1] + "1"]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False
MIDDLEWARE = CORS_HEADERS_MIDDLEWARE + DJANGO_SECURITY_MIDDLEWARE + DJANGO_MIDDLEWARE + ['debug_toolbar.middleware.DebugToolbarMiddleware']
THIRD_PARTY_APPS += ['corsheaders']
