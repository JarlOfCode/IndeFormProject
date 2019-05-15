from django.urls import path
from .views import SolarSystemCreateView
from .views import SolarSystemListView
from .views import PlanetCreateView


app_name = 'solar'


urlpatterns = [
    path('create/', SolarSystemCreateView.as_view(), name='create'),
    path('list/', SolarSystemListView.as_view(), name='list'),
    path('planet-create/', PlanetCreateView.as_view(), name='planet-create'),
]
