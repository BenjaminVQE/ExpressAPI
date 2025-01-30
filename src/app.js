import express from "express";
import router from "./router.js";
import http from "http";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import dab from "./services/dab.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
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

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  // Recevoir un message depuis le client
  socket.on("message", (data) => {
    if (data.startsWith("/dab")) {
      const regex = /\/dab\s+(\d+(\.\d+)?)/;
      const match = data.match(regex);
      if (match) {
        const montant = match[1];
        const resultat = dab(montant);
        let message = `Répartition du montant pour ${montant} : `;
        resultat.forEach((item) => {
          message += `${item.count} x ${item.value}€, `;
        });
        message = message.slice(0, -2);
        socket.emit("message", message);
      } else {
        socket.emit(
          "message",
          "Veuillez spécifier un montant valide après /dab."
        );
      }
    } else {
      // Diffuser le message à tous les clients connectés
      io.emit("message", data);
    }
  });

  // Gestion de la déconnexion
  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

app.use((req, res) => {
  res
    .status(404)
    .send("Erreur 404 Désolé, la page que vous recherchez n'existe pas.");
});

server.listen(process.env.PORT, () => {
  console.log(`Le serveur est lancé sur http://localhost:${process.env.PORT}`);
});
