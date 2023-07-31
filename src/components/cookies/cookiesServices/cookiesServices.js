/* ************************************************************************** */
/* /src/components/cookies/cookiesServices/cookiesServices.js - servicio de auth. */
/* ************************************************************************** */

/* Definir la clase CookiesServices */
class CookiesServices {
  /* Setear una SignedCookie */
  setSignedCookies = async (req, res) => {
    try {
      /* Enviar una respuesta exitosa con un mensaje de éxito */
      await res.cookie('SignedCookie', 'Esta es una cookie muy poderosa', { maxAge: 10000, signed: true });
      return res.status(200).json({ success: true, message: 'SignedCookie firmada' });
    } catch (error) {
      /* Manejar el error y enviar una respuesta con el código de estado apropiado */
      return res.status(500).json({ success: false, error: 'Error en setSignedCokies al configurar la cookie firmada' });
    }
  };

  /* Obtener las SignedCookies */
  getSignedCookies = async (req, res, next) => {
    try {
      /* Obtener la cookie firmada del objeto req.signedCookies */
      const signedCookie = req.signedCookies.SignedCookie;

      if (signedCookie) {
        /* Enviar la cookie firmada en la respuesta */
        return res.status(200).json({ success: true, signedCookie });
      } else {
        /* Si no se encuentra la cookie firmada, enviar un mensaje indicando que no existe */
        return res.status(404).json({ success: false, error: 'No se encontró la cookie firmada' });
      }
    } catch (error) {
      /* Manejar el error y enviar una respuesta con el código de estado apropiado */
      return res.status(500).json({ success: false, error: 'Error en getSignedCookies al obtener la cookie' });
    }
  };

  /* Eliminar una SignedCookies */
  deleteSignedCookies = async (req, res) => {
    try {
      /* Eliminar la cookie firmada */
      await res.clearCookie('SignedCookie');
      return res.status(200).json({ success: true, message: 'SignedCookie eliminada' });
    } catch (error) {
      /* Manejar el error y enviar una respuesta con el código de estado apropiado */
      return res.status(500).json({ success: false, error: 'Error en deleteSignedCookies al eliminar la cookie firmada' });
    }
  };
}

/* Exportar una instancia de la clase 'AuthServices' */
module.exports = new CookiesServices();
