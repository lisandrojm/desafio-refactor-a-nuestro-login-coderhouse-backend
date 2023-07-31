/* ************************************************************************** */
/* /src/components/handlebars/handlebarsServices/handlebarsServices.js -
Servicios de handlebars */
/* ************************************************************************** */

/* Importar la conexión a la base de datos */
const { connection } = require('../../../config/mongo');
/* Importar el servicio de products */
const ProductsServices = require('../../products/productsServices/productsServices');
const { Cart } = require('../../../models/carts');
const { User } = require('../../../models/users');
const Handlebars = require('handlebars');

// Define the custom helper
Handlebars.registerHelper('ifNotNull', function (value, options) {
  if (value !== null && value !== undefined) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Your other code here, including template rendering

/* Definir la clase HandlebarsServices */
class HandlebarsServices {
  getCollectionData = async (collectionName, res) => {
    try {
      /* Obtener la conexión a la base de datos */
      const database = connection;
      const collection = database.collection(collectionName);
      /* Obtener los datos de la colección */
      const data = await collection.find().toArray();
      return data;
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getProductServices' });
    }
  };

  /* Función para obtener la página de inicio */
  getHome = async (res) => {
    try {
      /* Obtener los productos de la colección 'products' */
      const products = await this.getCollectionData('products');
      return { success: true, title: 'Productos en Tiempo Real', products, style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getHome' });
    }
  };

  /* Función para obtener los productos en tiempo real */
  getRealTimeProducts = async (res) => {
    try {
      /* Obtener los products de la colección 'productos' */
      const products = await this.getCollectionData('products');
      return { success: true, title: 'Productos en Tiempo Real', products, style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars' });
    }
  };

  getChat = async (res) => {
    try {
      return { success: true, title: 'Chat', style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getChat' });
    }
  };

  /* Obtener los productos y sessionUser para poder acceder a los datos de la session del usuario */
  /* /src/views/carts.handlebars */
  getProducts = async (limit, page, sort, query, res, sessionUser) => {
    try {
      const products = await ProductsServices.getProducts(limit, page, sort, query, res);

      // Obtener el carrito del usuario actual
      const user = await User.findById(sessionUser._id).populate('cart');

      // Obtener la cantidad total de productos en el carrito
      let totalCartProducts = 0;
      if (user && user.cart && user.cart.products) {
        totalCartProducts = user.cart.products.reduce((total, item) => total + item.quantity, 0);
      }

      const context = {
        success: true,
        title: 'Productos',
        products: products.products,
        style: 'index.css',
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        totalPages: products.totalPages,
        currentPage: products.currentPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink,
        sessionUser: sessionUser,
        totalCartProducts: totalCartProducts, // Agregar la cantidad total de productos al contexto
      };

      return context;
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getProducts' });
    }
  };

  /* Obtener el carrito por su ID y sessionUser para poder acceder a los datos de la session del usuario */
  /* /src/views/carts.handlebars */
  getCartProductById = async (cid, res, sessionUser) => {
    try {
      /* Obtener el carrito por su ID y hacer populate en 'products.productId' */
      const cart = await Cart.findById(cid).populate('products.productId', '-__v');

      /* Formatear el carrito para incluir solo las propiedades necesarias */
      const formattedCart = {
        _id: cart._id,
        products: cart.products.map((item) => ({
          productId: {
            _id: item.productId._id,
            title: item.productId.title,
            description: item.productId.description,
            code: item.productId.code,
            price: item.productId.price,
            stock: item.productId.stock,
            category: item.productId.category,
          },
          quantity: item.quantity,
        })),
      };

      const context = {
        success: true,
        title: 'Carts',
        carts: [formattedCart], // Pasar el carrito formateado como un arreglo para mantener la estructura del contexto
        cartId: cid, //Pasar el ID del carrito al contexto
        style: 'index.css',
        sessionUser: sessionUser,
      };

      return context;
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getCartProductById' });
    }
  };

  getLogin = async (res) => {
    try {
      return { success: true, title: 'Login', style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getLogin' });
    }
  };

  getRegister = async (res) => {
    try {
      return { success: true, title: 'Register', style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getRegister' });
    }
  };

  getRecovery = async (res) => {
    try {
      return { success: true, title: 'Recovery', style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getRecovery' });
    }
  };
}

/* Exportar una instancia de la clase HandlebarsServices */
module.exports = new HandlebarsServices();
