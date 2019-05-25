# Setup Instructions

## Install pipenv
`pip install pip env` or `brew install pipenv`

## Running
Make sure to set the following env variables
```
$ export FLASK_ENV=development
$ export DATABASE_URL=postgres://name:password@host:port/blog_api_db
$ export JWT_SECRET_KEY=hhgaghhgsdhdhdd
```

## Database
# Installation
Make sure to install and run postgres >= 11.xx

# Migration
to create the tables
`python manage.py db init`

to create the migration changes for the db
`python manage.py db migrate`

to apply the changes to the db
`python manage.py db upgrade`
