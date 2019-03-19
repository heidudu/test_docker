# coding: utf-8
from . import api
from ..models.models import User
from flask import jsonify, request, current_app
from .errors import forbidden,bad_request
from ..models.models import Topic
from app import db
import datetime
import markdown


@api.route('/topics', methods=['GET'])
def get_topics():
    page = int(request.args.get('page', 1))
    tab = request.args.get('tab', 'all')
    limit = int(request.args.get('limit', current_app.config['LIST_TOPIC_COUNT']))
    mdrender = request.args.get('mdrender', True)
    return jsonify({'success': True, 'data': Topic.get_topics(tab, limit, page)})


@api.route('/topic/<string:id>', methods=['GET'])
def get_topic(id):
    accesstoken = request.args.get('accesstoken', '')
    topic = Topic.query.filter(Topic.id == id).first()
    topic.visit_count += 1
    db.session.add(topic)
    db.session.commit()
    if not topic:
        return bad_request('不是有效的id')
    return jsonify({'success': True, 'data': topic.include_replies(accesstoken)})


@api.route('/topics', methods=['POST'])
def new_topic():
    accesstoken = request.form.get('accesstoken', '')
    title = request.form.get('title', '')
    tab = request.form.get('tab', '')
    content = request.form.get('content', '')

    user = User.get_by_accesstoken(accesstoken)
    err = ''
    if not user:
        err = '用户不存在'
    elif not title:
        err = '标题不能为空'
    elif len(title) < 5 or len(title)>10:
        err = '标题字数太多或太少'
    elif (not tab) or (tab not in ['dev','share','job','ask']):
        err = '必须选择一个板块'
    elif not content:
        err = '内容不能为空'

    if err:
        return bad_request(err)

    topic = Topic()
    topic.tab = tab
    topic.title = title
    topic.content = markdown.markdown(content)
    topic.author = user
    db.session.add(topic)
    db.session.commit()
    user.score += 5
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': True, 'topic_id': topic.id})

@api.route('/topics/update', methods=['POST'])
def update_topic():
    accesstoken = request.form.get('accesstoken', '')
    title = request.form.get('accesstoken', '')
    tab = request.form.get('tab', '')
    content = request.form.get('content', '')
    topic = Topic.query.filter(Topic.author.accesstoken==accesstoken).first()
    err = ''
    if not topic:
        err = '该文章不存在'
    elif not title:
        err = '标题不能为空'
    elif len(title) < 5 or len(title)>10:
        err = '标题字数太多或太少'
    elif (not tab) or (tab not in ['dev', 'share', 'job','ask']):
        err = '必须选择一个板块'
    elif not content:
        err = '内容不能为空'

    if err:
        return bad_request(err)

    topic.tab = tab
    topic.title = title
    topic.content = markdown.markdown(content)
    topic.update_at = datetime.datetime.now()
    topic.last_reply_at = datetime.datetime.now()
    db.session.add(topic)
    db.session.commit()
    return jsonify({'success': True, 'topic_id': topic.id})















    
