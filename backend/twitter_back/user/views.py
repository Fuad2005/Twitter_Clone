from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from .serializers import RegisterSerializer, User, ProfileSerializer
from rest_framework import status
from .models import Profile
# from django.shortcuts import get_object_or_404



# Create your views here.


class RegisterAV(RetrieveAPIView, CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer



@api_view(["POST"])
def logout(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# Send token in header
class GetProfile(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile