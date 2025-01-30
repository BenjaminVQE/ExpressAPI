import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Format: "Bearer <token>"

  if (!token) {
    return res
      .status(403)
      .json({ message: "Accès refusé. Aucun token fourni" });
  }

  try {
    // Vérifier le token avec le secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décoder le token

    // Attacher l'utilisateur à la requête
    req.user = decoded;

    // Passer au middleware suivant ou à la route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

export default verifyToken;
