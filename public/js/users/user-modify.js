const localUser= JSON.parse(localStorage.getItem('selectedUser'))

window.addEventListener("DOMContentLoaded", () =>{
    document.querySelector('.first-name').value = localUser.FirstName
    document.querySelector('.last-name').value = localUser.LastName
    document.querySelector('.email').value = localUser.Email
    document.querySelector('.password').value = localUser.Password
})

async function handleUserAction(e,action) { 
    e.preventDefault()

    const firstName =  document.querySelector('.first-name').value 
    const lastName = document.querySelector('.last-name').value
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value

    if (action == 'delete') {
        await pywebview.api.user_api.delete_user(localUser.Email)
        document.querySelector('.msg').style.display = 'block'
        document.querySelector('.msg').innerHTML = '<p style="color: #f44336; font-weight: bold;">Operación exitosa. Redirigiendo al inicio</p>'
        document.querySelector('.form-button-1').style.display = 'none'
        document.querySelector('.form-button-2').style.display = 'none'
        document.querySelector('.title-delete').style.display = 'none'
        setTimeout(async function() {
            await pywebview.api.view_api.main_admin_view()
        }, 2000)
    }
    
    if (firstName && lastName && email && password) {
        if (action == 'modify') {
            await pywebview.api.user_api.modify_user(localUser.Email,firstName,lastName,email,password)
            document.querySelector('.msg').style.display = 'block'
            document.querySelector('.msg').innerHTML = '<p style="color: #f44336; font-weight: bold;">Operación exitosa. Redirigiendo al inicio</p>'
            document.querySelector('.form-button-1').style.display = 'none'
            document.querySelector('.form-button-2').style.display = 'none'
            document.querySelector('.title-delete').style.display = 'none'
            setTimeout(async function() {
                await pywebview.api.view_api.main_admin_view()
            }, 2000)
        }
    } else {
        document.querySelector('.msg').style.display = 'block'
        document.querySelector('.msg').innerHTML = '<p style="color: #f44336; font-weight: bold;">Complete todos los campos</p>'
    }
}

async function handleHeaderAction(action) {
    if (action == 'main') {
        await pywebview.api.view_api.main_admin_view()
    } else if (action == 'logOut') {
        await pywebview.api.view_api.welcome_view()
    } else if (action == 'manageProducts') {
        await pywebview.api.view_api.manage_product_view()
    } else if (action == 'manageUsers') {
        await pywebview.api.view_api.manage_user_view()
    }
}