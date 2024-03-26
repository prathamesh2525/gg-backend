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
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

#### Configuration

1. Create a `.env` file in the project root.
2. Add the following environment variables:

   ```makefile
   PORT=3000
   MONGODB_CONNECTION_URL=<Your MongoDB Connection URL>
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
