/* ************************************************************************** */
/* /src/components/auth/authController/authController.js - controlador de auth. */
/* ************************************************************************** */

/* Importar el servicio de auth */
const authServices = require('../cookiesServices/cookiesServices');

/* Definir la clase 'CookiesController' */
class CookiesController {
  /* Setear una SignedCookie  */
  setSignedCookies = async (req, res) => {
    return await authServices.setSignedCookies(req, res);
  };

  /* Obtener las SignedCookies */
  getSignedCookies = async (req, res) => {
    return await authServices.getSignedCookies(req, res);
  };

  /* Eliminar una SignedCookies */
  deleteSignedCookies = async (req, res) => {
    return await authServices.deleteSignedCookies(req, res);
  };
}

/* Exportar una instancia de la clase 'AuthController' */
module.exports = new CookiesController();
