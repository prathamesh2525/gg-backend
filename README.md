## Event Management Service

This repository contains the source code for an Event Management Service built with Node.js, Express.js, and MongoDB. It provides RESTful APIs to manage and query event data based on geographical location and specified dates.

### Tech Stack and Database

#### Technology Stack

- **Node.js**: Used for server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js, used for building RESTful APIs.
- **MongoDB**: A NoSQL database used for storing event data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, used for interacting with MongoDB from Node.js.
- **Axios**: Promise-based HTTP client for making HTTP requests, used for fetching weather data and calculating distances.

#### Database

- **MongoDB**: Chosen for its flexibility, scalability, and ease of use with Node.js applications. MongoDB stores event data, allowing for flexible schema design and efficient querying.

### Setup and Run

#### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account or local MongoDB instance running.

#### Installation

1. Clone this repository to your local machine.
   - `https://github.com/prathamesh2525/gg-backend`
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

#### Configuration

1. Create a `.env` file in the project root.
2. Add the following environment variables:

   ```makefile
    PORT = 3000
    MONGODB_CONNECTION_URL = "YOUR MONGODB CONNECTION URL"
    WEATHER_API_URL = "Weather API specified in the design doc of the assignment"
    DISTANCE_API_URL = "Distance API specified in the design doc of the assignment"
   ```

#### RUn the Server

1.  Start your MongoDB server.
2.  Run npm start to start the server.
3.  The server will start listening on the port specified in the .env file (default is 3000).

### API Endpoints

#### Create Event

- URL: /events/create
- Method: POST
- Request Body:

```json
{
  "event_name": "Event Name",
  "city_name": "City Name",
  "date": "YYYY-MM-DD",
  "time": "HH:MM:SS",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

- Response:
  - Status: 201 Created
  - Body: "Event added successfully"
- Error Response:
  - Status: 500 Internal Server Error

#### Filter Event

- URL: /events/find
- Method: POST
- Query Parameters:

  - `latitude`: User's latitude
  - `longitude`: User's longitude
  - `date`: Search date in YYYY-MM-DD format

- Response: Status: 200 OK
- Body: Array of event objects

```json
[
  {
    "event_name": "Event Name",
    "city_name": "City Name",
    "date": "YYYY-MM-DD",
    "weather": "Weather Condition",
    "distance": "Distance in kilometers"
  }
]
```

- Error Response:
  - Status: 500 Internal Server Error

### Curl Requests

- Create Request (will have to pass body):

Hosted API: https://gg-backend-adi8.onrender.com/ (might take around a minute to kickstart)

```bash
$body = @{
    "event_name" = "Event Name"
    "city_name" = "City Name"
    "date" = "YYYY-MM-DD"
    "time" = "HH:MM:SS"
    "latitude" = 40.7128
    "longitude" = -74.0060
} | ConvertTo-Json

Invoke-WebRequest -Uri 'https://gg-backend-adi8.onrender.com/events/create' -Method Post -Body $body -ContentType 'application/json'

```

- Filter Request:

```bash
Invoke-WebRequest -Uri 'https://gg-backend-adi8.onrender.com/events/find?latitude=37.7749&longitude=-122.4194&date=2024-03-30' -Method Post
```
