from rest_framework import serializers

from django.contrib.auth.models import User
from projects.models import Image


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source='image.file',
                                    default='http://127.0.0.1:8000/media/images/default_avatar.png')

    class Meta:
        model = User
        fields = [field.attname for field in User._meta.concrete_fields] + ['avatar']

    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     # print(validated_data)
    #     image = validated_data.pop('image')
    #     print(image)
    #     instance = self.Meta.model(**validated_data)
    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()
    #     if image is not None:
    #         obj = Image(user=instance, **image)
    #         obj.save()
    #     return instance
    #
    # def update(self, instance, validated_data):
    #     for attr, value in validated_data.items():
    #         if attr == 'password':
    #             instance.set_password(value)
    #         elif attr == 'image':
    #             image = Image.objects.get(user=instance)
    #             image.file = validated_data.get('image')['file']
    #             image.save()
    #         else:
    #             setattr(instance, attr, value)
    #     instance.save()
    #     return instance
