const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();
app.use(cors());

app.use(express.json());

dotenv.config({ path: "./env" });

const PORT = process.env.PORT || 5000;

const uri =
  "mongodb+srv://admin:" +
  process.env.DBPass +
  "@" +
  process.env.ClusterName +
  ".wctji.mongodb.net/" +
  process.env.DBName +
  "?retryWrites=true&w=majority";

mongoose.connect(uri, async (err) => {
  if (err) throw err;
  console.log("conncted to db");
});
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/category", categoryRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Running Sever PORT:" + PORT);
});
