/* ************************************************************************** */
/* /src/components/carts/cartsController/cartsController.js - controlador de los carritos. */
/* ************************************************************************** */

/* Importar el servicio de carritos */
const cartsServices = require('../cartsServices/cartsServices');

/* Definir la clase 'CartsController' */
class CartsController {
  /* Obtener todos los carritos */
  getCarts = async (req, res) => {
    /* Llamar al método getAllProducts de ProductsServices */
    return await cartsServices.getCarts(res);
  };
  /* Agregar un carrito */
  addCart = async (req, res) => {
    return await cartsServices.addCart(res);
  };

  /* Obtener los productos de un carrito por su ID */
  getCartProductById = async (req, res) => {
    const { cid } = req.params;
    return await cartsServices.getCartProductById(cid, res);
  };

  /* Agregar un producto a un carrito */
  addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    return await cartsServices.addProductToCart(cid, pid, quantity, res);
  };

  /* Eliminar un carrito */
  deleteCart = async (req, res) => {
    const { cid } = req.params;
    return await cartsServices.deleteCart(cid, res);
  };
  ///////////////////////////////////////////////////////////////////////////
  /* Nuevos métodos */
  /* Eliminar un producto del carrito */
  deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    return await cartsServices.deleteProductFromCart(cid, pid, res);
  };

  /* Actualizar el carrito con un arreglo de productos */
  updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    await cartsServices.updateCart(cid, products, res);
  };

  /* Actualizar la cantidad de ejemplares de un producto en el carrito */
  updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    await cartsServices.updateProductQuantity(cid, pid, quantity, res);
  };

  /* Eliminar todos los productos del carrito */
  deleteAllProductsFromCart = async (req, res) => {
    const { cid } = req.params;
    await cartsServices.deleteAllProductsFromCart(cid, res);
  };
}

/* Exportar una instancia de la clase 'CartsController' */
module.exports = new CartsController();
