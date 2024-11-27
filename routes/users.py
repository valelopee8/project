import flask

users_routes = flask.Blueprint('users_routes',__name__)

@users_routes.route('/register')
def register():
    return flask.render_template('users/register.html')

@users_routes.route('/login')
def login():
    return flask.render_template('users/login.html')

@users_routes.route('/user/manage')
def user_manage():
    return flask.render_template('users/user-manage.html')

@users_routes.route('/user/modify')
def user_modify():
    return flask.render_template('users/user-modify.html')