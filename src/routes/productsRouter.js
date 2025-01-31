import { Router } from "express";
import verifyToken from "../services/verifyToken.js";
import productController from "../controller/productController.js";

const router = Router();

// -----METHOD GET-----
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupérer tous les produits
 *     description: Retourne une liste de tous les produits disponibles
 *     tags:
 *       - Produit
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   brand:
 *                     type: string
 *                   model:
 *                     type: string
 *                   weight:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   price:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la récupération des produits"
 */
router.get("/", verifyToken, productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     description: Retourne un produit spécifique en fonction de son ID
 *     tags:
 *       - Produit
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du produit à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Détails du produit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 brand:
 *                   type: string
 *                 model:
 *                   type: string
 *                 weight:
 *                   type: string
 *                 stock:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 price:
 *                   type: string
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Produit non trouvé"
 */
router.get("/:id", verifyToken, productController.getProductById);

// -----METHOD POST-----
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Créer un nouveau produit
 *     description: Permet de créer un nouveau produit avec les informations fournies
 *     tags:
 *       - Produit
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               weight:
 *                 type: string
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Produit créé avec succès"
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     brand:
 *                       type: string
 *                     model:
 *                       type: string
 *                     weight:
 *                       type: string
 *                     stock:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     price:
 *                       type: string
 *       400:
 *         description: Mauvais format des données
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la création du produit"
 */
router.post("/", verifyToken, productController.createProduct);

// -----METHOD PUT-----
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mettre à jour un produit par son ID
 *     description: Permet de mettre à jour les informations d'un produit existant
 *     tags:
 *       - Produit
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du produit à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               weight:
 *                 type: string
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Produit mis à jour avec succès"
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     brand:
 *                       type: string
 *                     model:
 *                       type: string
 *                     weight:
 *                       type: string
 *                     stock:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     price:
 *                       type: string
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", verifyToken, productController.updateProduct);

// -----METHOD DELETE-----
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprimer un produit par son ID
 *     description: Permet de supprimer un produit en fonction de son ID
 *     tags:
 *       - Produit
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du produit à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Produit supprimé avec succès"
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", verifyToken, productController.deleteProduct);

export default router;
