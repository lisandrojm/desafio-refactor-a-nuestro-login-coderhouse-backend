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
  app.use('/api/sessions/auth', router);

  /* Definir las rutas y asgnar los controladores correspondientes */
  /* ////////////////////////////////////////////////////////// */
  /* Passport //////////////////////////////////////// */
  /* ////////////////////////////////////////////////////////// */
  router.post('/register', authController.registerUser, authController.registerUserSuccess);
  router.get('/failregister', authController.failUserRegister);
  router.post('/login', authController.loginPassport);
  router.get('/logout', authController.logout);
  router.get('/github', authController.githubLoginPassport);
  router.get('/githubcallback', authController.githubCallback, authController.githubCallbackRedirect);
};
