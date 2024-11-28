let storeList

window.addEventListener("pywebviewready", async function() {
    storeList = await pywebview.api.product_api.list_store()

    Object.entries(storeList).forEach(([storeName, store]) => {
        const productContainer = document.createElement("div")
        productContainer.classList.add("product-container")

        const storeTitle = document.createElement("h2")
        storeTitle.classList.add("product-item-store")

        storeTitle.textContent = storeName
        document.querySelector(".product-list-container").appendChild(storeTitle)
    
        store.forEach((product, indexProduct) => {
            const productItem = document.createElement("div")
            productItem.classList.add("product-item")
            productItem.innerHTML = `
                <div class="product-item-photo">
                    <img src="/static/images/products/${product.Image}" alt="Product Photo">
                </div>
                <div class="product-item-info">
                    <p class="product-item-name">${product.Product}</p>
                    <p class="product-item-price">$${product.Price}</p>
                    <p class="product-item-stock">Cant. ${product.Stock}</p>
                </div>
                <button class="product-item-button" onclick="selectProduct('${storeName}', ${indexProduct})">Administrar</button>
            `        
            productContainer.appendChild(productItem)
        })
        document.querySelector(".product-list-container").appendChild(productContainer)
    })
})

async function selectProduct(storeName,indexProduct) {
    localStorage.setItem('selectedStore',storeName)
    const selectedProduct = storeList[storeName][indexProduct]
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct))
    await pywebview.api.view_api.modify_product_view()
}

async function searchProduct(e) {
    e.preventDefault()
    
    const storeList = await pywebview.api.product_api.list_store()
    const productSearch = document.querySelector(".search-bar-input-product").value
    const storeName = document.querySelector(".search-bar-input-store").value
    
    if (productSearch && storeName) {
        const store = storeList[storeName]
        
        if (store) {
            const product = store.find(product => product.Product == productSearch)
            
            if (product) {
                document.querySelector(".search-product").style.display = "flex"
                document.querySelector(".search-product").innerHTML = `
                    <div class="product-item">
                        <div class="product-item-photo">
                            <img src="/static/images/products/${product.Image}" alt="Product Photo">
                        </div>
                        <div class="product-item-info">
                            <p class="product-item-name">${product.Product}</p>
                            <p class="product-item-price">$${product.Price}</p>
                            <p class="product-item-stock">Cant. ${product.Stock}</p>
                        </div>
                        <button onclick="selectProduct('${storeName}', ${store.indexOf(product)})" class="product-item-button">Administrar</button>
                    </div>
                `
            } else {
                document.querySelector(".search-product").style.display = "block"
                document.querySelector(".search-product").innerHTML = 'Producto no encontrado en esta sucursal'
            }
        } else {
            document.querySelector(".search-product").style.display = "block"
            document.querySelector(".search-product").innerHTML = 'Sucursal no encontrada'
        }
    } else {
        document.querySelector(".search-product").style.display = "block"
        document.querySelector(".search-product").innerHTML = 'Por favor ingrese un producto y una sucursal'
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