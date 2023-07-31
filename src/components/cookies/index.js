/* ************************************************************************** */
/* /src/components/cookies/index.js - Contiene las rutas y controladores de  
cookiesController.js. */
/* ************************************************************************** */

/* Importar el módulo de enrutador de Express */
const { Router } = require('express');

/* Importar el controlador de carrito */
const cookiesController = require('./cookiesController/cookiesController');

module.exports = (app) => {
  /* Crear una nueva instancia del enrutador de Express */
  const router = new Router();
  /* Importar el middleware de autenticación */

  /* Registrar el enrutador en la aplicación principal */
  app.use('/api/sessions', router);

  /* Definir las rutas y asignar los controladores correspondientes */
  /* Setear SignedCookies  */
  router.get('/setsignedcookies', cookiesController.setSignedCookies);
  /* Obtener SignedCookies */
  router.get('/getsignedcookies', cookiesController.getSignedCookies);
  /* Eliminar SignedCookies */
  router.get('/deletesignedcookies', cookiesController.deleteSignedCookies);
};
