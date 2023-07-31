/* ************************************************************************** */
/* /src/public/js/products/index.js - .js de /src/views/products.handlebars */
/* ************************************************************************** */

let cartId;

document.addEventListener('DOMContentLoaded', function () {
  // Get del elemento cartID
  const cartIdElement = document.getElementById('cartId');

  // Get del valor de cartId desde el elemento
  cartId = cartIdElement.innerText;

  console.log('Cart ID:', cartId);
});

async function addToCart(productId) {
  try {
    // Realiza una solicitud POST al endpoint correspondiente para agregar el producto al carrito
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      // Si la respuesta es exitosa, muestra un mensaje de éxito al usuario con el ID del carrito
      swal('Producto agregado al carrito', `Product ID: ${productId}\nCart ID: ${cartId}`, 'success');

      // Actualizar el valor de {{totalCartProducts}} en el elemento HTML
      const totalProductosElement = document.getElementById('totalProductosCarrito');
      let totalProductos = parseInt(totalProductosElement.textContent); // Obtener el valor actual y convertirlo a entero

      // Incrementar el valor en 1, ya que se ha agregado un producto al carrito
      totalProductos++;

      // Actualizar el contenido del elemento con el nuevo valor
      totalProductosElement.textContent = totalProductos;
    } else {
      // Si la respuesta no es exitosa, muestra un mensaje de error al usuario
      swal('Error al agregar el producto al carrito', '', 'error');
    }
  } catch (error) {
    // Si ocurre un error, muestra un mensaje de error al usuario
    swal('Error al agregar el producto al carrito', '', 'error');
  }
}
