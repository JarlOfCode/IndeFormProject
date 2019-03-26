# Required for generating thumbnail
import os.path
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image

from django.db import models





THUMB_SIZE = (256, 256)


class Product(models.Model):
    title = models.CharField(max_length=80, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    edited_at = models.DateTimeField(auto_now=True, blank=True)
    image = models.ImageField(upload_to='user/images', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='user/images/thumbnails', editable=False)


    def save(self, *args, **kwargs):
        if not self.make_thumbnail():
            # TODO: Set to a default thumbnail
            # raise Exception('Could not create thumbnail. File type not supported.')
            pass

        super().save(*args, **kwargs)


    def make_thumbnail(self):
        if self.image:
            image = Image.open(self.image)
            image.thumbnail(THUMB_SIZE, Image.ANTIALIAS)

            thumb_name, thumb_extension = os.path.splitext(self.image.name)
            thumb_extension = thumb_extension.lower()

            thumb_filename = thumb_name + '_thumb' + thumb_extension

            if thumb_extension in ['.jpg', '.jpeg']:
                FTYPE = 'JPEG'
            elif thumb_extension == '.gif':
                FTYPE = 'GIF'
            elif thumb_extension == '.png':
                FTYPE = 'PNG'
            else:
                # Unrecognized file type
                return False

            # Save thumbnail to in-memory file as StringIO
            temp_thumb = BytesIO()
            image.save(temp_thumb, FTYPE)
            temp_thumb.seek(0)

            # set save=False, otherwise it will run in an infinite loop
            self.thumbnail.save(thumb_filename, ContentFile(temp_thumb.read()), save=False)
            temp_thumb.close()

            return True
        
        return False
