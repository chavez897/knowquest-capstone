"""
Application name:               users.py
Author/Programmer:              Rodrigo Chavez Mercado
Date application created:       April 1st, 2022

This model helps to define the strucutre of stored data.
The fields used are:
    *id
    *is_active
    *email
    *username
    *name
    *last_name
    *is_verified
"""

from django.db import models
from django.utils.translation import gettext_lazy as _

from  utils.models import CustomAbstractUser


class User(CustomAbstractUser):

    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=(
            "Indica si el registro debe ser tratado como activo.",
            "Desmarque esta opción en lugar de borrar el registro",
        ),
    )
    email = models.EmailField(
        "email address",
        unique=True,
        error_messages={"unique": "A user with that email already exists."},
    )

    USERNAME_FIELD = "email"

    is_verified = models.BooleanField(
        "verified",
        default=True,
        help_text="Set to true when the user have verified its email address.",
    )

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        """Return username."""
        return self.username