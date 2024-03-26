const Event = require("../models/event.model")
const { fetchWeather, calculateDistance } = require("../utils/index")

const createEvent = async (req, res) => {
  try {
    const eventData = req.body
    const event = await Event.create({
      event_name: eventData.event_name,
      city_name: eventData.city_name,
      date: new Date(eventData.date),
      time: eventData.time,
      latitude: parseFloat(eventData.latitude),
      longitude: parseFloat(eventData.longitude),
    })
    await event.save()
    res.status(201).send("Event added successfully")
  } catch (error) {
    console.error("Error adding event: ", error)
    res.status(500).send("Internal server error")
  }
}

const filterEvent = async (req, res) => {
  try {
    const { latitude, longitude, date, page = 1, pageSize = 10 } = req.query
    const userDate = new Date(date)

    const events = await Event.find({
      date: {
        $gte: userDate,
        $lte: new Date(userDate.setDate(userDate.getDate() + 14)),
      },
    })

    const totalEvents = events.length
    const totalPages = Math.ceil(totalEvents / pageSize)

    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize

    const paginatedEvents = events.slice(startIndex, endIndex)

    const result = await Promise.all(
      paginatedEvents.map(async (event) => {
        const weather = await fetchWeather(event?.city_name, event?.date)
        const distance = await calculateDistance(
          latitude,
          longitude,
          event.latitude,
          event.longitude
        )
        return {
          event_name: event.event_name,
          city_name: event.city_name,
          date: event.date.toString().split("T")[0],
          weather: weather,
          distance: distance,
        }
      })
    )
    res.json({
      events: result,
      page: page,
      pageSize: pageSize,
      totalEvents: totalEvents,
      totalPages: totalPages,
    })
  } catch (error) {
    console.error("Error filtering events:", error)
    res.status(500).send("Internal Server Error")
  }
}

module.exports = { createEvent, filterEvent }
