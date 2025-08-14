const express = require("express");
const { createIncome, getAll, updateIncome, deleteIncome } = require("../controllers/incomeController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth(["admin"]), createIncome);
router.get("/", auth(), getAll);
router.put("/:id", auth(["admin"]), updateIncome);
router.delete("/:id", auth(["admin"]), deleteIncome);

module.exports = router;
