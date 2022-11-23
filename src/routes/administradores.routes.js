const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");

const {
  getAdministradores,
  createAdministrador,
  getAdministrador,
  deleteAdministrador,
  updateAdministrador,
} = require("../controllers/administrador.controller");

// Crear administrador
router.post("/", verifyToken, createAdministrador);

// Actualizar administrador
router.put("/:id", verifyToken, updateAdministrador);

// Eliminar administrador
router.delete("/:id", verifyToken, deleteAdministrador);

// Traer administradores
router.get("/", verifyToken, getAdministradores);

module.exports = router;

function verifyToken(req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Unauthorized request" });

  const token = req.headers.authorization.split(" ")[1];
  if (token === "null" || token === "undefined")
    return res.status(401).json({ message: "Unauthorized request" });

  const payload = jwt.verify(token, "secretkey");
  req.userId = payload._id;
  next();
}
