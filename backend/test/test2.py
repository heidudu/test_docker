# coding: utf-8
import requests
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask import Flask
from sqlalchemy.sql.expression import func
import random
import shortuuid



app = Flask(__name__)
# 添加charset的原因为默认的格式为utf-8，出现emoj表情符号会报错
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://heidudu:heidudu@127.0.0.1:3306/cnode?charset=utf8mb4'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# 点赞表
ups = db.Table('ups',
    db.Column('user_id', db.String(64), db.ForeignKey('user.id'), primary_key=True),
    db.Column('reply_id', db.String(64), db.ForeignKey('reply.id'), primary_key=True),

)

# 收藏表
collects = db.Table('collects',
    db.Column('user_id', db.String(64), db.ForeignKey('user.id'), primary_key=True),
    db.Column('topic_id', db.String(64), db.ForeignKey('topic.id'), primary_key=True),
    db.Column('create_at', db.DateTime, default=datetime.datetime.now())
)


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.String(64), default=shortuuid.ShortUUID().random(length=24), primary_key=True)
    loginname = db.Column(db.String(64),unique=True)
    avatar_url = db.Column(db.String(150),unique=True)
    score = db.Column(db.Integer)
    create_at = db.Column(db.DateTime, default=datetime.datetime.now())
    accesstoken = db.Column(db.String(64), unique=True)
    topics = db.relationship('Topic', backref='author', lazy='dynamic')
    replies = db.relationship('Reply', backref='author', lazy='dynamic')
    send_messages = db.relationship("Message",foreign_keys='Message.send_user_id', back_populates="send_user")
    receive_messages = db.relationship("Message",foreign_keys='Message.receive_user_id', back_populates="receive_user")


    @property
    def recent_topics(self):
        data = []
        topics = self.topics.order_by(Topic.create_at.desc()).limit(5)
        if topics:
            for i in topics:
                data.append({
                "id": i.id,
                "author": {
                    "loginname":self.loginname ,
                    "avatar_url": self.avatar_url
                },
                "title": i.title,
                "last_reply_at": i.last_reply_at
                })
        return data

    @property
    def recent_replies(self):
        data = []
        replies = self.replies.group_by(Reply.topic_id).order_by(Reply.create_at.desc()).limit(5)
        if replies:
            for i in replies:
                data.append({
                "id": i.topic_id,
                "author": {
                    "loginname": i.topic.author.loginname,
                    "avatar_url": i.topic.author.avatar_url
                },
                "title": i.topic.title,
                "last_reply_at": i.topic.last_reply_at
                })
        return data

    @property
    def author_serialize(self):
        return {
            'loginname': self.loginname,
            'avatar_url': self.avatar_url,
        }

    @staticmethod
    def get_by_accesstoken(accesstoken):
        user = User.query.filter(User.accesstoken==accesstoken).first()
        return user

    def __repr__(self):
        return '<User %r>' % self.loginname


class Topic(db.Model):
    __tablename__ = 'topic'
    id = db.Column(db.String(64),default=shortuuid.ShortUUID().random(length=24),  primary_key=True)
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
    tab = db.Column(db.String(64))
    replies = db.relationship('Reply', backref='topic', lazy='dynamic')
    collects = db.relationship('User', secondary=collects, backref=db.backref('collects', lazy='dynamic'), lazy='dynamic')
    messages = db.relationship('Message', backref='topic', lazy='dynamic')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'author_id': self.author_id,
            'tab': self.tab,
            'content': self.content,
            'title': self.title,
            'last_reply_at': self.last_reply_at,
            'good': self.good,
            'top': self.top,
            'reply_count': self.reply_count,
            'visit_count': self.visit_count,
            'create_at': self.create_at,
            'author': self.author.author_serialize

        }

    @staticmethod
    def get_topics(tab, limit, page):
        data = []
        if tab == 'all':
            data = Topic.query.filter(Topic.tab != 'dev').order_by(Topic.last_reply_at.desc()).paginate(page, limit, False).items
        elif tab in ['dev', 'share', 'job', 'ask']:
            data = Topic.query.filter(Topic.tab == tab).order_by(Topic.last_reply_at.desc()).paginate(page, limit, False).items
        elif tab == 'good':
            data = Topic.query.filter(Topic.good == True).order_by(Topic.last_reply_at.desc()).paginate(page, limit, False).items
        return [i.serialize for i in data]

    def include_replies(self, accesstoken):
        data = self.serialize
        replies_list = []
        for i in self.replies.order_by(Reply.create_at.desc()).all():
            reply = i.serialize
            if accesstoken:
                user = User.query.filter(User.accesstoken==accesstoken).first()
                if user and (user.id in reply['ups']):
                    reply['is_uped'] = True
            replies_list.append(reply)
        data.update({'replies': replies_list})
        return data

    def __repr__(self):
        return '<Topic %r>' % self.id


