window.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'))
    document.querySelector('.image').innerHTML = `
        <img src="/static/images/products/${product.Image}"></img>
    `
})

const product = JSON.parse(localStorage.getItem('selectedProduct'))
const store = localStorage.getItem('selectedStore')

function mostrarFormularioTarjeta() {
    const method = document.querySelector('.method').value
    const card = document.querySelector('.card') 
    if (method === 'debit' || method === 'credit') {
        card.style.display = 'block'
    } else {
        card.style.display = 'none'
    }
}

async function handleProductAction(e) {
    e.preventDefault()

    const method = document.querySelector('.method').value
    const stock = document.querySelector('.stock').value
    const formButton = document.querySelector('.send-button')
    const msg = document.querySelector('.msg')
    
    if (stock) {
        if (method === 'counted') {
            if (parseInt(product.Stock) >= parseInt(stock) && parseInt(stock) > 0) {
                await pywebview.api.product_api.buy_product(store,product.Product,stock)
                msg.innerHTML = `<p style="color: white;font-weight: bold;">Pedido completado con éxito. Redirigiendo al inicio</p>`
                formButton.style.display = 'none'
                setTimeout(async function() {
                    await pywebview.api.view_api.main_admin_view()
                }, 2000)
            } else {
                msg.innerHTML = `<p style="color: white;font-weight: bold;">Ingrese una cantidad positiva menor o igual a ${product.Stock}</p>`
            }
        } else {
            const number = document.querySelector('.number').value
            const date = document.querySelector('.date').value
            const code = document.querySelector('.code').value
            if (number && date && code) {
                if (parseInt(product.Stock) >= parseInt(stock) && parseInt(stock) > 0) {
                    await pywebview.api.product_api.buy_product(store,product.Product,stock)
                    msg.innerHTML = `<p style="color: white;font-weight: bold;">Pedido completado con éxito. Redirigiendo al inicio</p>`
                    formButton.style.display = 'none'
                    setTimeout(async function() {
                        await pywebview.api.view_api.main_admin_view()
                    }, 2000)
                } else {
                    msg.innerHTML = `<p style="color: white;font-weight: bold;">Ingrese una cantidad positiva menor o igual a ${product.Stock}</p>`
                }
            } else {
                msg.innerHTML = '<p style="color: white;font-weight: bold;">Complete todos los campos de la tarjeta</p>'
            }
        }
    } else {
        msg.innerHTML = '<p style="color: white;font-weight: bold;">Complete todos los campos</p>' 
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