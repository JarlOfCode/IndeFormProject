from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.urls import reverse
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.views.generic import DeleteView
from django.views.generic import DetailView
from django.views.generic import ListView
from django.views.generic import UpdateView
from django.views.generic import TemplateView

from .models import SolarSystem
from .models import Planet


# Create your views here.

class SolarSystemCreateView(LoginRequiredMixin, CreateView):
    model = SolarSystem
    fields = ['name','planetNumber', 'description']
    template_name = "solar/solar-system_form.html"
    success_url = reverse_lazy('solar:list')
    #success_url = reverse_lazy('')

class SolarSystemListView(LoginRequiredMixin, ListView):
    model = SolarSystem
    paginate_by = 5
    template_name = "solar/solar_list.html"


class PlanetCreateView(LoginRequiredMixin, CreateView):
    model = Planet
    fields = ['title','planetRadius', 'speed','color','vector', 'orbitRadius', 'solarSystem']
    template_name = "solar/planet_form.html"

class SystemControlView(TemplateView):
    template_name = "solar/threejs-demo.html"