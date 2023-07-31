/* ************************************************************************** */
/* /src/components/handlebars/index.js - Contiene las rutas y controladores de los
 de handlebarsController.js. */
/* ************************************************************************** */

/* Importar el módulo de enrutador de Express */
const { Router } = require('express');

/* Importar el controlador de handlebars */
const handlebarsController = require('./handlebarsController/handlebarsController');

/* Importar el middleware de autenticación  para Public o Private */
const { authPrivate, authPublic } = require('../../utils/auth/auth');

module.exports = (app) => {
  /*  Crear una nueva instancia del enrutador de Express */
  const router = new Router();

  /*  Registrar el enrutador en la aplicación principal */
  app.use('/', router);

  /* Definir las rutas y asignar los controladores correspondientes */
  router.get('/products', authPublic, handlebarsController.getProducts);
  router.get('/carts/:cid', authPublic, handlebarsController.getCartProductById);
  router.get('/home', handlebarsController.getHome);
  router.get('/realtimeproducts', handlebarsController.getRealTimeProducts);
  router.get('/chat', handlebarsController.getChat);
  router.get('/', handlebarsController.getLogin);
  router.get('/register', handlebarsController.getRegister);
  router.get('/recovery', handlebarsController.getRecovery);
};
