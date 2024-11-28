import webview

class View:

    # Vistas para sesiones
    def welcome_view(self):
        try:
            webview.active_window().load_url('/')
            webview.active_window().title = 'GameON'
        except Exception as e:
            return f'Error: {str(e)}'

    def register_view(self):
        try:
            webview.active_window().load_url('/register')
            webview.active_window().title = 'GameON - Register'
        except Exception as e:
            return f'Error: {str(e)}'

    def login_view(self):
        try:
            webview.active_window().load_url('/login')
            webview.active_window().title = 'GameON - Login'
        except Exception as e:
            return f'Error: {str(e)}'
        
        
    def manage_user_view(self):
        try:
            webview.active_window().load_url('/user/manage')
            webview.active_window().title = 'GameON - Manage Users'
        except Exception as e:
            return f'Error: {str(e)}'
        
    def create_user_view(self):
        try:
            webview.active_window().load_url('/user/create')
            webview.active_window().title = 'GameON - Create User'
        except Exception as e:
            return f'Error: {str(e)}'
        
    def modify_user_view(self):
        try:
            webview.active_window().load_url('/user/modify')
            webview.active_window().title = 'GameON - Modify User'
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Vistas para productos
    def manage_product_view(self):
        try:
            webview.active_window().load_url('/product/manage')
            webview.active_window().title = 'GameON - Manage Products'
        except Exception as e:
            return f'Error: {str(e)}'

    def create_product_view(self):
        try:
            webview.active_window().load_url('/product/create')
            webview.active_window().title = 'GameON - Create Product'
        except Exception as e:
            return f'Error: {str(e)}'

    def modify_product_view(self):
        try:
            webview.active_window().load_url('/product/modify')
            webview.active_window().title = 'GameON - Modify Product'
        except Exception as e:
            return f'Error: {str(e)}'

    def buy_product_view(self):
        try:
            webview.active_window().load_url('/product/buy')
            webview.active_window().title = 'GameON - Buy'
        except Exception as e:
            return f'Error: {str(e)}'
        
    def admin_buy_product_view(self):
        try:
            webview.active_window().load_url('/product/admin-buy')
            webview.active_window().title = 'GameON - Admin Buy'
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Vistas para usuarios
    def main_view(self):
        try:
            webview.windows[0].load_url('/main')
            webview.windows[0].title = 'GameON - Main'
        except Exception as e:
            return f'Error: {str(e)}'

    # Vistas para el administrador
    def main_admin_view(self):
        try:
            webview.windows[0].load_url('/main-admin')
            webview.windows[0].title = 'GameON - Admin'
        except Exception as e:
            return f'Error: {str(e)}'