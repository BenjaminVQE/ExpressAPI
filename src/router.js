import { Router } from "express";

const router = Router();

// middleware that is specific to this router
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
// Home Page
router.get("/", function (req, res) {
  res.render("index", { title: "Accueil" });
});
// Register Page
router.get("/signup", function (req, res) {
  res.render("signup", { title: "Créer un compte" });
});

// Connexion Page
router.get("/signin", function (req, res) {
  res.render("signin", { title: "Se connecter" });
});

export default router;
