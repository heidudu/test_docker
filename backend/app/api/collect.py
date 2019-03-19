# coding: utf-8
from . import api
from ..models.models import User,Topic
from flask import jsonify, request, current_app
from .errors import forbidden,bad_request
from app import db


@api.route('/topic_collect/collect', methods=['POST'])
def do_collect():
    accesstoken = request.form.get('accesstoken', '')
    topic_id = request.form.get('topic_id', '')

    user = User.get_by_accesstoken(accesstoken)
    topic = Topic.query.filter(Topic.id == topic_id ).first()
    if not topic:
        return bad_request('话题不存在')
    if not user:
        return bad_request('不是有效的token')
    topic.collects.append(user)
    db.session.add(topic)
    db.session.commit()
    return jsonify({'success': True})


@api.route('/topic_collect/de_collect', methods=['POST'])
def de_collect():
    accesstoken = request.form.get('accesstoken', '')
    topic_id = request.form.get('topic_id', '')

    user = User.get_by_accesstoken(accesstoken)
    topic = Topic.query.filter(Topic.id == topic_id ).first()
    if not topic:
        return bad_request('话题不存在')
    if not user:
        return bad_request('不是有效的token')
    topic.collects.remove(user)
    db.session.add(topic)
    db.session.commit()
    return jsonify({'success': True})

@api.route('/topic_collect/<string:loginname>', methods=['GET'])
def get_collect(loginname):
    user = User.query.filter(User.loginname == loginname).first()
    if not user:
        return bad_request('用户不存在')
    topics = user.collects
    return jsonify({'success':True,'data': [i.serialize for i in user.collects.all()]})
