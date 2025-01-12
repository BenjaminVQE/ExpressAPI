import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true, // Pour une connexion sécurisée
        trustServerCertificate: true,
      },
    },
    port: process.env.DB_PORT,
  }
);

export default sequelize;
