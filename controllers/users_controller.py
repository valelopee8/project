import os
import pandas

class User:
    # Ruta del archivo user.csv
    def path_user_data(self):
        try:
            return os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','data','user.csv')
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Leer el archivo user.csv
    def read_user_data(self):
        try:
            return pandas.read_csv(self.path_user_data())
        except Exception as e:
            return f'Error: {str(e)}'
    
    # Generar una iista de las filas
    def list_user(self):
        try:
            df = self.read_user_data()
            return df.to_dict(orient='records')
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Determinar si un usuario existe
    def validate_user(self,email):
        try:
            df = self.read_user_data()
            return email in df['Email'].values
        except Exception as e:
            return f'Error: {str(e)}'

    # Validar proceso de login
    def login_process(self,email,password):
        try:
            df = self.read_user_data()
            row = df[(df['Email'] == email) & (df['Password'] == password)]
            if not row.empty:
                return True
            else:
                return False
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Añadir un usuario
    def add_user(self,first_name,last_name,email,password):
        try:
            new_row = {'FirstName':first_name,'LastName':last_name,'Email':email,'Password':password}
            df = self.read_user_data()
            df.loc[len(df)] = new_row
            df.to_csv(self.path_user_data(),index=False)
        except Exception as e:
            return f'Error: {str(e)}'

    # Modificar información de un usuario
    def modify_user(self,old_email,first_name,last_name,new_email,password):
        try:
            df = self.read_user_data()
            df.loc[df['Email'] == old_email,'FirstName'] = first_name
            df.loc[df['Email'] == old_email,'LastName'] = last_name
            df.loc[df['Email'] == old_email,'Password'] = password
            df.loc[df['Email'] == old_email,'Email'] = new_email
            df.to_csv(self.path_user_data(),index=False)
        except Exception as e:
            return f'Error: {str(e)}'
        
    # Eliminar un usuario
    def delete_user(self,email):
        try:
            df = self.read_user_data()
            df = df[df['Email'] != email]
            df.to_csv(self.path_user_data(),index=False)
        except Exception as e:
            return f'Error: {str(e)}'