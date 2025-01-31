import authController from "../controller/authController.js";
import { Router } from "express";

const router = Router();
// -----METHOD GET-----
router.get("/login", function (req, res) {
  res.render("login", { title: "Connexion" });
});

// -----METHOD POST-----
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Permet de connecter un utilisateur en échangeant l'email et le mot de passe contre un JWT
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *                 example: "user123-"
 *     responses:
 *       200:
 *         description: Connexion réussie et renvoi du JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Connexion réussie"
 *                 token:
 *                   type: string
 *                   description: Le token JWT généré pour l'utilisateur
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc5Nzc1NTYxLCJleHBpcmVzSW4iOiIxYjciLCJpc3MiOiJhdXRoIn0.x8Udx_29jf5Ey8BxZv9P-VtMxwFy0HHvG4G4qOoyc9A"
 *       400:
 *         description: Mauvaise demande, email ou mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email ou mot de passe incorrect"
 *       404:
 *         description: L'utilisateur n'a pas été trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */
router.post("/", authController.login);

export default router;
