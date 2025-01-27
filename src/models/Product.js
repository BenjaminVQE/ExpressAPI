import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER, // Type de données de la colonne id
      primaryKey: true, // Définit cette colonne comme clé primaire
      autoIncrement: true, // L'ID va s'auto-incrémenter
      allowNull: false, // Empêche que l'ID soit nul
      field: "idProduct", // Le nom exact de la colonne dans la base de données
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "Products",
    schema: "ProductsData",
  }
);

export default Products;
