const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const OpenAI = require("openai");
const dotenv = require("dotenv");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    console.error("Error fetching chat:", err.message);
    res.status(500).send("Server error");
  }
});

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const botResponse = completion.choices[0].message.content;

    const newChat = new Chat({ userMessage: message, botResponse });
    await newChat.save();

    res.json({ userMessage: message, botResponse });
  } catch (err) {
    console.error("Error generating response:", err.message);
    res.status(500).json({ error: "Failed to fetch response from OpenAI API" });
  }
});

module.exports = router;
