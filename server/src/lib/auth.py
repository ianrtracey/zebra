import jwt
import os
import jwt
import os
import datetime
from flask import json, request, g
from functools import wraps
from ..models.UserModel import UserModel
from ..lib.response import build_response

class Auth():
    @staticmethod
    def generate_token(user_id):
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                os.getenv('JWT_SECRET_KEY'),
                'HS256'
            ).decode("utf-8")
        except Exception as e:
            return build_response({
                'error': 'error generating jwt token'
            }, 400)

    @staticmethod
    def decode_token(token):
        response = { 'data': {}, 'error': {} }
        try: 
            payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY'))
            response['data'] = { 'user_id': payload['sub'] }
            return response
        except jwt.ExpiredSignatureError:
            response['error'] = { 'message': 'token expired, please log in' }
            return response
        except jwt.InvalidTokenError:
            response['error'] = { 'message': 'invalid token, please log in' }
            return response
    
    # decorator for protected routes
    @staticmethod
    def auth_required(func):
        @wraps(func)
        def decorated_auth(*args, **kwargs):
            if 'api-token' not in request.headers:
                return build_response({
                    'error': 'Authentication required. Please included api-token in header'
                }, 400)

            token = request.headers.get('api-token')
            data = Auth.decode_token(token)

            if data['error']:
                return build_response(data['error'], 400)
                
            user_id = data['data']['user_id']
            user = UserModel.get_one_user(user_id)
            if not user:
                return build_response({
                    'error': 'user does not exist '
                })

            g.user = { 'id': user_id}
            return func(*args, **kwargs)
        return decorated_auth
