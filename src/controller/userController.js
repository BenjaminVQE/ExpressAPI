import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function getUser(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params; // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    }); // Trouver l'utilisateur par son ID

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
}

export async function getUserByRole(req, res) {
  try {
    const { role } = req.params;
    const user = await User.findOne({
      where: { role: role },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateurs non trouvés",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error,
    });
  }
}

export async function createUser(req, res) {
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
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message || error,
    });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    await user.update(req.body);

    res
      .status(200)
      .json({ message: "Utilisateur mis à jour avec succès", data: user });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'utilisateur",
      error,
    });
  }
}

export async function deleteUser(req, res) {
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
    res.status(500).json({
      message: "Erreur lors de la suppression de l'utilisateur",
      error: error.message || error,
    });
  }
}

export default {
  getUser,
  getUserByRole,
  createUser,
  updateUser,
  deleteUser,
};
