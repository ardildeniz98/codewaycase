const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

const {
  getAllConfigs,
  addConfigParam,
  updateConfigParam,
  deleteConfigParam
} = require("../services/firestoreService");

router.get("/", verifyFirebaseToken, async (req, res) => {
  try {
    const configs = await getAllConfigs();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch configs" });
  }
});


router.post("/", verifyFirebaseToken, async (req, res) => {
  const { key, value, description } = req.body;

  if (!key || value === undefined || !description) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await addConfigParam({ key, value, description });
    res.json({ message: "Parameter added" });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});


router.put("/:key", verifyFirebaseToken, async (req, res) => {
  const key = req.params.key;
  const { value, description } = req.body;

  if (value === undefined || !description) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await updateConfigParam(key, { value, description });
    res.json({ message: "Parameter updated" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});


router.delete("/:key", verifyFirebaseToken, async (req, res) => {
  const key = req.params.key;

  try {
    await deleteConfigParam(key);
    res.json({ message: "Parameter deleted" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
