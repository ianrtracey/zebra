from flask import request, json, Response, Blueprint, g
from ..models.UserModel import UserModel, UserSchema
from ..lib.auth import Auth
from ..lib.response import build_response


user_api = Blueprint('users', __name__)
user_schema = UserSchema()

@user_api.route('/', methods=['POST'])
def create():
    req_data = request.get_json()
    data, error = user_schema.load(req_data)

    if error:
        return build_response(error, 400)
    
    user = UserModel.get_user_by_email(data.get('email'))
    if user:
        message = {
            'error': 'User already exists with that email.'
        }
        return build_response(message, 400)
    
    user = UserModel(data)
    user.save()

    user_data = user_schema.dump(user).data

    token = Auth.generate_token(user_data.get('id'))

    return build_response({
        'jwt_token': token
    }, 201)

@user_api.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()
    data, error = user_schema.load(request_data, partial=True)
    if error:
        return build_response(error, 400)
    
    if not data.get('email') or not data.get('password'):
        return build_response({'error': 'you need to include an email and password'}, 400)
    
    user = UserModel.get_user_by_email(data.get('email'))
    print data.get('email')
    print data.get('password')
    print user
    if not user or not user.check_hash(data.get('password')):
        return build_response({'error': 'invalid credentials'}, 400)

    user_data = user_schema.dump(user).data
    
    token = Auth.generate_token(user_data.get('id'))

    return build_response({'jwt_token': token}, 200)


@user_api.route('/me', methods=['GET'])
@Auth.auth_required
def me():
    user = UserModel.get_one_user(g.user.get('id'))
    user_data = user_schema.dump(user).data
    return build_response(user_data, 200)