import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
dotenv.config();

const app = express();
app.use(express.json());
connectDatabase();

const PORT = process.env.PORT

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
