import { Router } from "express";
import usersRouter from "./routes/usersRouter.js";
import productsRouter from "./routes/productsRouter.js";
import authRouter from "./routes/authRouter.js";

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

router.get("/chat", function (req, res) {
  res.render("chat", { title: "Chat" });
});

router.use("/login", authRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);

export default router;
