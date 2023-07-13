const url = "https://backendcoderhouse.onrender.com"





const getCart = async () => {
    const response = await fetch(`${url}/api/carts`, {
        method: 'GET',
    });

    const cart = await response.json();
    const cartProducts = cart.cart.products;

    const cartItemsContainer = document.getElementById('cartList')
    var children = cartItemsContainer.childNodes;
    for (var i = children.length - 1; i >= 0; i--) {
        cartItemsContainer.removeChild(children[i]);
    }
    let totalCompra = 0;
    if (cartProducts.length == 0) {
        let item = document.createElement("div");
        let itemContent = `<h2 class="text-center">The cart it's empty<h2>`
        cartItemsContainer.classList.add('p-5');
        item.innerHTML = itemContent;
        cartItemsContainer.appendChild(item)
    } else {


        cartProducts.forEach(product => {
            const productPopulate = product.productId
            totalCompra += productPopulate.price * product.quantity
            let item = document.createElement("div");
            let itemContent = `
            <div class="card-body p-4">
                <div class="row d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                        <img src="${productPopulate.thumbnails[0]}" class="img-fluid rounded-3" alt="${productPopulate.title}">
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                        <p class="lead fw-normal mb-2">${productPopulate.title}</p>
                        <p><span class="text-muted">Quantity:${product.quantity} </span>  <span class="text-muted">Price:${productPopulate.price} </span></p>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 class="mb-0">U$S: ${productPopulate.price * product.quantity}</h5>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a id="btnBorrar${productPopulate._id}" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                    </div>
                </div>
            </div>            
            `;
            item.innerHTML = itemContent;
            cartItemsContainer.appendChild(item)

            document.getElementById(`btnBorrar${productPopulate._id}`).addEventListener("click", async () => {
                const deleteProductFromCartResponse = await fetch(`${url}/api/carts/product/${productPopulate._id}`, {
                    method: 'DELETE',
                })
                const jsonParseDeleteResponse = await deleteProductFromCartResponse.json()
                if (!deleteProductFromCartResponse.ok) {
                    return Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${jsonParseDeleteResponse.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${jsonParseDeleteResponse.message}`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    getCart()
                })


            })


        });
    }
    document.getElementById('totalCompra').innerText = "Total: $" + totalCompra


}

document.getElementById('checkoutButton').addEventListener('click', async (e) => {
    e.preventDefault();
    const ticketResponse = await fetch(`${url}/api/carts/purchase`, {
        method: 'POST',
    });
    const checkoutEventResponseJson = await ticketResponse.json()
  
    if (!ticketResponse.ok){
        return Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `${checkoutEventResponseJson}`,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const ticket = checkoutEventResponseJson.ticket
    const emailResponse = await fetch(`${url}/api/carts/purchase`, {
        method: 'POST',
        body: JSON.stringify(ticket)
    });
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${checkoutEventResponseJson.message}`,
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        window.location.href = `${url}/handlebars/products`;
    })
})


getCart()









