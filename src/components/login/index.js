/* ************************************************************************** */
/* /src/components/login/index.js - Contiene las rutas y controladores de  
loginController.js. */
/* ************************************************************************** */

/* Importar el módulo de enrutador de Express */
const { Router } = require('express');

/* Importar el controlador de login */
const loginController = require('./loginController/loginController');
module.exports = (app) => {
  /* Crear una nueva instancia del enrutador de Express */
  const router = new Router();

  /* Registrar el enrutador en la aplicación principal */
  app.use('/api/sessions', router);
  /* ////////////////////////////////////////////////////////// */
  /* Comentado por refactoring a src/components/auth ////////// */
  /* ////////////////////////////////////////////////////////// */

  /* Definir las rutas y asignar los controladores correspondientes */
  /* ////////////////////////////////////////////////////////// */
  /* Login usuario comentado por Passport */
  /*   router.post('/login', loginController.login); */
  /* ////////////////////////////////////////////////////////// */
  /* ////////////////////////////////////////////////////////// */
  /* Logout usuario comentado por Passport */
  router.get('/logout', loginController.logout);
  /* Passport Login ////////////////////////////////////////////////// */
  /* ////////////////////////////////////////////////////////// */
  /*   router.post('/login', loginController.loginPassport); */
  /* ////////////////////////////////////////////////////////// */
  /* Passport GitHub ////////////////////////////////////////// */
  /* ////////////////////////////////////////////////////////// */
  /*   router.get('/github', loginController.githubLoginPassport); */
  /* Callback */
  /*   router.get('/githubcallback', loginController.githubCallback, loginController.githubCallbackRedirect); */
};
