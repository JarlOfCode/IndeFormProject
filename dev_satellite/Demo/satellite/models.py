from django.db import models
from django.core.files.base import ContentFile

# Create your models here.

class Satellite(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    #satType = models.TextField(blank=False, null=False)
    health = models.IntegerField(null=False)
    speed = models.DecimalField(max_digits=5, decimal_places=2, blank=False, null=False)
    #crew_size = models.IntegerField(null=False)
    fuel_storage_size = models.IntegerField(null=False)
    #image = models.ImageField(upload_to='user/images', blank=True, null=True)
    #id = models.IntegerField(max_digits=12, null=False )
    x_position = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    y_position = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    z_position = models.DecimalField(max_digits=10, decimal_places=2, null=True)

class Weapon(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    ammo_amount = models.IntegerField(null = False)

class Sensor(models.Model):
    sensor_type = models.DecimalField(decimal_places=2, max_digits=5, max_length=30, blank=False, null=False)
    working_distance = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)    
    #Needs more info on enumerations
    #(
    #    ('co', 'Comet'),
    #)   


    
    
