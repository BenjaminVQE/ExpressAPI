import express from "express";
import router from "./router.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de données synchronisée");
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données:",
      error
    );
  });

app.use((req, res) => {
  res
    .status(404)
    .send("Erreur 404 Désolé, la page que vous recherchez n'existe pas.");
});

app.listen(process.env.PORT, () => {
  console.log(`Le serveur est lancé sur http://localhost:${process.env.PORT}`);
});
