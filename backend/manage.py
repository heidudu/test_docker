from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import create_app, db
import os
from flask_cors import CORS

# 从环境变量中获取config_name
config_name = os.environ.get('FLASK_CONFIG') or 'default'

# 生成app
app = create_app(config_name)
# 允许跨域
CORS(app, supports_credentials=True)
manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

# @app.shell_context_processor
# def make_shell_context():
#     return dict(db=db, User=User,Reply=Reply)



if __name__ == '__main__':
    manager.run()


