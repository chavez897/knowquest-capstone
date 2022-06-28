from nturl2path import url2pathname
from urllib.parse import urlparse
from django.urls import path
from . import views

# URLConf

urlpatterns = [
    path('task-list/', views.apiOverview, name="api-overview"),
]