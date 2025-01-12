import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER, // Type de données de la colonne id
      primaryKey: true, // Définit cette colonne comme clé primaire
      autoIncrement: true, // L'ID va s'auto-incrémenter
      allowNull: false, // Empêche que l'ID soit nul
      field: "idUser", // Le nom exact de la colonne dans la base de données
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validation de l'email au format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "createdAt",
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updatedAt",
      defaultValue: sequelize.NOW,
    },
  },
  {
    tableName: "Users",
    schema: "UsersData",
  }
);

export default Users;
