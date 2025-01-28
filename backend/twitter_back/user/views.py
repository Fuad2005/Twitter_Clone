from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from .serializers import RegisterSerializer, User, ProfileSerializer
from rest_framework import status, filters
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
    


class GetAllProfiles(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username__icontains', 'user__first_name__icontains', 'user__last_name__icontains']


   
class GetProfilesById(ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        ids = self.request.GET.get('ids', '').split(',')
        ids = [int(id) for id in ids]
        return Profile.objects.filter(id__in=ids)




@api_view(["GET"])
def follow_view(request, pk):

    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status.HTTP_404_NOT_FOUND)

    current_profile = request.user.profile
    if current_profile.is_following(profile):
        current_profile.unfollow(profile)
        return Response({"message": "Unfollowed"}, status.HTTP_200_OK)
    current_profile.follow(profile)
    return Response({"message": "Followed"}, status.HTTP_200_OK)