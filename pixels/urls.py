from django.conf.urls import patterns, url
from pixels import views

urlpatterns = patterns(
    '',
    url(r'^$', views.overview, name='overview'),
    url(r'^wca/$', views.wca, name='wca'),
    url(r'^conversion/$', views.conversion, name='conversion'),
    url(r'^dpa/$', views.dpa, name='dpa'),
    url(r'^up/$', views.up, name='up'),
    url(r'^manager/$', views.manager, name='manager'),
)
