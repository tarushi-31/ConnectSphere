import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if a chat between the two users already exists
    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (existingChat) {
      // If chat exists, return the existing chat
      return res.status(200).json(existingChat);
    }

    // If no chat exists, create a new chat
    const newChat = new ChatModel({
      members: [senderId, receiverId],
    });

    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating chat", error });
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};