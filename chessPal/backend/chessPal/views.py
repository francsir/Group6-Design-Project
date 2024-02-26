from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import UserCreationForm, LoginForm, ImageUploadForm
from .image import process_image

from rest_framework.decorators import api_view
from rest_framework.response import Response

## Test Page
@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})

# Home Page
def index(request):
    return render(request, 'index.html')

def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_image = form.save()
            image_path = uploaded_image.image.path
            process_image(image_path)
            return redirect('login')
    else:
        form = ImageUploadForm()
    return render(request, 'upload_image.html', {'form': form})

# User Signup
def user_signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid(): 
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

# login page
def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)    
                return redirect('home')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

# logout page
def user_logout(request):
    logout(request)
    return redirect('login')