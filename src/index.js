const experss = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config();
const urlRoutes = require("./routes/urlRoutes");
const PORT = process.env.PORT || 3000;
const app = experss();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/beanbyte.com/banks", urlRoutes);



// Start the Express server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
