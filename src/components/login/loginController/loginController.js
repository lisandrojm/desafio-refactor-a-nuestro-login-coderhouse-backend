/* ************************************************************************** */
/* /src/components/login/loginController.js - controlador de login. */
/* ************************************************************************** */

const loginServices = require('../loginServices/loginServices');
const passport = require('passport');
class LoginController {
  login = async (req, res) => {
    const { email, password } = req.body;
    return await loginServices.login(email, password, req, res);
  };

  logout = async (req, res) => {
    const logoutResult = await loginServices.logout(req, res);
    if (logoutResult.success) {
      return res.redirect('/');
    } else {
      return res.status(401).json(logoutResult);
    }
  };
  /* ////////////////////////////////////////////////////////// */
  /* Passport Login ////////////////////////////////////////////////// */
  /* ////////////////////////////////////////////////////////// */
  loginPassport = (req, res, next) => {
    passport.authenticate('login', (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Error durante el inicio de sesión' });
      }
      if (!user) {
        return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
      }

      // Handle the redirection and response based on user type
      if (user.admin) {
        // If the user is an admin, redirect to /products and send userType as admin
        res.cookie('username', user.email, { maxAge: 20000, httpOnly: true, signed: true });
        req.session.user = user;
        req.session.admin = true;

        return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', userType: 'admin' });
      } else {
        // If the user is a regular user, redirect to /products and send userType as user
        res.cookie('username', user.email, { maxAge: 20000, httpOnly: true, signed: true });
        req.session.user = user;
        if (req.session.hasOwnProperty('admin')) {
          delete req.session.admin;
        }

        return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', userType: 'user', user });
      }
    })(req, res, next);
  };
  githubLoginPassport = (req, res, next) => {
    passport.authenticate('github', { scope: ['user_email'] })(req, res, next);
  };
  githubCallback = (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/login' })(req, res, next);
  };
  githubCallbackRedirect = (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
  };
}

module.exports = new LoginController();
