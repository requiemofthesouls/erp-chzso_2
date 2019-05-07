from rest_framework import serializers

from projects.models import Project, Task


class ProjectSerializer(serializers.ModelSerializer):
    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())
    manager_username = serializers.CharField(source='manager.username', read_only=True)

    class Meta:
        model = Project
        fields = Project.listview_fields() + ['manager', 'manager_username']


class TaskSerializer(serializers.ModelSerializer):
    assigned_on = serializers.HiddenField(default=serializers.CurrentUserDefault())
    assigned_on_username = serializers.CharField(source='assigned_on.username', read_only=True)
    project_title = serializers.CharField(source='project.title', read_only=True)

    class Meta:
        model = Task
        fields = Task.listview_fields() + ['project', 'assigned_on', 'assigned_on_username', 'project_title']
