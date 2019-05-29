from django.urls import path
from .views import SolarSystemCreateView
from .views import SolarSystemListView
from .views import PlanetCreateView
from .views import SystemControlView
from .views import PlanetListView


app_name = 'solar'


urlpatterns = [
    path('create/', SolarSystemCreateView.as_view(), name='create'),
    path('list/', SolarSystemListView.as_view(), name='list'),
    path('planet-create/', PlanetCreateView.as_view(), name='planet-create'),
    path('control/', SystemControlView.as_view(), name='control'),
    path('planet_list/', PlanetListView.as_view(), name='planet_list')
]
