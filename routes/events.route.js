// routes/events.js
const express = require("express")
const router = express.Router()
const eventsController = require("../controllers/event.controller")

router.post("/create", eventsController.createEvent)
router.post("/find", eventsController.filterEvent)

module.exports = router
