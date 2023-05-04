import sql from "mssql";
import config from "../config";

// Definir el objecto con las variables de conexión:
const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Conexión a la base de datos SQL.
// Se le pasa un objeto con las variables de conexión.
// Función async
export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);

    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql };

// Si hicieramos una consulta ej. "SELECT", sería:
// const result = await pool.request().query("SELECT 1");
