from rest_framework.routers import DefaultRouter
from .views import (
    ServiceCategoryViewSet, ServiceViewSet, SpecialistViewSet,
    SpecialistServiceViewSet, CustomerViewSet, BookingViewSet
)

router = DefaultRouter()
router.register('service-categories', ServiceCategoryViewSet)
router.register('services', ServiceViewSet)
router.register('specialists', SpecialistViewSet)
router.register('specialist-services', SpecialistServiceViewSet)
router.register('customers', CustomerViewSet)
router.register('bookings', BookingViewSet)

urlpatterns = router.urls