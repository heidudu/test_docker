# coding: utf-8
from . import api
from ..models.models import User,Message
from flask import jsonify, request, current_app
from .errors import forbidden,bad_request


@api.route('/message/count', methods=['GET'])
def message_count():
    accesstoken = request.args.get('accesstoken', '')
    if not accesstoken:
        return forbidden('参数有误')
    user = User.get_by_accesstoken(accesstoken)
    if not user:
        return bad_request('不是有效的token')
    count = user.receive_messages.filter(Message.has_read == False).count()
    return jsonify({'success': True, 'data': count})


@api.route('/messages', methods=['GET'])
def get_messages():
    accesstoken = request.args.get('accesstoken', '')
    user = User.get_by_accesstoken(accesstoken)
    if user:
        has_read_messages = Message.query.filter(Message.receive_user_id == user.id).filter(Message.has_read == True).order_by(Message.create_at.desc()).all()
        hasnot_read_messages = Message.query.filter(Message.receive_user_id == user.id).filter(Message.has_read == False).order_by(Message.create_at.desc()).all()
        return jsonify({'success': True, 'data': {
            'has_read_messages': [i.serialize for i in has_read_messages],
            'hasnot_read_messages': [i.serialize for i in hasnot_read_messages]
        }})
    else:
        return bad_request('不是有效的token')


