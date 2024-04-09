from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user
from .forms import UserCreationForm, LoginForm, ImageUploadForm
from .image import process_image
from .serializers import GameSerializer
from .sql import sqlHelper
from .models import Game
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import json

## Test Page
@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})

# Home Page
def index(request):
    return render(request, 'index.html')

##def upload_image(request):
##    if request.method == 'POST':
##        form = ImageUploadForm(request.POST, request.FILES)
##        if form.is_valid():
##            uploaded_image = form.save()
##            image_path = uploaded_image.image.path
##            process_image(image_path)
##            return redirect('login')
##    else:
##        form = ImageUploadForm()
##    return render(request, 'upload_image.html', {'form': form})

@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)

        if form.is_valid():
            uploaded_image = form.save()
            image_path = uploaded_image.image.path

            # Call your image processing logic
            try:
                moves = process_image(image_path)
                print(moves)

                return JsonResponse({'success': True, 'message': 'Image uploaded successfully', 'moves': moves})
            except:
                return JsonResponse({'success': False, 'message': 'Image processing failed', 'moves':[]})
                
        else:
            # Form validation failed
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = ImageUploadForm()

    return JsonResponse({'success': False, 'message': 'Invalid request method'})

    
# User Signup
#def user_signup(request):
#    if request.method == 'POST':
#        form = UserCreationForm(request.POST)
#        if form.is_valid(): 
#            form.save()
#            return redirect('login')
#    else:
#        form = UserCreationForm()
#    return render(request, 'signup.html', {'form': form})

@csrf_exempt
def user_signup(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            
            form = UserCreationForm(request.POST)
            
            if form.is_valid():
                user = form.save()
                # Log the user in after successful signup
                login(request, user)

                return JsonResponse({'success': True, 'message': 'Signup successful'})
            else:
                return JsonResponse({'success': False, 'errors': form.errors})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data'})
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})


# login page
#def user_login(request):
#    if request.method == 'POST':
#        form = LoginForm(request.POST)
#        if form.is_valid():
#            username = form.cleaned_data['username']
#            password = form.cleaned_data['password']
#            user = authenticate(request, username=username, password=password)
#            if user:
#                login(request, user)    
#                return redirect('home')
#    else:
#        form = LoginForm()
#    return render(request, 'login.html', {'form': form})

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        try:
            form = LoginForm(request.POST)
            if form.is_valid():
                username = form.cleaned_data['username']
                password = form.cleaned_data['password']

                user = authenticate(request, username=username, password=password)
                if user:
                    login(request, user)
                    return JsonResponse({'success': True, 'message': 'Signin successful'})
                else:
                    return JsonResponse({'success': False, 'message': 'Not a Member'})
            else:
                return JsonResponse({'success': False, 'errors': form.errors})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data'})
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

# logout page
def user_logout(request):
    logout(request)
    return redirect('login')

def game_upload(request):
    if request.user.is_authenticated:
        userid = request.user.id
        data = request.POST
        print(data)
        moves = data.get("pgn")
        # TODO: Handle white/black siding
        gameid = sqlHelper.addGame(moves = moves, white = userid)
        return JsonResponse({'success': True, 'Message': 'Game uploaded', 'gameid': gameid})
    else:
        return JsonResponse({'success': False, 'Message': 'Not logged in'})

def game_fetch_id(request):
    gameid = 0
    game = sqlHelper.getGameById(gameid)
    return JsonResponse({'success': True, 'Message': 'Game retrieved', 'game': GameSerializer(game)})

def game_fetch_user(request):
    print(get_user(request).id)
    print(request.user)
    print(request)
    if request.user.is_authenticated:
        userid = request.user.id
        games = sqlHelper.getGamesByUser(userid)
        print(games)
        return JsonResponse({'success': True, 'Message': 'Games retrieved', 'games': {'games': [GameSerializer(game) for game in games]}})
    else:
        return JsonResponse({'success': False, 'Message': 'Not logged in', 'games': []})
    