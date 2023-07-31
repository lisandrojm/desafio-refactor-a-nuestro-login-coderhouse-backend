/* ************************************************************************** */
/* /src/components/users/usersServices/usersServices.js -
 controlador de los usuarios. */
/* ************************************************************************** */

/* Importar el modelo de usuario */
const { User } = require('../../../models/users');
/* Importar el modelo de carrito */
const { Cart } = require('../../../models/carts');
/* Importar createHash del algoritmo de hashing de contraseñas bcrypt */
const { createHash } = require('../../../utils/bcrypt/bcrypt');

/* Definir la clase 'UserServices' */
class UsersServices {
  /* Obtener todos los usuarios */
  getUsers = async (res) => {
    try {
      /* Obtener todos los mensajes de la base de datos */
      const users = await User.find();
      const data = users;
      /* Enviar una respuesta exitosa con los mensajes obtenidos */
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      /* Enviar una respuesta de error en caso de producirse un error al obtener los mensajes */
      return res.status(500).json({ success: false, error: 'Error al obtener los usuarios' });
    }
  };

  /* Agregar un usuario y  Crear un carrito vinculado al ID del usuario  */
  addUser = async (payload, res) => {
    try {
      const { first_name, last_name, email, age, password } = payload;

      if (!first_name || !last_name || !email || !age || !password) {
        return res.status(500).json({ success: false, error: 'Faltan campos obligatorios' });
      }

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ success: false, error: 'Ya existe un usuario con el mismo correo electrónico' });
      }

      const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        /* Implementación de creación de hash del password del algoritmo de hashing de cotraseñas bcrypt */
        password: createHash(password),
      });

      await newUser.save();

      /* Crear un carrito vinculado al ID del usuario */
      const userCart = new Cart({
        user: newUser._id,
        products: [],
      });
      await userCart.save();

      /* Asignar el ID del carrito recién creado al usuario */
      newUser.cart = userCart._id;
      await newUser.save();

      const data = newUser;
      return res.status(201).json({ success: true, message: 'Usuario agregado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al agregar el usuario' });
    }
  };

  /* Recuperar contraseña  */
  recoveryUser = async ({ email, password, res }) => {
    try {
      let user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(401).json({ success: false, error: 'No existe en la DB!' });
      }

      let updatedPassword = await User.findByIdAndUpdate(user._id, { password: createHash(password) }, { new: true });

      return res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente', payload: updatedPassword });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al recuperar la contraseña' });
    }
  };

  getUserById = async (uid, res) => {
    try {
      const user = await User.findById(uid);

      if (!user) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      const data = user;
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al obtener el usuario' });
    }
  };

  updateUser = async (uid, updateFields, res, req) => {
    try {
      const allowedFields = ['first_name', 'last_name', 'email', 'age', 'password'];

      const invalidFields = Object.keys(updateFields).filter((field) => !allowedFields.includes(field));

      if (invalidFields.length > 0) {
        return res.status(400).json({ success: false, error: `Los siguientes campos no se pueden modificar: ${invalidFields.join(', ')}` });
      }

      const updatedUser = await User.findByIdAndUpdate(uid, updateFields, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      req.app.io.emit('updateUser', updatedUser);

      const data = updatedUser;
      return res.status(200).json({ success: true, message: 'Usuario actualizado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al actualizar el usuario' });
    }
  };

  deleteUser = async (uid, res, req) => {
    try {
      const deletedUser = await User.findByIdAndDelete(uid);

      if (!deletedUser) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      req.app.io.emit('deleteUser', uid);

      const data = deletedUser;
      return res.status(200).json({ success: true, message: 'Usuario eliminado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al eliminar el usuario' });
    }
  };
}

/* Exportar una instancia de la clase 'UserServices' */
module.exports = new UsersServices();
