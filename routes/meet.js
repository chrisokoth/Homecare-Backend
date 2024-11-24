const express = require("express");
const router = express.Router();
const meet = require("../controllers/meet");

/**
 * @swagger
 * tags:
 *   name: Meet
 *   description: The Meet API for video meetings and token generation
 */

router.route("/get_token").get(meet.getToken);

module.exports = router;
