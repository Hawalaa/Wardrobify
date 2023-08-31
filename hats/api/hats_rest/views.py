from django.shortcuts import render
from .models import LocationVO, Hat
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json

# Create your views here.


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric", "style_name", "color", "id"]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
        "id"
    ]
    encoders = {
        "location": LocationVODetailEncoder()
    }


require_http_methods(["GET", "POST"])
def api_list_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatDetailEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content ["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Location ID"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_show_hat(request, pk):
    if request.method == "DELETE":
        count, = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
