async function handleFormAction(e,action) { 
    e.preventDefault()
    const firstName = document.querySelector('.first-name').value
    const lastName = document.querySelector('.last-name').value
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    if (action == 'login') {
        await pywebview.api.view_api.login_view()
    }
    if (firstName && lastName && email && password) {
        if (action == 'register') {
            const response = await pywebview.api.user_api.validate_user(email)
            if (response) {
                document.querySelector('.msg').style.cssText = "display:block; color: #f44336; font-weight: bold"
                document.querySelector('.msg').textContent = 'El email ya existe'
            } else {
                await pywebview.api.user_api.add_user(firstName,lastName,email,password)
                document.querySelector('.msg').style.cssText = "display:block; color: #f44336; font-weight: bold"
                document.querySelector('.msg').textContent = 'Operación exitosa. Redirigiendo al formulario de login'
                setTimeout(async function() {
                    await await pywebview.api.view_api.login_view()
                }, 5000)
            }
        }
    } else {
        document.querySelector('.msg').style.cssText = "display:block; color: #f44336; font-weight: bold"
        document.querySelector('.msg').textContent = 'Complete todos los campos'
    }
}