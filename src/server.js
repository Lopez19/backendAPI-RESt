const express = require("express");
const app = express();
const morgan = require("morgan");

const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const cors = require("cors");

// Base de datos
require("./database");

// Variables
const port = process.env.PORT || 3000;

// Settings
app.use(cors());
app.use(express.json());
app.use(express.static("src/public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("log", path.join(__dirname, "log"));

// Middlewares
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "log", "access.log"),
  {
    flags: "a",
  }
);
// setup the logger
app.use(morgan("common", { stream: accessLogStream }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/api");
});
app.get("/api", (req, res) => {
  res.render(
    "index",
    (data = {
      title: "API (Transferencia de Estado Representacional)",
    })
  );
});

// API Routes
app.use("/api/", require("./routes/index.routes"));
app.use("/api/administradores", require("./routes/administradores.routes"));
app.use("*", require("./routes/api.routes"));

// Starting the server
app.listen(port, () => console.log(`listening on http://localhost:${port}/`));
