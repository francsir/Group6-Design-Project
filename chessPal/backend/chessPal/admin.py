from django.contrib import admin
from .models import Test

class TestAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

admin.site.register(Test, TestAdmin)
