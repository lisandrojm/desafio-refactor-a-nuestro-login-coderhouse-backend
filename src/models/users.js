/* ************************************************************************** */
/* /src/models/users.js - Mongoose-definición de un esquema de producto y 
creación de un modelo correspondiente*/
/* ************************************************************************** */

/* Importar las clases Schema y model del módulo 'mongoose'. */
const { Schema, model } = require('mongoose');
/* Importar el módulo de mongoosePaginate. */
const mongoosePaginate = require('mongoose-paginate-v2');

/* Definir el esquema de usuario */
const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Date, default: null },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    },
  },
  { collection: 'users' }
);

/* Aplicar el plugin de mongoosePaginate al esquema */
userSchema.plugin(mongoosePaginate);

/* Crear el modelo de usuario */
const User = model('User', userSchema);

/* Exportar el modelo y el nombre de la colección */
module.exports = {
  User,
};
