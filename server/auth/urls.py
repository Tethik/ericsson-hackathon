from django.conf.urls import patterns, url

urlpatterns = patterns('auth.views',
   url(r'^signup/', 'signup', name='signup'),
   url(r'^login/', 'login', name='login'),
)