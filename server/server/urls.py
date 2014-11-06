from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'^$', 'server.views.index', name='home'),
    url('^', include('auth.urls')),
    url(r'^logout$', 'django.contrib.auth.views.logout', {'next_page': 'home'}, name='logout'),
    url(r'^admin/', include(admin.site.urls)),
)
