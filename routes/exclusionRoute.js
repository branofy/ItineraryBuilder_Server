const express = require("express");

const {
  getExclusions,
  getExclusion,
  createExclusion,
  deleteExclusion,
  updateExclusion,
} = require("../controllers/exclusionController");

const router = express.Router();

//get all exclusions
router.get("/", getExclusions);

//get a single exclusion
router.get("/:id", getExclusion);

router.post("/", createExclusion);

router.delete("/:id", deleteExclusion);

router.patch("/:id", updateExclusion);

module.exports = router;
