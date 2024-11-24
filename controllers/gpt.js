const axios = require("axios");

/**
 * @swagger
 * /gpt:
 *   post:
 *     summary: Generate chat completions using OpenAI's GPT model
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       description: The role of the message sender (e.g., "user" or "system")
 *                       example: "user"
 *                     content:
 *                       type: string
 *                       description: The content of the message
 *                       example: "Hello, how can I help you today?"
 *     responses:
 *       200:
 *         description: Successfully fetched chat completion response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the chat completion response
 *                 object:
 *                   type: string
 *                   description: The object type (e.g., "chat.completion")
 *                 choices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: object
 *                         properties:
 *                           role:
 *                             type: string
 *                             description: The role of the message sender
 *                           content:
 *                             type: string
 *                             description: The content of the message response
 *                       finish_reason:
 *                         type: string
 *                         description: The reason the completion stopped
 *       500:
 *         description: Failed to fetch chat completions
 */
module.exports.chatGPT = async (req, res) => {
  const { messages } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching chat completions:", error);
    res.status(500).json({ error: "Failed to fetch chat completions" });
  }
};
