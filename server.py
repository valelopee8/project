import flask

from routes.users import users_routes
from routes.products import products_routes
from routes.index import index_routes

server = flask.Flask(__name__,static_url_path='/static',static_folder='public',template_folder='views')

server.register_blueprint(users_routes)
server.register_blueprint(products_routes)
server.register_blueprint(index_routes)