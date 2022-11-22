const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

require("./database");

app.use(cors());
app.use(express.json());
app.use("/api/", require("./routes/index.routes"));

app.listen(port, () =>
  console.log(`listening on http://localhost:${port}/api/`)
);
