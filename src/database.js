const { default: mongoose } = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/angular-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
