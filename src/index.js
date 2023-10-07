const experss = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config();
const urlRoutes = require("./routes/urlRoutes");
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const app = experss();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/beanbyte.com/banks", urlRoutes);

// Start the Express server and listen on the specified PORT

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
