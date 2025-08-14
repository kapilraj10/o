const express = require("express");
const {
  createLoan,
  getLoans,
  updateLoan,
  deleteLoan,
} = require("../controllers/loanController");  
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth(["admin"]), createLoan);
router.get("/", auth(), getLoans);
router.put("/:id", auth(["admin"]), updateLoan);
router.delete("/:id", auth(["admin"]), deleteLoan);

module.exports = router;
