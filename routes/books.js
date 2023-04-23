const express = require("express");
const router = express.Router();
const {
  getAllBookList,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");
// const {}
// get all booklist
router.get("/", getAllBookList);

router.get("/:id", getBook);

router.post("/", createBook);

router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);
module.exports = router;
