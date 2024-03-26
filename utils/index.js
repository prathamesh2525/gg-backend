// utils/index.js
const axios = require("axios")

async function fetchWeather(city, date) {
  try {
    const response = await axios.get(
      `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${city}&date=${date}`
    )
    return response.data.weather
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return "Unknown"
  }
}

async function calculateDistance(lat1, lon1, lat2, lon2) {
  try {
    const response = await axios.get(
      `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${lat1}&longitude1=${lon1}&latitude2=${lat2}&longitude2=${lon2}`
    )
    return response.data.distance
  } catch (error) {
    console.error("Error fetching distance data:", error)
    return "Unknown"
  }
}

module.exports = {
  fetchWeather,
  calculateDistance,
}
