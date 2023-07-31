/* ************************************************************************** */
/* /src/components/roles/rolesController.js - controlador de roles. */
/* ************************************************************************** */

/* Importar el servicio de roles */
const rolesServices = require('../rolesServices/rolesServices');

/* Definir la clase 'RolesController' */
class RolesController {
  /* Test de middleware ath Admin */
  getAdmin = async (req, res) => {
    return await rolesServices.getAdmin(req, res);
  };
  /* Test de middleware ath User */
  getUser = async (req, res) => {
    return await rolesServices.getUser(req, res);
  };
}

/* Exportar una instancia de la clase 'RolesController' */
module.exports = new RolesController();
