/* ************************************************************************** */
/* /src/components/auth/index.js - Contiene las rutas y controladores de 
authController.js. */
/* ************************************************************************** */

const { Router } = require('express');

const authController = require('./authController/authController');

module.exports = (app) => {
  /*  Crear una nueva instancia del enrutador de Express */
  const router = new Router();

  /* Registrar el enrutador en la aplicación principal */
  app.use('/api/sessions/useradmin', router);

  /* Definir las rutas y asgnar los controladores correspondientes */
  /* ////////////////////////////////////////////////////////// */
  /* Registrar un usuario comentado por Passport */
  /*   router.post('/register', usersController.addUser); */
  /* ////////////////////////////////////////////////////////// */
  /* Obtener todos los usuarios */
  router.get('/', usersController.getUsers);
  /* Editar un usuario */
  router.post('/recovery', usersController.recoveryUser);
  /* Obtener un usuario por ID */
  router.get('/:uid', usersController.getUserById);
  /* Modificar un usuario desde ID */
  router.put('/:uid', usersController.updateUser);
  /* Eliminar un usuario */
  router.delete('/:uid', usersController.deleteUser);
  /* ////////////////////////////////////////////////////////// */
  /* Passport Register //////////////////////////////////////// */
  /* ////////////////////////////////////////////////////////// */
  router.post('/register', usersController.registerUser, usersController.registerUserSuccess);
  router.get('/failregister', usersController.failUserRegister);
};