class Reply(db.Model):
    __tablename__ = 'reply'
    id = db.Column(db.String(64), default=shortuuid.ShortUUID().random(length=24),  primary_key=True)
    content = db.Column(db.Text)
    topic_id = db.Column(db.String(64), db.ForeignKey('topic.id'))
    author_id = db.Column(db.String(64), db.ForeignKey('user.id'))
    reply_id = db.Column(db.String(64), db.ForeignKey('reply.id'))
    create_at = db.Column(db.DateTime, default=datetime.datetime.now())
    ups = db.relationship('User', secondary=ups, backref=db.backref('ups', lazy='dynamic'), lazy='dynamic')
    messages = db.relationship('Message', backref='reply', lazy='dynamic')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'author': self.author.author_serialize,
            'content': self.content,
            'create_at': self.create_at,
            'reply_id': self.reply_id,
            'is_uped': False,
            'ups': [i.id for i in self.ups],
        }

    def __repr__(self):
        return '<Reply %r>' % self.id


'''
 * reply: xx 回复了你的话题
 * reply2: xx 在话题中回复了你
 * at: xx ＠了你
'''


class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.String(64),default=shortuuid.ShortUUID().random(length=24),  primary_key=True)
    type = db.Column(db.String(64))
    # 收到消息的用户
    receive_user_id = db.Column(db.String(64), db.ForeignKey('user.id'))
    # 触发消息的用户
    send_user_id = db.Column(db.String(64), db.ForeignKey('user.id'))
    topic_id = db.Column(db.String(64), db.ForeignKey('topic.id'))
    reply_id = db.Column(db.String(64), db.ForeignKey('reply.id'))
    has_read = db.Column(db.Boolean, default=False)
    create_at = db.Column(db.DateTime, default=datetime.datetime.now())
    send_user = db.relationship('User', back_populates='send_messages',  foreign_keys=[send_user_id] )
    receive_user = db.relationship('User',back_populates='receive_messages', foreign_keys=[receive_user_id])

    @property
    def serialize(self):
        return {
            'id': self.id,
            'type': self.type,
            'has_read': self.has_read,
            'author': self.author.author_serialize,
            'topic': {
                'id': self.topic.id,
                'title': self.topic.title,
                'last_reply_at': self.topic.last_reply_at
            },
            'reply': {
                'id': self.reply.id,
                'content': self.reply.content,
                'ups': [i.id for i in self.reply.ups],
                'create_at': self.reply.create_at,

            },
            'create_at': self.create_at
        }

    def __repr__(self):
        return '<Message %r>' % self.id



def add_tab():
    topics = Topic.query.all()
    for i in topics:
        r = requests.get('http://cnodejs.org/api/v1/topic/%s' % i.id).json()
        i.tab = r['data']['tab']
        db.session.add(i)
        db.session.commit()
    print('完成')


def add_ups():
    replies = Reply.query.order_by(func.rand()).limit(100)
    for i in replies:
        num = random.randint(1, 50)
        users = User.query.order_by(func.rand()).limit(num)
        for j in users:
            i.ups.append(j)
        db.session.add(i)
        db.session.commit()


def add_parent_reply():
    replies = Reply.query.all()
    for i in replies:
        if i.reply_id:
            parent_reply = Reply.query.filter(Reply.id == i.reply_id).first()
            i.parent = parent_reply
            db.session.add(i)
            db.session.commit()


def add_collects():
    topics = Topic.query.order_by(func.rand()).limit(20)
    for i in topics:
        users = User.query.order_by(func.rand()).limit(random.randint(1, 15))
        for j in users:
            i.collects.append(j)
            db.session.add(i)
            db.session.commit()


def add_messages():
    replies = Reply.query.all()
    for i in replies:
        message = Message()
        if i.reply_id:
            message.type = 'reply2'
            message.receive_user = Reply.query.filter(Reply.id == i.reply_id).first().author
        else:
            message.type = 'reply'
            message.receive_user = i.topic.author
        message.id = shortuuid.ShortUUID().random(length=24)
        message.send_user = i.author
        message.topic = i.topic
        message.reply = i
        message.create_at = i.create_at
        db.session.add(message)
        db.session.commit()


if __name__ == '__main__':
    add_messages()
