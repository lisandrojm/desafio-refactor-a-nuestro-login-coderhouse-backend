/* ************************************************************************** */
/* /src/utils/auth/auth.js - Configuración de auth.js  (middleware de autenticación)
/* ************************************************************************** */
const authPrivate = (req, res, next) => {
  try {
    /* Chequear si el usuario está logueado con admin role */
    if (req.session?.user?.role === 'admin') {
      return next();
    } else {
      /* Redireccionar a la vista de perfil del usuario si no está loguedo con admin role */
      res.redirect('/api/sessions/user');
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error de autorización', message: error.message });
  }
};

const authPublic = (req, res, next) => {
  try {
    /* Chequear si el usuario está logueado con user role */
    if (req.session?.user?.role === 'user') {
      return next();
    } else {
      /* Redireccionar a vista de login si no está loguedo con user role */
      res.redirect('/');
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error de autorización', message: error.message });
  }
};

module.exports = { authPrivate, authPublic };
