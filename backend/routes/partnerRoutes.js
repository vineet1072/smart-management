import express from "express";
import {
  getAllPartners,
  addPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnerController";

const router = express.Router();

router.get("/", getAllPartners);
router.post("/", addPartner);
router.put("/:id", updatePartner);
router.delete("/:id", deletePartner);

module.exports = router;