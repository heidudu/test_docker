# coding: utf-8
import requests
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask import Flask
import shortuuid
import uuid



app = Flask(__name__)
# 添加charset的原因为默认的格式为utf-8，出现emoj表情符号会报错
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://heidudu:heidudu@127.0.0.1:3306/cnode?charset=utf8mb4'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 点赞表
ups = db.Table('ups',
    db.Column('user_id', db.String(64), db.ForeignKey('user.id'), primary_key=True),
    db.Column('reply_id', db.String(64), db.ForeignKey('reply.id'), primary_key=True)
)


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.String(64), primary_key=True)
    loginname = db.Column(db.String(64),unique=True)
    avatar_url = db.Column(db.String(150),unique=True)
    score = db.Column(db.Integer)
    create_at = db.Column(db.DateTime, default=datetime.datetime.now())
    accesstoken = db.Column(db.String(64), unique=True)
    topics = db.relationship('Topic', backref='author', lazy='dynamic')
    replies = db.relationship('Reply', backref='author', lazy='dynamic')



    def __repr__(self):
        return '<User %r>' % self.loginname


class Topic(db.Model):
    __tablename__ = 'topic'
    id = db.Column(db.String(64), primary_key=True)
    title = db.Column(db.String(150))
    content = db.Column(db.Text)
    author_id = db.Column(db.String(64),db.ForeignKey('user.id'))
    top = db.Column(db.Boolean, default=False)
    good = db.Column(db.Boolean, default=False)
    reply_count = db.Column(db.Integer)
    visit_count = db.Column(db.Integer)
    create_at = db.Column(db.DateTime, default=datetime.datetime.now())
    update_at = db.Column(db.DateTime, default=datetime.datetime.now())
    last_reply_at = db.Column(db.DateTime, default=datetime.datetime.now())
    tabe = db.Column(db.String(64))
    replies = db.relationship('Reply', backref='topic', lazy='dynamic')


    def __repr__(self):
        return '<Topic %r>' % self.id


class Reply(db.Model):
    __tablename__ = 'reply'
    id = db.Column(db.String(64), primary_key=True)
    content = db.Column(db.Text)
    topic_id = db.Column(db.String(64),db.ForeignKey('topic.id'))
    author_id = db.Column(db.String(64),db.ForeignKey('user.id'))
    reply_id = db.Column(db.String(64),db.ForeignKey('reply.id'))
    create_at = db.Column(db.DateTime, default=datetime.datetime.now())
    ups = db.relationship('User', secondary=ups, backref=db.backref('ups', lazy='dynamic'), lazy='dynamic')


    def __repr__(self):
        return '<Reply %r>' % self.id








def add_user(loginname):
    r = requests.get('http://cnodejs.org/api/v1/user/%s' % loginname).json()
    user = User()
    user.id = shortuuid.ShortUUID().random(length=24)
    user.loginname = r['data']['loginname']
    user.avatar_url = r['data']['avatar_url']
    user.create_at = datetime.datetime.strptime(r['data']['create_at'], "%Y-%m-%dT%H:%M:%S.%fZ")
    user.score = r['data']['score']
    user.accesstoken = str(uuid.uuid4())
    db.session.add(user)
    db.session.commit()
    return user



def init_db():
    tab = ['good', 'share', 'job', 'dev']
    base_url = 'http://cnodejs.org/api/v1/'

    # topic列表页
    topics = set()
    users = []
    replies = set()

    # 获取topic和user总表
    for i in tab:
       for j in range(1, 6):
           param = {'page': str(j), 'tab': i, 'limit': '20'}
           r = requests.get(base_url + 'topics', params=param).json()
           for i in r['data']:
               topics.add(i['id'])
               if [i['author']['loginname'], i['author_id']] not in users:
                   users.append([i['author']['loginname'], i['author_id']])

    # 保存user到数据库
    for i in users:
        r = requests.get(base_url + 'user/%s' % i[0]).json()
        user = User()
        user.id = i[1]
        user.loginname = r['data']['loginname']
        user.avatar_url = r['data']['avatar_url']
        user.create_at = datetime.datetime.strptime(r['data']['create_at'], "%Y-%m-%dT%H:%M:%S.%fZ")
        user.score = r['data']['score']
        user.accesstoken = str(uuid.uuid4())
        db.session.add(user)
        db.session.commit()

    # 保存 topic 和reply 到数据库
    for i in topics:
        if i in [ '5ab3166be7b166bb7b9eccf7' , '56ef3edd532839c33a99d00e']:
            continue
        r = requests.get(base_url + 'topic/%s' % i).json()
        topic = Topic()
        topic.id = i
        topic.title = r['data']['title']
        topic.content = r['data']['content']
        # topic.author_id = r['data']['author_id']
        user = User.query.filter(User.id==r['data']['author_id']).first()
        topic.author = user
        topic.top = r['data']['top']
        topic.good = r['data']['good']
        topic.reply_count = r['data']['reply_count']
        topic.visit_count = r['data']['visit_count']
        topic.create_at = datetime.datetime.strptime(r['data']['create_at'], "%Y-%m-%dT%H:%M:%S.%fZ")
        topic.last_reply_at = datetime.datetime.strptime(r['data']['last_reply_at'], "%Y-%m-%dT%H:%M:%S.%fZ")
        topic.tabe = r['data']['tab']
        db.session.add(topic)
        db.session.commit()
        for j in r['data']['replies']:
            reply = Reply()
            reply.id =j['id']
            reply.content = j['content']
            # reply.topic_id = i
            topic = Topic.query.filter(Topic.id==i).first()
            reply.topic = topic
            reply_parent = Reply.query.filter(Reply.id == j['reply_id']).first()
            if reply_parent:
                reply.reply_id = reply_parent.id
            reply.create_at = datetime.datetime.strptime(j['create_at'], "%Y-%m-%dT%H:%M:%S.%fZ")
            reply.content = j['content']
            user = User.query.filter(User.loginname==j['author']['loginname']).first()
            '''
            if not user:
                reply.author_id = add_user(j['author']['loginname'])
            else:
                reply.author_id = user.id
            '''
            if not user:
                reply.author = add_user(j['author']['loginname'])
            else:
                reply.author = user
            db.session.add(reply)
            db.session.commit()
    print('完成')


if __name__ == '__main__':
    init_db()





















"""

"""