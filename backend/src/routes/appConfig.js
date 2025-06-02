const express = require("express");
const router = express.Router();
const { getAllConfigsMap } = require("../services/firestoreService");
const { verifyApiToken } = require("../middlewares/apiTokenValidator");

router.get("/", verifyApiToken, async (req, res) => {
  try {
    const configs = await getAllConfigsMap();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch config" });
  }
});

module.exports = router;
