let users

window.addEventListener("pywebviewready", async () => {
    users = await pywebview.api.user_api.list_user()
    users.forEach((user,index) => {
        const userItem = document.createElement("div")
        userItem.classList.add("user-item")
        userItem.innerHTML = `
            <span class="user-item-icon material-symbols-outlined size-64">account_circle</span>
            <div class="user-item-info">
                <p class="user-item-name">${user.FirstName} ${user.LastName}</p>
                <p class="user-item-email">${user.Email}</p>
            </div>
            <button class="user-item-button" onclick="selectUser(${index})">Administrar</button>
        `
        document.querySelector(".user-list-container").appendChild(userItem)
    })
})

async function selectUser(index) {
    const selectedUser = users[index]
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser))
    await pywebview.api.view_api.modify_user_view()
}

async function searchUser(e) {
    e.preventDefault()
    const searchBarInput = document.querySelector(".search-bar-input").value
    const user = users.find(user => user.Email == searchBarInput)
    if (searchBarInput) {
        if (user) {
            const index = users.findIndex(user => user.Email == searchBarInput)
            document.querySelector(".search-user").style.cssText = 'display: flex;'
            document.querySelector(".search-user").innerHTML = `
                <span class="user-item-icon material-symbols-outlined size-64">account_circle</span>
                <div class="user-item-info">
                    <p class="user-item-name">${user.FirstName} ${user.LastName}</p>
                    <p class="user-item-email">${user.Email}</p>
                </div>
                <button onclick="selectUser(${index})" class="user-item-button">Administrar</button>
                </div>
            `
        } else {
            document.querySelector(".search-user").style.cssText = 'display: block; background: none;'
            document.querySelector(".search-user").innerHTML = 'El email no existe'
        }
    } else {
        document.querySelector(".search-user").style.cssText = 'display: block; background: none;'
        document.querySelector(".search-user").innerHTML = 'Ingrese un email'
    }
}

async function handleHeaderAction(event,action) {
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