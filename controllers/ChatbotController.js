const chatbotService = require("../services/ChatbotService");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const response = await chatbotService.sendMessageToModel(message);

    if (response) {
      res.json({ response: response.trim() });
    } else {
      throw new Error("No response received from the model.");
    }
  } catch (error) {
    console.error("Error in sending message:", error);
    res.status(500).send("Failed to send message");
  }
};

module.exports = {
  sendMessage,
};
