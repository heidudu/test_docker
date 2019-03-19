# coding: utf-8
from . import api
from ..models.models import User
from flask import jsonify, request
from .errors import forbidden


@api.route('/user/<string:loginname>',methods=['GET'])
def get_user(loginname):
    user = User.query.filter(User.loginname == loginname).first()
    if not user:
        return forbidden('用户不存在')
    data = {
        "loginname": user.loginname,
        "avatar_url": user.avatar_url,
        "create_at": user.create_at,
        "score": user.score,
        "recent_topics": user.recent_topics,
        "recent_replies":user.recent_replies
    }
    return jsonify({'success': True, 'data': data})




@api.route('/accesstoken',methods=['POST'] )
def login():
    accesstoken = request.form.get('accesstoken', '')
    if not accesstoken:
        return forbidden('参数有误')
    user = User.get_by_accesstoken(accesstoken)
    if not user:
        return forbidden('无效的token')
    return jsonify({
        'success': True,
        'loginname':user.loginname,
        'id': user.id,
        'avatar_url': user.avatar_url,

    })




