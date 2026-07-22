from django.shortcuts import render

from rest_framework import viewsets
from .models import ServiceCategory, Service, Specialist, SpecialistService, Customer, Booking
from .serializers import (
    ServiceCategorySerializer, ServiceSerializer, SpecialistSerializer,
    SpecialistServiceSerializer, CustomerSerializer, BookingSerializer
)


class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class SpecialistViewSet(viewsets.ModelViewSet):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer


class SpecialistServiceViewSet(viewsets.ModelViewSet):
    queryset = SpecialistService.objects.all()
    serializer_class = SpecialistServiceSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
