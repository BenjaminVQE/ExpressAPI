import express from "express";
import router from "./router.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(ejsLayouts);
app.use("/", router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
//app.use(cookieParser());

app.use((req, res) => {
  res
    .status(404)
    .send("Erreur 404 Désolé, la page que vous recherchez n'existe pas.");
});

app.listen(process.env.PORT, () => {
  console.log(`Le serveur est lancé sur http://localhost:${process.env.PORT}`);
});
