import webview

from server import server

from controllers.views_controller import View
from controllers.users_controller import User
from controllers.products_controller import Product

class Api:
    def __init__(self):
        self.user_controller = User()
        self.product_controller = Product()
        self.view_controller = View()
    
    @property
    def user_api(self):
        return self.user_controller
    
    @property
    def product_api(self):
        return self.product_controller  
    
    @property
    def view_api(self):
        return self.view_controller

if __name__ == '__main__':
    window = webview.create_window('GameON',server,js_api=Api(),width=1366, height=717)
    webview.start(private_mode=False,icon='./uploads/icon.png')