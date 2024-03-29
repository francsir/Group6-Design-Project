from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('login/', views.user_login, name='login'),
    path('signup/', views.user_signup, name='signup'),
    path('logout/', views.user_logout, name='logout'),
    path('hello-world/', views.hello_world, name='hello_world'),
    path('upload/', views.upload_image, name='scan_page')
]