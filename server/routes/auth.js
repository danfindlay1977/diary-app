const express = require("express");
const router = express.Router()
const {signup, login, checkEmail} = require("../controller/auth")
router.post("/signup", signup)
router.post("/login", login )
router.get("/checkEmail/:email", checkEmail)
module.exports = router