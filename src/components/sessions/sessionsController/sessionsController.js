/* ************************************************************************** */
/* /src/components/sessions/sessionsController.js - controlador de sessions. */
/* ************************************************************************** */

const sessionsServices = require('../sessionsServices/sessionsServices');

/* Definir la clase 'SessionController' */
class SessionsController {
  /* renderizar session User  */
  getUserSession = async (req, res) => {
    const userData = await sessionsServices.getUserSession(req, res);
    return res.render('profile', userData);
  };

  /* renderizar session Admin */
  getAdminSession = async (req, res) => {
    const userData = await sessionsServices.getAdminSession(req, res);
    return res.render('dashboard', userData);
  };

  getSession = async (req, res) => {
    return await sessionsServices.getSession(req, res);
  };
  /* Eliminar datos de session  */
  deleteSession = async (req, res) => {
    return await sessionsServices.deleteSession(req, res);
  };
}

/* Exportar una instancia de la clase 'SessionController' */
module.exports = new SessionsController();
