/* ************************************************************************** */

/* /src/components/users/UsersController/UsersController.js -  servicios de los usuarios. */
/* ************************************************************************** */

/* Importar el servicio de usuarios */
const UsersServices = require('../usersServices/usersServices');
/* Importar el modulo de passport */
const passport = require('passport');
/* Definir la clase 'UsersController' */
class UsersController {
  /* Obtener todos los usuarios */
  getUsers = async (req, res) => {
    /* Llamar al método getUsers de UserServices */
    return await UsersServices.getUsers(res);
  };

  /* Agregar un nuevo usuario */
  addUser = async (req, res) => {
    /* Obtener los datos del usuario de los campos de payload */
    const payload = req.body;
    /* Llamar al método addUser de UsersServices */
    return await UsersServices.addUser(payload, res);
  };

  recoveryUser = async (req, res) => {
    const { email, password } = req.body;
    return await UsersServices.recoveryUser({ email, password, res });
  };
  /* Obtener un usuario por ID */
  getUserById = async (req, res) => {
    /* Obtener el ID del usuario de los parámetros de la solicitud */
    const { uid } = req.params;
    /* Llamar al método getUserById de UsersServices */
    return await UsersServices.getUserById(uid, res);
  };

  /* Actualizar un usuario */
  updateUser = async (req, res) => {
    /* Obtener el ID del usuario de los parámetros de la solicitud */
    const { uid } = req.params;
    /* Obtener los campos de actualización de la solicitud */
    const updateFields = req.body;
    /* Llamar al método updateUser de UsersServices */
    return await UsersServices.updateUser(uid, updateFields, res, req);
  };

  /* Eliminar un usuario */
  deleteUser = async (req, res) => {
    /* Obtener el ID del usuario de los parámetros de la solicitud */
    const { uid } = req.params;
    /* Llamar al método deleteUser de UsersServices */
    return await UsersServices.deleteUser(uid, res, req);
  };
  /* ////////////////////////////////////////////////////////// */
  /* Passport Register //////////////////////////////////////// */
  /* ////////////////////////////////////////////////////////// */
  registerUser = (req, res, next) => {
    passport.authenticate('register', { failureRedirect: '/failregister' })(req, res, next);
  };
  registerUserSuccess = (req, res) => {
    res.send({ status: 'success', message: 'User registered' });
  };
  failUserRegister = async (req, res) => {
    console.log('Failed Strategy');
    res.send({ error: 'Failed Register' });
  };
}
/* Exportar una instancia de la clase 'UsersController' */
module.exports = new UsersController();
