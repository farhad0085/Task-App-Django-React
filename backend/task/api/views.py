from django.http.response import Http404
from rest_framework.generics import ListAPIView, CreateAPIView
from task.models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class TaskListView(ListAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):
		queryset = Task.objects.order_by('-id').filter(user=self.request.user).all()
		return queryset


class TaskCreateAPIView(CreateAPIView):
	queryset = Task.objects.all()
	serializer_class = TaskSerializer

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class TaskDeleteAPIView(APIView):
	serializer_class = TaskSerializer

	def get_object(self, pk):
		try:
			return Task.objects.get(pk=pk)
		except Task.DoesNotExist:
			raise Http404

	def delete(self, request, pk, format=None):
		task = self.get_object(pk)
		task.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class TaskUpdateAPIView(APIView):
	def patch(self, request, pk):
		try:
			task = Task.objects.get(pk=pk)
		except Task.DoesNotExist:
			raise Http404

		serializer = TaskSerializer(task, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_200_OK)

		return Response(status=status.HTTP_400_BAD_REQUEST)