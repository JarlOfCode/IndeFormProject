from django.urls import path
from .views import SatelliteCreateView
from .views import SatelliteListView
from .views import SatelliteDeleteView
from .views import SatelliteDetailView
#from .views import ProductListView
from .views import SatelliteUpdateView




app_name = 'satellite'


urlpatterns = [
    path('create/', SatelliteCreateView.as_view(), name='create'),
    path('list/', SatelliteListView.as_view(), name='list'),
    path('<int:pk>/', SatelliteDetailView.as_view(), name='detail'),
    path('update/<int:pk>/', SatelliteUpdateView.as_view(), name='update'),
    path('delete/<int:pk>/', SatelliteDeleteView.as_view(), name='delete'),
    #path('', ProductListView.as_view(), name='list'),
]
