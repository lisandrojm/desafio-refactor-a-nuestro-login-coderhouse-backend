/* ************************************************************************** */
/* /src/config/index.js - configuración de variables de entorno */
/* ************************************************************************** */

/* Importar y configurar dotenv para cargar las variables de entorno desde el archivo .env */
require('dotenv').config();

/* Crear un objeto de configuración con la propiedad 'port' que obtiene su valor de la variable de entorno PORT */
let config = {
  port: process.env.PORT,
  cookie_key: process.env.COOKIE_KEY,
  secret_key: process.env.SECRET_KEY,
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_secret_key: process.env.GITHUB_SECRET_KEY,
  github_callback_url: process.env.GITHUB_CALLBACK_URL,
};

/* Crear un objeto de base de datos con las propiedades 'mongo_local' y 'mongo_atlas' que obtienen sus valores de las variables de entorno MONGO_LOCAL y MONGO_ATLAS, respectivamente */
let db = {
  mongo_local: process.env.MONGO_LOCAL,
  mongo_atlas: process.env.MONGO_ATLAS,
  dbName: process.env.DB_NAME,
};

/* Exportar los objetos 'config' y 'db' para que puedan ser utilizados en otros archivos */
module.exports = {
  config,
  db,
};
