// Asegurarnos que el DOM(Document Object Model: interfaz de programación que trata el documento HTML 
// o XML de una página web como un árbol de objetos o nodos) esté listo
document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENTOS */
  const btnResaltar = document.getElementById("btnResaltar");
  const precioEl = document.getElementById("precio");

  const btnDescripcion = document.getElementById("btnDescripcion");
  const descripcionWrapper = document.getElementById("descripcion-wrapper");

  const btnCarrito = document.getElementById("btnCarrito");
  const carrito = document.getElementById("carrito");
  const productoCarrito = document.getElementById("productoCarrito");
  const btnPagar = document.getElementById("btnPagar");
  const btnVaciar = document.getElementById("btnVaciar");

  /* ESTADO */
  let productoAgregado = false;

  /* FUNCIONALIDAD: Resaltar precio (toggle) = (se refiere a la acción de alternar o cambiar el estado de algo entre dos
   opciones, como encendido/apagado, visible/oculto, o con una clase CSS aplicada/sin aplicar.) */
  btnResaltar.addEventListener("click", () => {
    precioEl.classList.toggle("resaltado");
  });

  /* FUNCIONALIDAD: Mostrar / Ocultar descripción con UN SOLO BOTÓN */
  // Estado inicial: descripcion visible -> botón dice "Ocultar Descripción"
  // Para poder animar "slide", usamos la clase .collapsed en wrapper que controla max-height
  btnDescripcion.addEventListener("click", () => {
    const isCollapsed = descripcionWrapper.classList.contains("collapsed");

    if (isCollapsed) {
      // colapsada -> mostrar
      descripcionWrapper.classList.remove("collapsed");
      btnDescripcion.textContent = "Ocultar Descripción";
      btnDescripcion.classList.remove("btn-primary");
      btnDescripcion.classList.add("btn-success");
    } else {
      //  visible -> ocultar
      descripcionWrapper.classList.add("collapsed");
      btnDescripcion.textContent = "Mostrar Descripción";
      btnDescripcion.classList.remove("btn-success");
      btnDescripcion.classList.add("btn-primary");
    }
  });

  /* Agregar al carrito */
  btnCarrito.addEventListener("click", () => {
    // Muestra la sección del carrito
    carrito.style.display = "block";

    if (!productoAgregado) {
      // Insertar bloque con detalles y botón para quitar solo este producto
      //El código if (!productoAgregado) verifica si la variable booleana productoAgregado es falsa 
      // es decir si el producto aún no está en el carrito y solo en ese caso utiliza productoCarrito.innerHTML = ... 
      // para inyectar o reemplazar todo el contenido HTML dentro del elemento productoCarrito mostrando los detalles del 
      // producto como su nombre y precio junto con el botón "Quitar este producto" logrando así agregar la información del 
      // producto a la interfaz del carrito solo la primera vez que se añade
      productoCarrito.innerHTML = `
        <p><strong>Producto:</strong> Audífonos Bluetooth</p>
        <p><strong>Precio:</strong> <span id="precioCarrito">$499 MXN</span></p>
        <div class="mt-2">
          <button id="btnQuitarProducto" class="btn btn-sm btn-outline-danger">Quitar este producto</button>
        </div>
      `;

      // preparar listener para quitar producto individual
      //(Listener) = escuchador o agente de escucha),  objeto que está diseñado para esperar
      //  a que ocurra un evento específico y, cuando sucede, ejecutar una acción en respuesta.
      const btnQuitarProducto = document.getElementById("btnQuitarProducto");
      btnQuitarProducto.addEventListener("click", () => {
        productoCarrito.innerHTML = "";
        productoAgregado = false;
        alert("Producto eliminado del carrito 🗑️");
      });

      productoAgregado = true;
    } else {
      //Si el producto se agrega al carrito por primera vez (la condición if se cumplió antes), el código establece
      //  productoAgregado = true para recordar su estado. Si se intenta agregar de nuevo, el bloque else se activa y
      //  simplemente muestra una alerta al usuario indicando que "El producto ya está en el carrito",
      //  evitando así duplicados y sugiriendo que en un futuro se incremente la cantidad.
      alert("El producto ya está en el carrito.");
    }
  });

  /* Botón Pagar */
  btnPagar.addEventListener("click", () => {
    if (!productoAgregado) {
      alert("No hay productos en el carrito.");
      return;
    }

    // Simulación simple de pago
    alert("Gracias por tu compra 🤑\nProcesando pago... (simulado)");
    // Limpiar carrito
    productoCarrito.innerHTML = "";
    carrito.style.display = "none";
    productoAgregado = false;
  });

  /* Botón quitar todo */
  btnVaciar.addEventListener("click", () => {
    if (!productoAgregado) {
      alert("No hay productos que quitar.");
      return;
    }
    productoCarrito.innerHTML = "";
    productoAgregado = false;
    alert("Carrito vaciado.");
  });

});
