import os
import pandas

class Product:

    # Ruta del archivo store1.csv
    def path_store1_data(self):
        try:
            return os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','data','store1.csv')
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Ruta del arhivo store2.csv
    def path_store2_data(self):
        try:
            return os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','data','store2.csv')
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Ruta del archivo store3.csv
    def path_store3_data(self):
        try:
            return os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','data','store3.csv')
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Leer el archivo store1.csv
    def read_store1_data(self):
        try:
            return pandas.read_csv(self.path_store1_data(),dtype=str)
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Leer el archivo store2.csv
    def read_store2_data(self):
        try:
            return pandas.read_csv(self.path_store2_data(),dtype=str)
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Leer el archivo store3.csv
    def read_store3_data(self):
        try:
            return pandas.read_csv(self.path_store3_data(),dtype=str)
        except Exception as e:
            return f'Error: {str(e)}'

    # Determinar ubicación del archivo
    def determine_path_store_data(self,store):
        try:
            if store == 'Sucursal 1':
                return self.path_store1_data()
            elif store == 'Sucursal 2':
                return self.path_store2_data()
            elif store == 'Sucursal 3':
                return self.path_store3_data()
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Determinar lectura del archivo
    def determine_store(self,store):
        try:
            if store == 'Sucursal 1':
                return self.read_store1_data()
            elif store == 'Sucursal 2':
                return self.read_store2_data()
            elif store == 'Sucursal 3':
                return self.read_store3_data()
        except Exception as e:
            return f'Error: {str(e)}'

    # Definir lista de sucursales
    def list_store(self):
        try:
            list_store = {"Sucursal 1": [],"Sucursal 2": [],"Sucursal 3": []}
            list_store["Sucursal 1"] = self.read_store1_data().to_dict(orient='records')
            list_store["Sucursal 2"] = self.read_store2_data().to_dict(orient='records')
            list_store["Sucursal 3"] = self.read_store3_data().to_dict(orient='records')
            return list_store
        except Exception as e:
            return f'Error: {str(e)}'
    
    # Proceso de compra de un producto
    def buy_product(self,store,product,stock):
        df = self.determine_store(store)
        row = df[df['Product'] == product]
        current_stock = row['Stock'].values[0]
        df.loc[df['Product'] == product, 'Stock'] = int(current_stock) - int(stock)
        df.to_csv(self.determine_path_store_data(store), index=False)
   
    # Añadir un producto
    def add_product(self,store,product,price,stock):
        try:
            new_row = {'Product':product,'Price':price,'Stock':stock}
            df = self.determine_store(store)
            df.loc[len(df)] = new_row
            df.to_csv(self.determine_path_store_data(store),index=False)
        except Exception as e:
            return f'Error: {str(e)}'

    # Modificar información de un producto
    def modify_product(self,store,old_product,new_product,price,stock,image):
        try:
            df = self.determine_store(store)
            df.loc[df['Product'] == old_product,'Price'] = price
            df.loc[df['Product'] == old_product,'Stock'] = stock
            df.loc[df['Product'] == old_product,'Image'] = image
            df.loc[df['Product'] == old_product,'Product'] = new_product
            df.to_csv(self.determine_path_store_data(store),index=False)
        except Exception as e:
            return f'Error: {str(e)}' 

    # Eliminar un producto
    def delete_product(self,store,product):
        try:
            df = self.determine_store(store)
            df = df[df['Product'] != product]
            df.to_csv(self.determine_path_store_data(store),index=False)
        except Exception as e:
            return f'Error: {str(e)}'     