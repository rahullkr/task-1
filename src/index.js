const experss = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config();
const urlRoutes = require("./routes/urlRoutes");
const connectToDatabase = require("./config/database");
const PORT = process.env.PORT;
const app = experss();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/beanbyte.com/banks", urlRoutes);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
