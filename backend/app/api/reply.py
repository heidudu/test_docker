# coding: utf-8
from . import api
from ..models.models import User, Topic, Reply, Message
from flask import jsonify, request, current_app
from .errors import forbidden, bad_request
from app import db
import datetime
import shortuuid
import markdown
from .utils import link_users,search_users


@api.route('/topic/<string:topic_id>/replies', methods=['POST'])
def do_reply(topic_id):
    accesstoken = request.form.get('accesstoken', '')
    content = request.form.get('content', '')
    reply_id = request.form.get('reply_id', '')
    user = User.get_by_accesstoken(accesstoken)
    if not user:
        return bad_request('无效的token')
    topic = Topic.query.filter(Topic.id == topic_id).first()
    if not topic:
        return bad_request('话题不存在')
    if not content:
        return forbidden('回复内容不能为空')
    parent_reply = Reply.query.filter(Reply.id == reply_id).first()
    reply = Reply()
    reply.id = shortuuid.ShortUUID().random(length=24)
    reply.author = user
    reply.content = markdown.markdown(link_users(content))
    reply.topic = topic
    if parent_reply:
        reply.parent = parent_reply
    user.score += 5
    topic.last_reply_at = datetime.datetime.now()
    topic.reply_count += 1
    db.session.add_all([user, topic, reply])
    db.session.commit()
    Message.send_message(search_users(content), topic_id, reply.id, parent_reply.author_id if parent_reply else topic.author_id)

    return jsonify({'success': True, 'reply_id': reply.id})


@api.route('/reply/<string:reply_id>/ups', methods=['POST'])
def do_up(reply_id):
    accesstoken = request.form.get('accesstoken', '')
    reply = Reply.query.filter(Reply.id == reply_id).first()
    user = User.get_by_accesstoken(accesstoken)
    if not reply:
        return bad_request('评论不存在')
    if not user:
        return bad_request('无效的token')
    if user.id == reply.author_id:
        return forbidden('不能给自己点赞')
    if user.id in [i.id for i in reply.ups]:
        reply.ups.remove(user)
        db.session.add(reply)
        db.session.commit()
        return jsonify({'success': True, 'action': 'down'})
    else:
        db.session.add(reply)
        db.session.commit()
        reply.ups.append(user)
        return jsonify({'success': True, 'action': 'down'})






