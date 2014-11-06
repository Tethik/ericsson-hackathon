from django.contrib.auth.forms import AuthenticationForm
from django.core.context_processors import csrf
from django.shortcuts import render_to_response, redirect, render
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User


def auth_and_login(request):
    form = AuthenticationForm(request.POST)
    user = None
    print "request", request.POST
    print "errors", form.error_messages
    if form.is_valid():
        print "valid"
        user = authenticate(username=form.username, password=form.password)
    else:
        print "not valid"
    if user:
        auth_login(request, user)
        return redirect('home')
    else:
        return redirect('login_or_signup')

def create_user(username, email, password):
    user = User(username=username, email=email)
    user.set_password(password)
    user.save()
    return user

def user_exists(username):
    user_count = User.objects.filter(username=username).count()
    if user_count == 0:
        return False
    return True

def login(request):
    form = AuthenticationForm(data=request.POST) if request.POST else AuthenticationForm()
    context = {'form': form}
    if form.is_valid():
        data = form.cleaned_data
        user = authenticate(username=data['username'], password=data['password'])
        auth_login(request, user)
        return redirect('home')
    return render(request, 'auth/login.html', context)

def signup(request):
    if request.POST and not user_exists(request.POST['email']):
        user = create_user(username=request.POST['email'], email=request.POST['email'], password=request.POST['password'])
        return auth_and_login(request)
    else:
        return redirect('login_or_signup')

