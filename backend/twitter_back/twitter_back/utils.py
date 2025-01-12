from django.utils.module_loading import import_string

def get_serializer_class(serializer_path):
    return import_string(serializer_path)
