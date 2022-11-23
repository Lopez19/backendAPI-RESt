const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Instancio de los procesos
const p = process.env;

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${p.DB_USER}:${p.DB_PASSWORD}@${p.DB_CLUSTER}.${p.DB_DOMAIN}/${p.DB_NAME}?${p.DB_PARAMS}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
