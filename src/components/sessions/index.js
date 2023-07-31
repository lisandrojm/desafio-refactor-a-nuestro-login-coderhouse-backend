/* ************************************************************************** */
/* /src/components/sessions/index.js - Contiene las rutas y controladores de  
sessionsController.js. */
/* ************************************************************************** */

/* Importar el módulo de enrutador de Express */
const { Router } = require('express');

/* Importar el controlador de carrito */
const sessionsController = require('./sessionsController/sessionsController');

/* Importar el middleware de autenticación para Public o Private */
const { authPrivate, authPublic } = require('../../utils/auth/auth');

module.exports = (app) => {
  /* Crear una nueva instancia del enrutador de Express */
  const router = new Router();

  /* Registrar el enrutador en la aplicación principal */
  app.use('/api/sessions', router);

  /* Definir las rutas y asignar los controladores correspondientes */

  /* Levantar session de admin */
  router.get('/admin', authPrivate, sessionsController.getAdminSession);
  /* Levantar session de usuer */
  router.get('/user', authPublic, sessionsController.getUserSession);
  /* Levantar session*/
  router.get('/session', sessionsController.getSession);
  /* Eliminar datos de session */
  router.get('/deletesession', sessionsController.deleteSession);
};
