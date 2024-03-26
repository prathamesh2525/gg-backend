const express = require("express")
const fs = require("fs")
const csv = require("csv-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const eventRoutes = require("./routes/events.route")
const Event = require("./models/event.model")

const app = express()

dotenv.config()

// Middleware
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Working Fine" })
})
// Routes
app.use("/events", eventRoutes)

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB")
    // Start the server
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

    await readCSVAndSaveToMongoDB()
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
  })

const readCSVAndSaveToMongoDB = () => {
  const eventsData = []
  fs.createReadStream("./data/events.csv")
    .pipe(csv())
    .on("data", (row) => {
      eventsData.push({
        event_name: row.event_name,
        city_name: row.city_name,
        date: new Date(row.date),
        time: row.time,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
      })
    })
    .on("end", async () => {
      await Event.insertMany(eventsData)
        .then(() => console.log("CSV data saved to MongoDB"))
        .catch((err) => console.error("Error saving data to MongoDB:", err))
    })
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err)
  process.exit(1)
})
