# coding: utf-8
from flask import jsonify


def forbidden(message):
    response = jsonify({'success': 'false', 'message': message})
    response.status_code = 403
    return response


def bad_request(message):
    response = jsonify({'success': 'false', 'message': message})
    response.status_code = 400
    return response