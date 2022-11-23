const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");

const Administrador = require("../models/Administrador");

// Iniciar sesión
router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;
  const administrador = await Administrador.findOne({ usuario });

  if (!administrador)
    return res.status(401).json({ message: "Usuario no encontrado" });
  if (administrador.password !== password)
    return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ _id: administrador._id }, "secretkey");
  return res.status(200).json({ token, data: administrador });
});

module.exports = router;
