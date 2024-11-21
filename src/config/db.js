
import 'dotenv/config'
import { createPool } from 'mysql2/promise';

const configuracion = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true
  };
  
  const db = createPool(configuracion);

  export default db;


  /*
  import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

// Configuración de la conexión
const configuracion = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

// Crear la conexión única
const db = createConnection(configuracion);

// Exportar la conexión
export default db;
  */