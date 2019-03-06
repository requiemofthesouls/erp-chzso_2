from rest_framework import viewsets

from projects.api.serializers import ProjectSerializer, TaskSerializer
from projects.models import Project, Task


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
