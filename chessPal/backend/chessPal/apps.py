from django.apps import AppConfig


class ChesspalConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chessPal'

    def ready(self):
        from .utils import ensure_folders_exist
        ensure_folders_exist()
