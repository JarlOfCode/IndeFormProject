from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.urls import reverse
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.views.generic import DeleteView
from django.views.generic import DetailView
from django.views.generic import ListView
from django.views.generic import UpdateView

from django.shortcuts import render
from .models import Satellite

# Create your views here.

class SatelliteCreateView(CreateView):
    model = Satellite
    fields = ['name', 'health', 'speed', 'fuel_storage_size']
    template_name = "satellite/satellite_create.html"
    #template = 'satellite/satellite_create.html'
    #Needs more info below
    success_url = reverse_lazy('satellite:list')


class SatelliteListView(LoginRequiredMixin, ListView):
    model = Satellite
    paginate_by = 5
    template_name = "satellite/satellite_list.html"

class SatelliteDeleteView(LoginRequiredMixin, DeleteView):
    model = Satellite
    success_url = reverse_lazy('satellite:list')

class SatelliteDetailView(LoginRequiredMixin, DetailView):
    model = Satellite

class SatelliteUpdateView(LoginRequiredMixin, UpdateView):
    model = Satellite
    fields = ['name', 'health', 'speed', 'fuel_storage_size']
    success_url = 'satellite:detail'


    def get_success_url(self):
        if not self.success_url:
            raise ImproperlyConfigured('No URL to redirect to. Provide a success_url.')
        return reverse(self.success_url, kwargs={'pk': self.object.id})    
    


