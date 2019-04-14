from rest_framework import serializers

from projects.models import Project, Task


class ProjectSerializer(serializers.ModelSerializer):
    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Project
        fields = Project.listview_fields() + ['manager']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = Task.listview_fields()
