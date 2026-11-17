/*
1. SELECCION DE ELEMENTOS DEL DOM
*/

//Herramientas para el menu lateral izquierdo
const btnAbrirMenu = document.getElementById("btn-abrir-menu");
const btnCerrarMenu = document.getElementById("btn-cerrar-menu");
const menuIzquierdo = document.getElementById("menu-izquierdo");

//Herramientas para el carrito de la derecha
const iconoCarritoHeader = document.getElementById("icono-carrito-header");
const contenedorCarritoPanel = document.querySelector(".cart");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");

//Herramientas para el catalogo y los productos
const listadoBotonesCompra = document.querySelectorAll(".products__btn:not(.products__btn--disable)");
const contenedorCarritoHtml = document.getElementById("cart-items-container");
const contadorBadgeHtml = document.getElementById("cart-badge");

//La alcancia: arreglo vacio donde JS ira guardando las compras
let listaCarrito = [];

/*
2. EVENTOS DEL DOM (Apertura y Cierre)
*/

//Control del menu izquierdo
btnAbrirMenu.addEventListener("click", () => {
    menuIzquierdo.classList.add("active");
});

btnCerrarMenu.addEventListener("click", () => {
    menuIzquierdo.classList.remove("active");
});

//Control del carrito de la derecha
iconoCarritoHeader.addEventListener("click", () => {
    contenedorCarritoPanel.classList.add("active");
});

btnCerrarCarrito.addEventListener("click", () => {
    contenedorCarritoPanel.classList.remove("active");
});

/*
3. MOTOR DE COMPRAS (Capturar productos y actualizar estado)
*/

listadoBotonesCompra.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
        const tarjetaProducto = evento.target.closest(".products__item");

        const productoSeleccionado = {
            id: Date.now(),
            imagen: tarjetaProducto.querySelector(".products__img").src,
            titulo: tarjetaProducto.querySelector(".products__title").textContent,
            precio: tarjetaProducto.querySelector(".products__price").textContent
        };

        listaCarrito.push(productoSeleccionado);
        actualizarVistaCarrito();

        console.log("Carrito actualizado:", listaCarrito);
    });
});

/* 
4. DIBUJAR EL CARRITO Y ELIMINAR PRODUCTOS (Renderizado Dinamico)
*/

function actualizarVistaCarrito() {
    contenedorCarritoHtml.innerHTML = "";

    listaCarrito.forEach((producto) => {
        const filaProducto = document.createElement("div");
        filaProducto.classList.add("cart__div");

        filaProducto.innerHTML = `
            <img src="${producto.imagen}" class="cart__img">
            <p class="cart__price">${producto.precio}</p>
            <p class="cart__products">${producto.titulo}</p>
            <button class="delete__icon" data-id="${producto.id}" 
            style="background: none; border: none; color: #ff4a4a; font-size: 10px; font-weight: bold; cursor: pointer;">✕</button>
        `;

        
        contenedorCarritoHtml.appendChild(filaProducto);
    });

    contadorBadgeHtml.textContent = listaCarrito.length;

    if (listaCarrito.length === 0) {
        iconoCarritoHeader.style.opacity = "0.5";
    } else {
        iconoCarritoHeader.style.opacity = "1";    
    }
}

contenedorCarritoHtml.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("delete__icon")) {
        const idAEliminar = Number(evento.target.getAttribute("data-id"));
        
        listaCarrito = listaCarrito.filter((producto) => producto.id !== idAEliminar);
        actualizarVistaCarrito();
    }
});