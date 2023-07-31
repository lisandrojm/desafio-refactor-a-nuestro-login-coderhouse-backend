/* ************************************************************************** */
/* /src/routes/index.js - Contiene las definiciones de rutas para los productos y
carritos de compra.
/* ************************************************************************** */

/* Importar el módulo 'productsApi' desde el directorio '../components/products' */
const productsApi = require('../components/products');

/* Importar el módulo 'cartsApi' desde el directorio '../components/carts' */
const cartsApi = require('../components/carts');

/* Importar el módulo 'handlebarsApi' desde el directorio '../components/handlebars' */
const handlebarsApi = require('../components/handlebars');

/* Importar el módulo 'messagesApi' desde el directorio '../components/messages' */
const messagesApi = require('../components/messages');

/* Importar el módulo 'cookiesApi' desde el directorio '../components/cookies' */
const cookiesApi = require('../components/cookies');

/* Importar el módulo 'sessionsApi' desde el directorio '../components/sessions' */
const sessionsApi = require('../components/sessions');

/* Importar el módulo 'usersApi' desde el directorio '../components/users' */
const usersApi = require('../components/users');

/* Importar el módulo 'loginApi' desde el directorio '../components/users' */
const loginApi = require('../components/login');

/* Importar el módulo 'rolesApi' desde el directorio '../components/users' */
const rolesApi = require('../components/roles');

/* Importar el módulo 'rolesApi' desde el directorio '../components/users' */
const authApi = require('../components/auth');

/* Exportar una función que recibe una instancia de la aplicación 'app' */
module.exports = (app) => {
  /* Llamar a la función 'productsApi' pasando la instancia de la aplicación 'app' */
  productsApi(app);

  /* Llamar a la función 'cartsApi' pasando la instancia de la aplicación 'app' */
  cartsApi(app);

  /* Llamar a la función 'handlebarsApi' pasando la instancia de la aplicación 'app' */
  handlebarsApi(app);

  /* Llamar a la función 'chatApi' pasando la instancia de la aplicación 'app' */
  messagesApi(app);

  /* Llamar a la función 'cookiesApi' pasando la instancia de la aplicación 'app' */
  cookiesApi(app);

  /* Llamar a la función 'sessionsApi' pasando la instancia de la aplicación 'app' */
  sessionsApi(app);

  /* Llamar a la función 'usersApi' pasando la instancia de la aplicación 'app' */
  usersApi(app);

  /* Llamar a la función 'loginApi' pasando la instancia de la aplicación 'app' */
  loginApi(app);

  /* Llamar a la función 'rolesApi' pasando la instancia de la aplicación 'app' */
  rolesApi(app);

  /* Llamar a la función 'authApi' pasando la instancia de la aplicación 'app' */
  authApi(app);
};
