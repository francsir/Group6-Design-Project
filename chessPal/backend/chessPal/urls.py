from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('login/', views.user_login, name='login'),
    path('signup/', views.user_signup, name='signup'),
    path('logout/', views.user_logout, name='logout'),
    path('hello-world/', views.hello_world, name='hello_world'),
    path('upload/', views.upload_image, name='scan_page'),
    path('game_upload', views.game_upload, name='game_upload'),
    path('game_fetch_id', views.game_fetch_id, name='game_fetch_id'),
    path('game_fetch_user', views.game_fetch_user, name='game_fetch_user'),
    path('add_friend', views.add_friend, name='add_friend'),
    path('search_friends', views.search_friends, name='search_friends'),
    path('accept_friend_request', views.accept_friend_request, name='accept_friend_request'),
    path('reject_friend_request', views.reject_friend_request, name='reject_friend_request'),
    path('get_friends', views.get_friends, name='get_friends'),
    path('get_friend_requests', views.get_friends_requests, name='get_friend_requests'),
    path('get_username', views.get_username, name='get_username'),
    path('get_user', views.get_user, name='get_user'),
    path('get_profile', views.get_profile, name='get_profile'),
]