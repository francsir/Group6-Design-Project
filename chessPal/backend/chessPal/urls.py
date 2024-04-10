from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('login/', views.user_login, name='login'),
    path('signup/', views.user_signup, name='signup'),
    path('logout/', views.user_logout, name='logout'),
    path('hello-world/', views.hello_world, name='hello_world'),
    path('upload/', views.upload_image, name='scan_page'),
    path('game_upload/', views.game_upload, name='game_upload'),
    path('game_fetch_id/', views.game_fetch_id, name='game_fetch_id'),
    path('game_fetch_user', views.game_fetch_user, name='game_fetch_user'),
]