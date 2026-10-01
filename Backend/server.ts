import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());


// routes
app.use("/api/auth", userRoutes);



const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend Working");
});

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
