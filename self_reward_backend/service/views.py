from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def home(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            name = data.get("name")

            # Log or process user data
            print(f"User logged in: {name} ({email})")

            return JsonResponse({"message": "Login data received successfully!"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)
