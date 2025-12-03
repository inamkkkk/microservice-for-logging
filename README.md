# Logging Microservice

A dedicated microservice for collecting and storing logs from other services. Uses MongoDB for storage and provides API endpoints for receiving and retrieving logs.

## Features

*   Receives logs from other services via HTTP POST.
*   Stores logs in MongoDB.
*   Provides API endpoints for retrieving logs.
*   Uses Winston for logging within the microservice.
*   Includes basic error handling and request validation.

## Getting Started

### Prerequisites

*   Node.js
*   MongoDB

### Installation

1.  Clone the repository:

    
    git clone <repository_url>
    cd logging-microservice
    

2.  Install dependencies:

    
    npm install
    

3.  Configure environment variables:

    Create a `.env` file based on the `.env.example` file.

4.  Start the service:

    
    npm start
    

## API Endpoints

*   `POST /logs`: Receives a log entry.  Expected body:
    
    {
      "level": "error",
      "message": "Something went wrong",
      "service": "auth-service",
      "timestamp": "2024-10-27T10:00:00Z",
      "metadata": { "key": "value" }
    }
    

*   `GET /logs`: Retrieves all log entries.  Supports pagination with query parameters `page` and `limit`.

## Environment Variables

*   `PORT`: The port the service will listen on (default: 3000).
*   `MONGODB_URI`: The MongoDB connection string.

## Development

*   Use `npm run dev` to start the service with nodemon for automatic restarts on code changes.

## Testing

*  No tests implemented in this example, but should be added using Jest or Mocha.
