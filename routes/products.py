import flask
import os
from controllers.products_controller import Product

products_routes = flask.Blueprint('products_routes',__name__)

@products_routes.route('/product/create')
def product_create():
    return flask.render_template('products/product-create.html')

@products_routes.route('/product/modify')
def product_modify():
    # if flask.request.method == 'POST':
        # product = flask.request['product']
        # price = flask.request['price']
        # stock = flask.request['stock']
        # file = flask.request.files['image']
        # Product.modify_product(product,price,stock,file)
        # filename = os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','public','images','products',file.filename)
        # file.save(filename)
    return flask.render_template('products/product-modify.html')

@products_routes.route('/product/manage')
def product_manage():
    return flask.render_template('products/product-manage.html')

@products_routes.route('/product/buy')
def product_buy():
    return flask.render_template('products/product-buy.html')

@products_routes.route('/product/admin-buy')
def admin_product_buy():
    return flask.render_template('products/admin-product-buy.html')