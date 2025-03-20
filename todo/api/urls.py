from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('show/<int:id>', views.show),
    path('add/', views.addTodo),
    path('update/<int:id>', views.updateTodo),
    path('delete/<int:id>', views.deleteTodo)
]