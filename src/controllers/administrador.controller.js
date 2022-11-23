const jwt = require("jsonwebtoken");

const Administrador = require("../models/Administrador");

// Crear administrador
createAdministrador = async (req, res) => {
  const { usuario, password, nombre, perfil } = req.body;
  const administrador = new Administrador({
    usuario,
    password,
    nombre,
    perfil,
  });
  await administrador.save();

  const token = jwt.sign({ _id: administrador._id }, "secretkey");
  res.status(201).json({ token });
};

// Actualizar administrador
updateAdministrador = async (req, res) => {
  const { usuario, password, nombre, perfil } = req.body;
  const newAdministrador = {
    usuario,
    password,
    nombre,
    perfil,
  };
  if (req.params.id) {
    await Administrador.findByIdAndUpdate(req.params.id, newAdministrador);
    res.status(204).json({ status: "Administrador actualizado" });
  } else {
    res.status(409).json({ status: "Error al actualizar" });
  }
};

// Eliminar administrador
deleteAdministrador = async (req, res) => {
  await Administrador.findByIdAndRemove(req.params.id);
  res.status(200).json({ status: "Administrador eliminado" });
};

// Traer administradores
getAdministradores = async (req, res) => {
  const administradores = await Administrador.find();
  res.json(administradores);
};

module.exports = {
  createAdministrador,
  updateAdministrador,
  deleteAdministrador,
  getAdministradores,
};
