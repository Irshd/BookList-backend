require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
//
//
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/book", bookRoutes);
app.use("/user", userRoutes);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to Database and server running on ${process.env.PORT} `
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
