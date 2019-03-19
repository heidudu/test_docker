# coding: utf-8
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'I am heidudu'
    # 让json正常显示
    JSON_AS_ASCII = False

    LIST_TOPIC_COUNT = 20

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://heidudu:heidudu@127.0.0.1:3306/cnode'
    # 设置这一项是每次请求结束后都会自动提交数据库中的变动
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}



