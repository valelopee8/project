async function handleFormAction(e,action) { 
    e.preventDefault()
    const email = document.querySelector('.email').value
    localStorage.setItem('userLogin',email)
    const password = document.querySelector('.password').value
    if (action == 'register') {
        await pywebview.api.view_api.register_view()
    }
    if (email && password) {
        if (action == 'login') {
            const response = await pywebview.api.user_api.login_process(email,password)
            if (response) {
                if (email == 'admin') {
                    document.querySelector('.msg').style.cssText = "display:block; color: #f44336; font-weight: bold"
                    document.querySelector('.msg').textContent = 'Bienvenido administrador. Redirigiendo al inicio'
                    setTimeout(async function() {
                        await pywebview.api.view_api.main_admin_view()
                    }, 2000)
                } else {
                    document.querySelector('.msg').style.cssText = "display:block; color: #f44336; font-weight: bold"
                    document.querySelector('.msg').textContent = 'Operación exitosa. Redirigiendo al inicio'
                    setTimeout(async function() {
                        await pywebview.api.view_api.main_view()
                    }, 2000)
                }
            } else {
                document.querySelector('.msg').style.cssText = "display:block; color: #f44336; font-weight: bold"
                document.querySelector('.msg').textContent = 'Datos incorrectos'
            }
        }
    } else {
        document.querySelector('.msg').style.cssText = "display:block; color: #f44336; font-weight: bold"
        document.querySelector('.msg').textContent = 'Complete todos los campos'
    }
}