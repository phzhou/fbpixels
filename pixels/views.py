import os
import json
from django.shortcuts import render
from django.utils.safestring import mark_safe

def _load_messages(language):

    messages = {}
    message_path = os.path.join(
        os.path.dirname(os.path.realpath(__file__)),
        'static',
        'messages',
    )
    with open(os.path.join(message_path, "{}.json".format(language))) as f:
        messages = json.load(f)

    for key in messages:
        messages[key] = mark_safe(messages[key])

    return messages


def render_pixel_docs(request, template):
    action = template.split('/')[1].split('.')[0]
    return render(request, template, {
        'action': action,
        'messages': _load_messages('en')})


def overview(request):
    return render_pixel_docs(request, 'pixels/overview.html')


def up(request):
    return render_pixel_docs(request, 'pixels/up.html')


def wca(request):
    return render_pixel_docs(request, 'pixels/wca.html')


def conversion(request):
    return render_pixel_docs(request, 'pixels/conversion.html')


def manager(request):
    return render_pixel_docs(request, 'pixels/manager.html')


def dpa(request):
    return render_pixel_docs(request, 'pixels/dpa.html')
