import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import registerUser from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

// App routes
app.use("/api/users", userRoute);
app.use("/api/users", registerUser);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Server is starting now");
});

app.listen(port, () => {
  console.log(`Server is listening on this ${port}`);
});
