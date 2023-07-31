/* ************************************************************************** */
/* /src/components/login/loginController.js - controlador de login. */
/* ************************************************************************** */

const loginServices = require('../loginServices/loginServices');
class LoginController {
  /*   Comentado por refactoring  Passport src/components/auth */
  /*   login = async (req, res) => {
    const { email, password } = req.body;
    return await loginServices.login(email, password, req, res);
  }; */

  logout = async (req, res) => {
    const logoutResult = await loginServices.logout(req, res);
    if (logoutResult.success) {
      return res.redirect('/');
    } else {
      return res.status(401).json(logoutResult);
    }
  };
}

module.exports = new LoginController();
