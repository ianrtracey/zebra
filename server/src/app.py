from flask import Flask
from flask_cors import CORS

from .config import app_config
from .models import db, bcrypt
from .views.UserView import user_api as user_blueprint


def create_app(env_name):
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config.from_object(app_config[env_name])

    bcrypt.init_app(app)
    db.init_app(app)

    app.register_blueprint(user_blueprint, url_prefix='/api/v1/users')
    @app.route('/', methods=['GET'])
    def index():
        return 'zebra'
    
    return app


