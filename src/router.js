import { Router } from "express";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const router = Router();

router.use(function timeLog(req, res, next) {
  const date = new Date();
  console.log(req.method + " : " + req.url);
  console.log(
    "Time : ",
    date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
  );
  next();
});
// -----METHOD GET-----
router.get("/", function (req, res) {
  res.render("index", { title: "Accueil" });
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    const user = await User.findByPk(id); // Trouver l'utilisateur par son ID

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error,
    });
  }
});

// -----METHOD POST-----
router.post("/users", async (req, res) => {
  try {
    const { email, password, lastName, firstName, phoneNumber, address, role } =
      req.body;

    if (!email || !password || !lastName || !firstName || !address || !role) {
      return res.status(400).json({
        message: "Tous les champs sont requis",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "L'email est déjà utilisé",
      });
    }

    // Hachage du mot de passe avant de l'enregistrer
    const saltRounds = 10; // Le nombre de "salts" pour le hachage, plus c'est élevé, plus c'est sécurisé mais lent
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Créer un nouvel utilisateur avec les données reçues
    const newUser = await User.create({
      email,
      password: hashedPassword,
      lastName,
      firstName,
      phoneNumber,
      address,
      role,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: newUser,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message || error,
    });
  }
});

// -----METHOD DELETE-----
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    User.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).json({
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'utilisateur",
      error: error.message || error,
    });
  }
});

export default router;
