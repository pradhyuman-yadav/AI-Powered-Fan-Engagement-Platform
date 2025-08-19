# AI-Powered Fan Engagement Platform

This project is the backend for an AI-powered fan engagement platform. It allows users to create AI personas of public figures by scraping their social media content and documents. These AI personas can then be used for real-time chat interactions.

## Features

- **Character Creation**: Create AI characters from various online platforms:
  - Instagram
  - Substack
  - Twitter/X
  - LinkedIn
  - Custom URLs
  - Uploaded documents (PDF, TXT, DOCX)
- **Chat Interaction**: Engage in real-time conversations with the AI characters.
- **RAG System**: The chat functionality is powered by a Retrieval-Augmented Generation (RAG) system that uses the character's scraped content to provide contextually relevant responses.
- **Analytics**: The platform provides analytics on character interactions and overall platform usage.
- **RESTful API**: The backend is exposed through a RESTful API built with FastAPI.

## Getting Started

### Prerequisites

- Python 3.12+
- Pip

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/colaberry/AI-Powered-Fan-Engagement-Platform.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd AI-Powered-Fan-Engagement-Platform/backend
   ```
3. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```bash
     source venv/bin/activate
     ```
5. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   OPENAI_API_KEY="your-openai-api-key"
   ```

### Running the Application

To start the FastAPI server, run the following command:

```bash
uvicorn main:app --reload
```

The API documentation will be available at `http://127.0.0.1:8000/docs`.

## Project Structure

The project is organized into the following directories:

- **`api`**: Contains the FastAPI endpoints for different features.
- **`data`**: Stores scraped data and uploaded files.
- **`models`**: Defines the Pydantic models for data validation.
- **`scrapers`**: Contains the Scrapy spiders for scraping content from different platforms.
- **`services`**: Contains the business logic for the application, including the profile generator, RAG system, and PDF processor.
- **`venv`**: The virtual environment directory.

## API Endpoints

The following are the main API endpoints:

- **`POST /api/v1/onboard-person`**: Onboard a new person by scraping their social media profiles and documents.
- **`GET /api/v1/characters`**: Get a list of all available characters.
- **`GET /api/v1/character/{character_id}/status`**: Check the processing status of a character.
- **`GET /api/v1/character/{character_id}/profile`**: Get the profile of a character.
- **`POST /api/v1/chat`**: Chat with an AI character.
- **`GET /api/v1/conversations/{character_id}`**: Get the conversation history for a character.
- **`GET /api/v1/character/{character_id}/insights`**: Get analytics and insights about a character.

For a complete list of endpoints and their parameters, please refer to the API documentation at `http://127.0.0.1:8000/docs`.

## Future Improvements

- **Robust Error Handling**: Improve the error handling in the scrapers to make them more resilient to changes in website structure.
- **Database Integration**: Replace the in-memory data storage with a proper database like PostgreSQL or MongoDB.
- **Authenticated Scraping**: Implement authenticated scraping to access more content from platforms like Instagram, Twitter and LinkedIn.
- **Testing**: Add unit and integration tests to improve the quality and reliability of the application.
