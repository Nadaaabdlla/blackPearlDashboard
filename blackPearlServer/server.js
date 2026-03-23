const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dns = require("dns");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

app.use(express.json());

// set dns manually to 
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Routes
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Server
app.listen(process.env.PORT, () => {
  console.log("Server running");
});