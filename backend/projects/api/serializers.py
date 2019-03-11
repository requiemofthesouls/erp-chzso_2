from rest_framework import serializers

from projects.models import Project, Task


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = Project.listview_fields()


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = Task.listview_fields()
