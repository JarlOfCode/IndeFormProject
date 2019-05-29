import os.path
from django.core.files.base import ContentFile
from django.core.validators import MaxValueValidator, MinValueValidator

from django.db import models


# Create your models here.

class SolarSystem(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    planetNumber = models.IntegerField(null=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Planet(models.Model):
    #PLANETU SPALVU PASIRINKIMAI
    FIRST = '0x555555'
    SECOND = '0x7658ef'
    THIRD = '0x1EF9F8'
    PLANET_COLOR_CHOICES = (
        (FIRST, 'first'),
        (SECOND, 'second'),
        (THIRD, 'third'),
    )
    #sukimosi kry[ties pasirinkimai]
    CLOCKWISE = 1
    COUNTERCLOCKWISE = -1
    PLANET_ROTATION_DIRECTIONS =(
        (CLOCKWISE, 'Clockwise'),
        (COUNTERCLOCKWISE, 'Counter clockwise'),
    )
    title = models.CharField(max_length=30, blank=False, null=False)
    planetRadius = models.IntegerField(null=False)
    speed = models.DecimalField(max_digits=7, decimal_places=5, null=False)
    color = models.CharField(max_length=15, choices=PLANET_COLOR_CHOICES, default=FIRST,null=False)
    vector = models.IntegerField(choices=PLANET_ROTATION_DIRECTIONS, default=CLOCKWISE,null=False)
    orbitRadius = models.IntegerField(null=False)
    solarSystem = models.ForeignKey(SolarSystem, on_delete=models.CASCADE, null=True)
   
    def __str__(self):
       return self.name
# Atsiradimo tasku klase
"""
class SpawnPoint(models.Model):
    title = models.CharField(max_length=30, blank=False, null=False)
    
    # Satelitu atsiradimo tasku koordinates
    x_position = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    y_position = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    z_position = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    
    # Saules sistema, kurioje yra atsiradimo taskas
    solarSystem = models.ForeignKey(SolarSystem, on_delete=models.CASCADE, null=True)
    
# Meteoritu klase
class Meteor(models.Model):
    meteorRadius = models.IntegerField(null=False)
    speed = models.DecimalField(max_digits=7, decimal_places=5, null=False)
    solarSystem = models.ForeignKey(SolarSystem, on_delete=models.CASCADE, null=True)
    
    # Meteoro sukimasis aplink asi
    #sukimosi krypties pasirinkimai
    CLOCKWISE = 1
    COUNTERCLOCKWISE = -1
    METEOR_ROTATION_DIRECTIONS =(
        (CLOCKWISE, 'Clockwise'),
        (COUNTERCLOCKWISE, 'Counter clockwise'),
    )

    axisRotationSpeed = models.DecimalField(max_digits=7, decimal_places=5, null=False)
    axisRotationDirection = models.IntegerField(choices=METEOR_ROTATION_DIRECTIONS, default=CLOCKWISE,null=False)
    """