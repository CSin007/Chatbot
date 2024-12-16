const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
});

module.exports = mongoose.model("Chat", ChatSchema);
