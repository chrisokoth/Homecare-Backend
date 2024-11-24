const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /meet/get_token:
 *   get:
 *     summary: Generate a JWT token for video meeting access
 *     tags: [Meet]
 *     responses:
 *       200:
 *         description: Successfully generated a JWT token for meeting access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token to access the video meeting
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       500:
 *         description: Error generating the JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Failed to generate token"
 */
module.exports.getToken = async (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "120m", algorithm: "HS256" };

  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"],
  };

  try {
    // Create JWT token
    const token = jwt.sign(payload, SECRET_KEY, options);
    
    // Return the token in response
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
};
