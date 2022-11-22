const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");

const Administrador = require("../models/Administrador");

// Crear administrador
router.post("/administradores", async (req, res) => {
  const { usuario, password, nombre, perfil } = req.body;
  const administrador = new Administrador({
    usuario,
    password,
    nombre,
    perfil,
  });
  await administrador.save();

  const token = jwt.sign({ _id: administrador._id }, "secretkey");
  res.status(200).json({ token });
});

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

// Actualizar administrador
router.put("/administradores/:id", async (req, res) => {
  const { usuario, password, nombre, perfil } = req.body;
  const newAdministrador = {
    usuario,
    password,
    nombre,
    perfil,
  };
  if (req.params.id) {
    await Administrador.findByIdAndUpdate(req.params.id, newAdministrador);
    res.json({ status: "Administrador actualizado" });
  } else {
    res.json({ status: "Error al actualizar" });
  }
});

// Eliminar administrador
router.delete("/administradores/:id", async (req, res) => {
  await Administrador.findByIdAndRemove(req.params.id);
  res.json({ status: "Administrador eliminado" });
});

// Traer administradores
router.get("/administradores", verifyToken, async (req, res) => {
  const administradores = await Administrador.find();
  res.json(administradores);
});

module.exports = router;

function verifyToken(req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).send("Unauthorized request");

  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") return res.status(401).send("Unauthorized request");

  const payload = jwt.verify(token, "secretkey");
  req.userId = payload._id;
  next();
}
