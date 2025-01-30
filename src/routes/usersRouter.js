import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = Router();

// -----METHOD GET-----
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer l'utilisateur par son id
 *     description: Retourne une liste de tous les utilisateurs
 *     tags:
 *      - Utilisateur
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   address:
 *                      type: string
 *                   role:
 *                      type: string
 *                   createdAt:
 *                      type: string
 *                   updatedAt:
 *                      type: string
 *       404:
 *         description: Les utilisateurs non pas été trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                      type: string
 *                      example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                      type: string
 *                      example: "Erreur lors de la récupération des utilisateurs"
 */
router.get("/:id", async (req, res) => {
  try {
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
});
/**
 * @swagger
 * /users/role/{role}:
 *   get:
 *     summary: Récupérer la liste des utilisateurs par rôle
 *     description: Retourne une liste de tous les utilisateurs selon un rôle
 *     tags:
 *      - Utilisateur
 *     parameters:
 *       - name: role
 *         in: path
 *         description: ID de l'utilisateur à récupérer
 *         required: true
 *         schema:
 *           type: string
 *           example: Customer
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   address:
 *                      type: string
 *                   role:
 *                      type: string
 *                   createdAt:
 *                      type: string
 *                   updatedAt:
 *                      type: string
 *       404:
 *         description: Les utilisateurs non pas été trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                      type: string
 *                      example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                      type: string
 *                      example: "Erreur lors de la récupération des utilisateurs"
 */
router.get("/role/:role", async (req, res) => {
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
});

// -----METHOD POST-----

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Permet de créer un nouvel utilisateur avec les informations fournies
 *     tags:
 *       - Utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               lastName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur créé avec succès"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Mauvais format des données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tous les champs sont requis"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la création de l'utilisateur"
 */
router.post("/", async (req, res) => {
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
    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message || error,
    });
  }
});

// -----METHOD PUT-----

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur par son ID
 *     description: Permet de mettre à jour les informations d'un utilisateur existant
 *     tags:
 *       - Utilisateur
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               lastName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur mis à jour avec succès"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    await user.update(req.body);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error,
    });
  }
});

// -----METHOD DELETE-----

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par son ID
 *     description: Permet de supprimer un utilisateur en fonction de son ID
 *     tags:
 *       - Utilisateur
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur supprimé avec succès"
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", async (req, res) => {
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
});

export default router;
