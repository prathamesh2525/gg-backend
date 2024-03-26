const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  event_name: String,
  city_name: String,
  date: Date,
  time: String,
  latitude: Number,
  longitude: Number,
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event
