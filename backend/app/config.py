# In app/config.py

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Defines the application's configuration settings by reading from environment
    variables or a .env file.
    """
    # Define your configuration variables here with type hints.
    # Pydantic will automatically read the corresponding environment variable.
    OPENAI_API_KEY: str
    PINECONE_API_KEY: str
    PINECONE_INDEX_NAME: str
    DATABASE_URL: str

    # This tells Pydantic to load variables from a .env file
    model_config = SettingsConfigDict(env_file=".env")


# Create a single, importable instance of the settings
settings = Settings()