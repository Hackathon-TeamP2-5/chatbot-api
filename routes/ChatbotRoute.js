const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/ChatbotController.js");

// Define endpoint for sending messages to the chatbot
router.post("/message", chatbotController.sendMessage);

module.exports = router;
