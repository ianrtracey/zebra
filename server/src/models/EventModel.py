from marshmallow import fields, Schema
from . import db
import datetime

class EventModel(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime)
    modified_at = db.Column(db.DateTime)
    date = db.Column(db.DateTime)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) # add this new line
    external_link = db.Column(db.String(64), nullable=False)

    def __init__(self, data):
        self.title = data.get('title')
        self.description = data.get('description')
        self.location = data.get('location')
        self.date = data.get('date')
        self.created_at = datetime.datetime.utcnow()
        self.modified_at = datetime.datetime.utcnow()
        self.owner_id = data.get('owner_id')
        self.external_link = data.get('external_link')

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        self.modified_at = datetime.datetime.utcnow()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        de.session.commit()

    @staticmethod
    def get_all_events():
        return EventModel.query.all()

    @staticmethod
    def get_user_events(user_id):
        return EventModel.query.filter_by(owner_id=user_id)

    @staticmethod
    def get_event(id):
        return EventModel.query.get(id)

    @staticmethod
    def get_event_with_external_link(link):
        print(f"Link is: {link}")
        return EventModel.query.filter_by(external_link=link).first()

    def __repr__(self):
        return '<id {}>'.format(self.id)


class EventSchema(Schema):
  id = fields.Int(dump_only=True)
  title = fields.Str(required=True)
  description = fields.Str(required=True)
  location = fields.Str(required=True)
  date = fields.DateTime(required=True)
  owner_id = fields.Int(required=True)
  created_at = fields.DateTime(dump_only=True)
  external_link = fields.Str(required=True)


