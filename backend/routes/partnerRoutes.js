const express = require("express");
const {
  getAllPartners,
  addPartner,
  updatePartner,
  deletePartner,
} = require("../controllers/partnerController");

const router = express.Router();

router.get("/", getAllPartners);
router.post("/", addPartner);
router.put("/:id", updatePartner);
router.delete("/:id", deletePartner);

module.exports = router;
