from openai import OpenAI
from app.config import settings

def extract_persona_from_docs(docs_text: str, persona_name: str) -> str:
    """
    Sends the concatenated document text to an AI model to get a persona description.
    """
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    
    system_prompt = (
        f"You are an expert in analyzing text to create detailed persona profiles. "
        f"Based on the following content authored by {persona_name}, create a rich persona description. "
        f"Include tone, style, key themes, and notable characteristics in your summary. "
        f"The description should be concise but rich enough to guide a conversational AI.\n\n"
        f"Content:\n{docs_text[:4000]}"  # Limit input length to respect token limits
    )
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": system_prompt}],
        temperature=0.7,
        max_tokens=500,
    )
    
    persona_description = response.choices[0].message.content.strip()
    return persona_description