/* ************************************************************************** */
/* /src/components/roles/index.js - Contiene las rutas y controladores de  
rolesController.js. */
/* ************************************************************************** */

/* Importar el módulo de enrutador de Express */
const { Router } = require('express');

/* Importar el controlador de roles */
const rolesController = require('./rolesController/rolesController');

/* Importar el middleware de autenticación para Public o Private */
const { authPrivate, authPublic } = require('../../utils/auth/auth');

module.exports = (app) => {
  /* Crear una nueva instancia del enrutador de Express */
  const router = new Router();

  /* Registrar el enrutador en la aplicación principal */
  app.use('/api/sessions', router);

  /* Definir las rutas y asignar los controladores correspondientes */
  /* Test de middleware ath para usuarios administradores */
  router.get('/admintest', authPrivate, rolesController.getAdmin);
  /* Test de middleware ath para usuarios no administradores */
  router.get('/usertest', authPublic, rolesController.getUser);
};
