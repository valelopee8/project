async function handleProductAction(e) { 
    e.preventDefault()

    const product = document.querySelector('.product').value
    const price = document.querySelector('.price').value
    const stock = document.querySelector('.stock').value
    const image = document.querySelector('.image').value
    const store = document.querySelector('.store').value
    
    if (product && price && stock && image && store) {
        if (parseInt(stock) > 0 && parseInt(price) > 0) {
            const validateProduct = await pywebview.api.product_api.validate_product(store,product)
            if (!validateProduct) {
                await pywebview.api.product_api.add_product(store,product,price,stock,image)
                document.querySelector('.msg').style.display = 'block'
                document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">Operación exitosa. Redirigiendo al inicio</p>'
                document.querySelector('.form-button-1').style.display = 'none'
                setTimeout( async function (){
                    await pywebview.api.view_api.main_admin_view()
                }, 2000)
            } else {
                document.querySelector('.msg').style.display = 'block'
                document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">El producto ya existe</p>'
            }
        } else {
            document.querySelector('.msg').style.display = 'block'
            document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">Los valores deben ser mayores que cero</p>'
        }
    } else {
        document.querySelector('.msg').style.display = 'block'
        document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">Complete todos los campos</p>'
    }
}

async function handleHeaderAction(action) {
    if (action == 'main') {
        await pywebview.api.view_api.main_admin_view()
    } else if (action == 'logOut') {
        await pywebview.api.view_api.welcome_view()
    } else if (action == 'manageProducts') {
        await pywebview.api.view_api.manage_product_view()
    } else if (action == 'createProduct') {
        await pywebview.api.view_api.create_product_view()
    } else if (action == 'manageUsers') {
        await pywebview.api.view_api.manage_user_view()
    } else if (action == 'createUser') {
        await pywebview.api.view_api.create_user_view()
    }
}