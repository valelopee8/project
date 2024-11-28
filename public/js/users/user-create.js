async function handleUserAction(e) { 
    e.preventDefault()

    const firstName = document.querySelector('.first-name').value
    const lastName = document.querySelector('.last-name').value
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    
    if (firstName && lastName && email && password) {
        const validateUser = await pywebview.api.user_api.validate_user(email)
        if (!validateUser) {
            await pywebview.api.user_api.add_user(firstName,lastName,email,password)
            document.querySelector('.msg').style.display = 'block'
            document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">Operación exitosa. Redirigiendo al inicio</p>'
            document.querySelector('.form-button-1').style.display = 'none'
            setTimeout( async function (){
                await pywebview.api.view_api.main_admin_view()
            }, 2000)
        } else {
            document.querySelector('.msg').style.display = 'block'
            document.querySelector('.msg').innerHTML = '<p style="color: white; font-weight: bold;">El email ya existe</p>'
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