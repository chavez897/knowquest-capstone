"""
Application name:               users.py
Author/Programmer:              Rodrigo Chavez Mercado
Date application created:       April 1st, 2022

This serializer helps to converting user table objects into json format.
The fields used are:
    *id
    *is_active
    *email
    *username
    *name
    *last_name
    *is_verified
"""


from django.contrib.auth import get_user_model

from rest_framework import serializers

User = get_user_model()



class UserModelSerializer(serializers.ModelSerializer):
    """ UserModelSerializer."""

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "is_active",
            "is_verified",
        )
        read_only_fields = ("username",)

    def create(self, validated_date):
        return super(UserModelSerializer, self).create(validated_date)

