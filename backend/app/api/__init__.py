from flask import Blueprint

api = Blueprint('api', __name__)

# 写在最后是因为避免循环导入依赖，因为接下来在 api 文件夹下创建的 都要导入蓝本 api。
from . import errors, user, topic, collect, reply, message

