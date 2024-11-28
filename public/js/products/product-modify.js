const localProduct = JSON.parse(localStorage.getItem('selectedProduct'))
const store = localStorage.getItem('selectedStore')

window.addEventListener("DOMContentLoaded", () =>{
    document.querySelector('.product').value = localProduct.Product
    document.querySelector('.price').value = localProduct.Price
    document.querySelector('.stock').value = localProduct.Stock
    document.querySelector('.image-name').value = localProduct.Image
    document.querySelector('.image').innerHTML = `
    <img src="/static/images/products/${localProduct.Image}"></img>
    `
})

let image
async function handleProductAction(e,action) { 
    e.preventDefault()

    const product = document.querySelector('.product').value
    const price = document.querySelector('.price').value
    const stock = document.querySelector('.stock').value
    const image = document.querySelector('.image-name').value

    if (action == 'delete') {
        await pywebview.api.product_api.delete_product(store,localProduct.Product)
        document.querySelector('.msg').style.display = 'block'
        document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">Operación exitosa. Redirigiendo al inicio</p>'
        document.querySelector('.form-button-1').style.display = 'none'
        document.querySelector('.form-button-2').style.display = 'none'
        document.querySelector('.title-delete').style.display = 'none'
        setTimeout(async function() {
            await pywebview.api.view_api.main_admin_view()
        }, 2000)
    }
    
    if (product && price && stock && image) {
        if (parseInt(stock) >= 0 && parseInt(price) > 0) {
            if (localProduct.Product == product) {
                if (action == 'modify') {
                    await pywebview.api.product_api.modify_product(store,localProduct.Product,product,price,stock,image)
                    document.querySelector('.msg').style.display = 'block'
                    document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">Operación exitosa. Redirigiendo al inicio</p>'
                    document.querySelector('.form-button-1').style.display = 'none'
                    document.querySelector('.form-button-2').style.display = 'none'
                    document.querySelector('.title-delete').style.display = 'none'
                    setTimeout(async function() {
                        await pywebview.api.view_api.main_admin_view()
                    }, 2000)
                }
            } else {
                const validateProduct = await pywebview.api.product_api.validate_product(store,product)
                if (!validateProduct) {
                    if (action == 'modify') {
                        await pywebview.api.product_api.modify_product(store,localProduct.Product,product,price,stock,image)
                        document.querySelector('.msg').style.display = 'block'
                        document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">Operación exitosa. Redirigiendo al inicio</p>'
                        document.querySelector('.form-button-1').style.display = 'none'
                        document.querySelector('.form-button-2').style.display = 'none'
                        document.querySelector('.title-delete').style.display = 'none'
                        setTimeout(async function() {
                            await pywebview.api.view_api.main_admin_view()
                        }, 2000)
                    }
                } else {
                    document.querySelector('.msg').style.display = 'block'
                    document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">El producto ya existe</p>'
                }
            }
        } else {
            document.querySelector('.msg').style.display = 'block'
            document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">El stock debe ser >= 0 y el precio > 0</p>'
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