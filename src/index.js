import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import connectToDatabase from "./config/database.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/beanbyte.com/banks", urlRoutes);

(async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
})();
