import flask

index_routes = flask.Blueprint('index_routes',__name__)

@index_routes.route('/')
def welcome():
    return flask.render_template('index/welcome.html')

@index_routes.route('/main')
def main():
    return flask.render_template('index/main.html')

@index_routes.route('/main-admin')
def main_admin():
    return flask.render_template('index/main-admin.html')

