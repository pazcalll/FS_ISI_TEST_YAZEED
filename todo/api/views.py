from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import TodoSerializer
from crud.models import Todo

@api_view(['GET'])
def index(request):
    isComplete = request.GET.get('is_complete', None)
    if isComplete != None:
        # todos = Todo.objects.filter(is_complete=isComplete)
        if isComplete == '0':
            todos = Todo.objects.filter(is_complete=isComplete).order_by('created_at')
        elif isComplete == '1':
            todos = Todo.objects.filter(is_complete=isComplete).order_by('-created_at')
    else:
        todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def show(request, id):
    try:
        todo = Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return Response({'error': 'Todo not found'}, status=404)

    serializer = TodoSerializer(todo, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addTodo(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PATCH'])
def updateTodo(request, id):
    try:
        todo = Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return Response({'error': 'Todo not found'}, status=404)

    serializer = TodoSerializer(todo, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deleteTodo(request, id):
    try:
        todo = Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return Response({'error': 'Todo not found'}, status=404)

    todo.delete()

    return Response({'message': 'Data has been deleted'})