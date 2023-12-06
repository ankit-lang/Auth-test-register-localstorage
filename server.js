import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRouter from "./routes/authRoute.js";
import cors from "cors"

//config
dotenv.config();

//database connect
connectDB();
//rest object
const app = express();

//middle wares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())


app.get("/", (req, res) => {
  res.send("Hello");
});

//routes
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.bgCyan.white);
});
