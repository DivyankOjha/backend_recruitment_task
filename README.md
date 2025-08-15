# Backend Recruitment Task

## Overview
This project implements a backend service that integrates data from an external pollution API and enriches it with descriptions from the Wikipedia API. The service provides an endpoint to fetch a list of the most polluted cities by country, ensuring that only valid city entries are returned.

## Features
- **Pollution Data Integration**: Fetches pollution data from external API based on country code
- **City Validation**: Filters and validates city data to ensure accuracy
- **Wikipedia Integration**: Enriches city data with descriptions from Wikipedia
- **Rate Limiting**: Implements rate limiting to prevent API abuse
- **Caching**: Uses caching mechanisms to improve performance and reduce API calls
- **Pagination Support**: Supports pagination for large datasets

## API Endpoints

### GET /cities
Fetches a list of polluted cities for a given country.

**Query Parameters:**
- `countryCode` (required): ISO country code (e.g., 'US', 'GB', 'DE')
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10)

**Example Request:**
```
GET http://localhost:3000/cities?countryCode=US&page=1&limit=10
```

**Example Response:**
```json
{
  "cities": [
    {
      "name": "New York",
      "country": "US",
      "pollution": {
        "aqi": 85,
        "mainPollutant": "PM2.5"
      },
      "description": "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean..."
    }
  ],
  "limit": 10,
  "page": 1,
  "total": 1
}
```

## How to Run the Application Locally

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend-recruitment-task
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   API_USERNAME=testuser
   API_PASSWORD=testpass
   PORT=3000
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. The server will start on `http://localhost:3000`

## Testing the API

You can test the API using curl or any API testing tool like Postman:

```bash
# Get cities for United States
curl "http://localhost:3000/cities?countryCode=US"

# Get cities for United Kingdom with pagination
curl "http://localhost:3000/cities?countryCode=DE&page=1&limit=5"
```

## How to Determine Whether Something is a City

To determine if an entry is a valid city, the following criteria are used:
- The entry must have a valid name (non-empty and not just whitespace)
- The entry must not contain any known typos or incomplete data
- The entry must be a recognized geographical location, which is validated using a custom function that checks against a set of rules
- City names are normalized and validated against known patterns
- Invalid entries (typos, incomplete data, non-city locations) are filtered out

## Project Structure

```
backend-recruitment-task/
├── app.js                 # Main application entry point
├── routes/
│   └── cities.js         # API routes definition
├── controllers/
│   └── citiesController.js # Request handlers
├── services/
│   ├── pollutionService.js # External pollution API integration
│   └── wikipediaService.js # Wikipedia API integration
├── helpers/
│   ├── apiCall.js        # Generic API call utility
│   ├── enrichCitiesWithDescriptions.js # Wikipedia enrichment logic
│   ├── filterValidCities.js # City validation logic
│   ├── reformatData.js   # Data transformation utilities
│   └── generateToken/    # Token generation utilities
├── middlewares/
│   └── rateLimiter.js    # Rate limiting middleware
├── cache/
│   └── cache.js          # Caching configuration
├── utils/
│   └── cityValidator.js  # City validation utilities
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
└── README.md           # This file
```

## Environment Variables

Create a `.env` file with the following variables:

```bash
# API Credentials
API_USERNAME=your_username
API_PASSWORD=your_password

# Server Configuration
PORT=3000

# Cache Configuration (optional)
CACHE_TTL=3600
```

## Dependencies

Key dependencies include:
- **express**: Web framework for Node.js
- **axios**: HTTP client for API requests
- **dotenv**: Environment variable management
- **express-rate-limit**: Rate limiting middleware

## Limitations and Assumptions

- The mock API may contain random data corruption, and the filtering logic is based on heuristics that may not cover all edge cases
- The Wikipedia API has rate limits; therefore, caching is implemented to minimize redundant requests
- The service currently only supports fetching city data and does not handle other geographical entities
- Country codes must be valid ISO country codes
- City validation is based on predefined rules and may not catch all edge cases

## Error Handling

The API implements comprehensive error handling:
- Returns 400 Bad Request for missing required parameters
- Returns 500 Internal Server Error for server-side issues
- Provides meaningful error messages in JSON format

## Future Improvements

- Implement more robust validation for city names
- Enhance error handling for API requests
- Consider adding pagination for the results if the dataset is large
- Add caching for Wikipedia API responses
- Add comprehensive API documentation with Swagger
- Add unit and integration tests
- Support for multiple languages in Wikipedia descriptions
- Add filtering options (e.g., by pollution level, population)
