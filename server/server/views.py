from django.shortcuts import get_object_or_404, render

def index(request):
    context = {}
    return render(request, 'server/index.html', context)