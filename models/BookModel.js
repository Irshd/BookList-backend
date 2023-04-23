const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("BookList", BookSchema);
