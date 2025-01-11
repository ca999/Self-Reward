from djongo import models

class User(models.Model):
    first_name = models.CharField(max_length=100, blank=False)  # Set blank=False to make it required
    last_name = models.CharField(max_length=100, blank=False)  # Set blank=False to make it required
    email = models.EmailField(max_length=255, unique=True, blank=False)  # Set blank=False to make it required
    tier = models.CharField(max_length=50, blank=True, null=True)  # Optional field
    upi_id = models.CharField(max_length=100, blank=True, null=True)  # Optional field

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
