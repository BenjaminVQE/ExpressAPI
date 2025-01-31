import { Router } from "express";
import verifyToken from "../services/verifyToken.js";
import userController from "../controller/userController.js";

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
 *     security:
 *       - BearerAuth: []
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
router.get("/:id", verifyToken, userController.getUser);

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
router.get("/role/:role", verifyToken, userController.getUserByRole);

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
router.post("/", userController.createUser);

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
router.put("/:id", verifyToken, userController.updateUser);

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
router.delete("/:id", verifyToken, userController.deleteUser);

export default router;
