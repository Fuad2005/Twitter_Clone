from django.urls import path
from rest_framework.authtoken import views as auth_views
from . import views 

urlpatterns = [
    path("register/", views.RegisterAV.as_view(), name="register"),
    path("login/", auth_views.obtain_auth_token, name="login"),
    path("logout/", views.logout, name="logout"),
    path("get-profile/", views.GetProfile.as_view(), name="get-profile"),
]
