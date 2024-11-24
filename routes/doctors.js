const express = require("express");
const router = express.Router();
const doctors = require("../controllers/doctors");
const catchAsync = require("../utils/catchAsync");

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: The doctors managing API
 */

router.route("/login").post(catchAsync(doctors.dLogin));

router.route("/patients").get(doctors.getPatient);

router.route("/accept").post(doctors.acceptRequest);

module.exports = router;
