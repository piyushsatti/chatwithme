const express = require("express");
const router = express.Router();
const {
  createSession,
  getSession,
} = require("../controllers/session.controller");

// Create a new session
router.post("/", createSession);

// Get session info
router.get("/:token", getSession);

module.exports = router;
