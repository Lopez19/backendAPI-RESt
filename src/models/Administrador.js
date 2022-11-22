const { default: mongoose } = require("mongoose");

const AdministradorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    perfil: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Administrador", AdministradorSchema);
