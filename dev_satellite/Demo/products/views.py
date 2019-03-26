from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.urls import reverse
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.views.generic import DeleteView
from django.views.generic import DetailView
from django.views.generic import ListView
from django.views.generic import UpdateView

from .models import Product




class ProductCreateView(LoginRequiredMixin, CreateView):
    model = Product
    fields = ['title', 'description', 'price', 'image']
    success_url = reverse_lazy('products:list')




class ProductDeleteView(LoginRequiredMixin, DeleteView):
    model = Product
    success_url = reverse_lazy('products:list')




class ProductDetailView(LoginRequiredMixin, DetailView):
    model = Product




class ProductListView(LoginRequiredMixin, ListView):
    model = Product
    paginate_by = 10




class ProductUpdateView(LoginRequiredMixin, UpdateView):
    model = Product
    fields = ['title', 'description', 'price', 'image']
    success_url = 'products:detail'


    def get_success_url(self):
        if not self.success_url:
            raise ImproperlyConfigured('No URL to redirect to. Provide a success_url.')
        return reverse(self.success_url, kwargs={'pk': self.object.id})
