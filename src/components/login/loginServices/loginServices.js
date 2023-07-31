/* ************************************************************************** */
/* /src/components/login/loginServices/loginServices.js - servicio de login. */
/* ************************************************************************** */

/* Importar el modelo de usuario */
const { User } = require('../../../models/users');
/* Importar isValidPassword del algoritmo de hashing de contraseñas bcrypt */
const { isValidPassword } = require('../../../utils/bcrypt/bcrypt');

/* Definir la clase LoginServices */
class LoginServices {
  /*   login = async (email, password, req, res) => {
    try {
      if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') { */
  /* Establecer las propiedades de la sesión para el administrador */
  /*         req.session.user = {
          email: 'adminCoder@coder.com',
          admin: true,
          role: 'admin',
        };
        req.session.admin = true; */

  /* Console.log para ver el objeto user en req.session del administrador */
  /*         console.log('Login Admin success', req.session.user);

        return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', userType: 'admin' });
      } else {
        const user = await User.findOne({ email }); */

  /* Implementación de validación de hash del password del algoritmo de hashing de cotraseñas bcrypt */
  /*         if (!user || !isValidPassword(password, user)) {
          return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
        } */

  /* Retirar el password de la session, es un dato sensible */
  /*         delete user.password; */

  /* Setear 'username' cookie con el email del usuario */
  /*         res.cookie('username', email, { maxAge: 20000, httpOnly: true, signed: true });

        req.session.user = user; */
  /* Asegurarse de que la propiedad 'admin' no esté presente en la sesión del usuario normal */
  /*         if (req.session.hasOwnProperty('admin')) {
          delete req.session.admin;
        } */

  /* Console.log para ver el objeto user en req.session del usuario normal */
  /*         console.log('Login User success', req.session.user);

        return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', userType: 'user', user });
      } */
  /*     } catch (error) {
      return res.status(500).json({ success: false, error: 'Error durante el inicio de sesión' });
    }
  }; */
  logout = async (req, res) => {
    try {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            const response = { success: false, error: err };
            req.logoutResult = response;
            reject(response);
          } else {
            const response = { success: true, message: 'Logout exitoso' };
            req.logoutResult = response;
            resolve(response);
          }
          console.log('Logout success');
        });
      });

      return req.logoutResult;
    } catch (err) {
      const response = { success: false, error: 'Error durante el logout' };
      req.logoutResult = response;
      return response;
    }
  };
}

module.exports = new LoginServices();
