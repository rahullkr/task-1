const experss = require("express");
const app = experss();
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3000;


// Start the Express server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
