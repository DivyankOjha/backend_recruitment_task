# Backend Recruitment Task

## Overview
This project implements a backend service that integrates data from an external pollution API and enriches it with descriptions from the Wikipedia API. The service provides an endpoint to fetch a list of the most polluted cities by country, ensuring that only valid city entries are returned.

## How to Run the Application Locally
1. Clone the repository:
   ```
   git clone <repository-url>
   cd backend-recruitment-task
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   API_USERNAME=testuser
   API_PASSWORD=testpass
   ```

4. Start the application:
   ```
   npm start
   ```

5. Access the endpoint at `http://localhost:3000/cities`.

## How to Determine Whether Something is a City
To determine if an entry is a valid city, the following criteria are used:
- The entry must have a valid name (non-empty and not just whitespace).
- The entry must not contain any known typos or incomplete data.
- The entry must be a recognized geographical location, which is validated using a custom function that checks against a set of rules.

## Limitations and Assumptions
- The mock API may contain random data corruption, and the filtering logic is based on heuristics that may not cover all edge cases.
- The Wikipedia API has rate limits; therefore, caching is implemented to minimize redundant requests.
- The service currently only supports fetching city data and does not handle other geographical entities.

## Future Improvements
- Implement more robust validation for city names.
- Enhance error handling for API requests.
- Consider adding pagination for the results if the dataset is large.