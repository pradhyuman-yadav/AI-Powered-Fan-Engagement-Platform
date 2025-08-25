from fastapi import APIRouter, HTTPException, Depends
from typing import List
from langchain_chroma import Chroma
from pydantic import BaseModel, Field
from app.config import settings
from langchain_openai import OpenAIEmbeddings
from sqlalchemy.orm import Session, relationship
import datetime
from openai import OpenAI
from app.database import get_db, engine, Base
from app.services.auth import get_current_user
from app.models import User, ChatSession, Message, MessageType, Persona

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    conversation_id: int | None = Field(None, description="ID of an existing conversation. If null, a new one is created.")
    user_query: str
    influencer_name: str

class ChatResponse(BaseModel):
    conversation_id: int
    ai_response: str
    retrieved_context: List[str] = []

class HistoryResponse(BaseModel):
    conversation_id: int
    messages: List[ChatMessage]

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)

#####################
# START Route
#####################

# @router.post("/start", response_model=HistoryResponse)
# @router.post("/start/", response_model=HistoryResponse)
# def start_new_conversation(db: Session = Depends(get_db)):
#     new_conversation = Conversation()
#     db.add(new_conversation)
#     db.commit()
#     db.refresh(new_conversation)
#     return HistoryResponse(conversation_id=new_conversation.id, messages=[])

@router.post("/start", response_model=HistoryResponse)
@router.post("/start/", response_model=HistoryResponse)
def start_new_conversation(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_session = ChatSession(
        user_id=current_user.id,
        is_active=True,
        created_at=datetime.datetime.now(datetime.timezone.utc),
        updated_at=datetime.datetime.now(datetime.timezone.utc)
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return HistoryResponse(
        conversation_id=new_session.id,
        messages=[]
    )


#####################
# History Route
#####################

# @router.get("/history/{conversation_id}", response_model=HistoryResponse)
# def get_conversation_history(conversation_id: int, db: Session = Depends(get_db)):
#     """Retrieves all messages for a given conversation."""
#     conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()
#     if not conversation:
#         raise HTTPException(status_code=404, detail="Conversation not found.")
    
#     messages = [ChatMessage(role=msg.role, content=msg.content) for msg in conversation.messages]
#     return HistoryResponse(conversation_id=conversation.id, messages=messages)

@router.get("/history/{conversation_id}", response_model=HistoryResponse)
def get_conversation_history(conversation_id: int, db: Session = Depends(get_db)):
    """Retrieves all messages for a given chat session."""
    chat_session = db.query(ChatSession).filter(ChatSession.id == conversation_id).first()
    if not chat_session:
        raise HTTPException(status_code=404, detail="Chat session not found.")
    
    messages = []
    for msg in chat_session.messages:
        messages.append(
            ChatMessage(
                role=msg.message_type.value,  # Enum to string
                content=msg.content
            )
        )
    return HistoryResponse(conversation_id=chat_session.id, messages=messages)

#####################
# Chat Route
#####################

# @router.post("/", response_model=ChatResponse)
# async def handle_chat_request(request: ChatRequest, db: Session = Depends(get_db)):
#     if not settings.OPENAI_API_KEY or "your_openai_key" in settings.OPENAI_API_KEY:
#         raise HTTPException(status_code=500, detail="OpenAI API key is not configured on the server.")

#     if request.conversation_id:
#         conversation = db.query(Conversation).filter(Conversation.id == request.conversation_id).first()
#         if not conversation:
#             raise HTTPException(status_code=404, detail="Conversation not found.")
#     else:
#         conversation = Conversation()
#         db.add(conversation)
#         db.commit()
#         db.refresh(conversation)

#     persona = db.query(Persona).filter(Persona.name == request.influencer_name).first()
#     if not persona:
#         raise HTTPException(
#             status_code=404,
#             detail=f"No persona found for influencer '{request.influencer_name}'"
#         )

#     # --- Step 2: Retrieve Chat History from DB ---
#     history_from_db = [{"role": msg.role, "content": msg.content} for msg in conversation.messages]
    
#     retrieved_context_snippets = []
#     try:
#         embeddings = OpenAIEmbeddings(model="text-embedding-3-large", openai_api_key=settings.OPENAI_API_KEY)
#         vectorstore = Chroma(
#             collection_name="onboarding_docs",
#             persist_directory="db",
#             embedding_function=embeddings
#         )

#         retrieved_docs = vectorstore.similarity_search(request.user_query, k=3) # Retrieve top 3 chunks
#         retrieved_context_snippets = [doc.page_content for doc in retrieved_docs]
#         print(f"Retrieved {len(retrieved_context_snippets)} context snippets from ChromaDB.")

#         for i, doc in enumerate(retrieved_docs):
#             if hasattr(doc, 'metadata') and doc.metadata:
#                 print(f"Context {i+1} metadata: {doc.metadata}")

#     except Exception as e:
#         print(f"Warning: Could not connect to or retrieve from ChromaDB. Proceeding without context. Error: {e}")


#     if retrieved_context_snippets:
#         system_prompt = (
#             f"You are an AI assistant embodying this persona:\n\n{persona.description}\n\n"
#             f"Base all your answers on the following retrieved context where possible."
#             f"If the context doesn't fully answer the user's question, respond using the tone, "
#             f"style, and personality of {persona.name}.\n\n"
#             "--- Relevant Context ---\n"
#             + "\n".join([f"Context {i+1}: {snippet}" for i, snippet in enumerate(retrieved_context_snippets)])
#             + "\n--- End Context ---"
#             "Instructions:\n"
#             f"- Stay in character as {persona.name}\n"
#             "- Answer primarily using the provided context\n"
#             "- If context is insufficient, acknowledge it and extrapolate\n"
#             "- Be conversational and engaging"
#         )
#     else:
#         system_prompt = (
#             f"You are an AI assistant embodying this persona:\n\n{persona.description}\n\n"
#             f"Answer in the tone, style, and personality of {persona.name}, "
#             "even if no contextual information is available."
#         )


#     # Combine the system prompt, previous messages, and the new user query.
#     full_chat_history = [{"role": "system", "content": system_prompt}]
#     full_chat_history.extend(history_from_db)
#     full_chat_history.append({"role": "user", "content": request.user_query})

#     try:
#         client = OpenAI(api_key=settings.OPENAI_API_KEY)

#         response = client.chat.completions.create(
#             model="gpt-4o",
#             messages=full_chat_history,
#             temperature=0.7,
#             max_tokens=1000,
#         )
#         ai_message = response.choices[0].message.content

#     except Exception as e:
#         print(f"Error calling OpenAI API: {e}")
#         raise HTTPException(status_code=500, detail="Failed to get a response from the AI model.")
    
#     user_message_db = ChatMessageDB(conversation_id=conversation.id, role="user", content=request.user_query)
#     ai_message_db = ChatMessageDB(conversation_id=conversation.id, role="assistant", content=ai_message)
#     db.add(user_message_db)
#     db.add(ai_message_db)
#     db.commit()
#     db.refresh(user_message_db)
#     db.refresh(ai_message_db)


#     # --- Step 4: Return the Final Response ---
#     return ChatResponse(
#         conversation_id=conversation.id,
#         ai_response=ai_message,
#         retrieved_context=retrieved_context_snippets
#     )

@router.post("/", response_model=ChatResponse)
async def handle_chat_request(request: ChatRequest, db: Session = Depends(get_db)):
    if not settings.OPENAI_API_KEY or "your_openai_key" in settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI API key is not configured on the server.")
    
    # Load or create ChatSession
    if request.conversation_id:
        chat_session = db.query(ChatSession).filter(ChatSession.id == request.conversation_id).first()
        if not chat_session:
            raise HTTPException(status_code=404, detail="Chat session not found.")
    else:
        chat_session = ChatSession(user_id=1, is_active=True)  # Modify user_id as needed or get current user context
        db.add(chat_session)
        db.commit()
        db.refresh(chat_session)
    
    # Load Persona for the influencer name provided
    persona = db.query(Persona).filter(Persona.name == request.influencer_name).first()
    if not persona:
        raise HTTPException(
            status_code=404,
            detail=f"No persona found for influencer '{request.influencer_name}'"
        )
    
    collection_name = f"persona_{request.influencer_name.lower().replace(' ', '_')}"
    
    # --- Retrieve chat history from DB ---
    history_from_db = [{"role": msg.message_type.value, "content": msg.content} for msg in chat_session.messages]
    
    retrieved_context_snippets = []
    try:
        embeddings = OpenAIEmbeddings(model="text-embedding-3-large", openai_api_key=settings.OPENAI_API_KEY)
        vectorstore = Chroma(
            collection_name=collection_name,
            persist_directory="db",
            embedding_function=embeddings
        )

        retrieved_docs = vectorstore.similarity_search(request.user_query, k=3)  # Top 3 chunks
        retrieved_context_snippets = [doc.page_content for doc in retrieved_docs]
        print(f"Retrieved {len(retrieved_context_snippets)} context snippets from ChromaDB.")
        
        for i, doc in enumerate(retrieved_docs):
            if hasattr(doc, 'metadata') and doc.metadata:
                print(f"Context {i+1} metadata: {doc.metadata}")

    except Exception as e:
        print(f"Warning: Could not retrieve from ChromaDB. Proceeding without context. Error: {e}")
    
    # Construct system prompt incorporating persona and retrieved context
    if retrieved_context_snippets:
        system_prompt = (
            f"You are an AI assistant embodying this persona:\n\n{persona.description}\n\n"
            f"Base all your answers on the following retrieved context where possible."
            f"If the context doesn't fully answer the user's question, respond using the tone, "
            f"style, and personality of {persona.name}.\n\n"
            "--- Relevant Context ---\n"
            + "\n".join([f"Context {i+1}: {snippet}" for i, snippet in enumerate(retrieved_context_snippets)])
            + "\n--- End Context ---\n"
            "Instructions:\n"
            f"- Stay in character as {persona.name}\n"
            "- Answer primarily using the provided context\n"
            "- If context is insufficient, acknowledge it and extrapolate\n"
            "- Be conversational and engaging"
        )
    else:
        system_prompt = (
            f"You are an AI assistant embodying this persona:\n\n{persona.description}\n\n"
            f"Answer in the tone, style, and personality of {persona.name}, "
            "even if no contextual information is available."
        )
    
    # Combine system prompt, chat history and new user query
    full_chat_history = [{"role": "system", "content": system_prompt}]
    full_chat_history.extend(history_from_db)
    full_chat_history.append({"role": "user", "content": request.user_query})
    
    # Call the OpenAI chat completion API
    try:
        client = OpenAI(api_key=settings.OPENAI_API_KEY)

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=full_chat_history,
            temperature=0.7,
            max_tokens=1000,
        )
        ai_message = response.choices[0].message.content

    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        raise HTTPException(status_code=500, detail="Failed to get a response from the AI model.")
    
    # Save user message and AI response messages to DB
    user_message_db = Message(
        chat_session_id=chat_session.id,
        user_id=chat_session.user_id,
        message_type=MessageType.USER,
        content=request.user_query
    )
    ai_message_db = Message(
        chat_session_id=chat_session.id,
        user_id=chat_session.user_id,
        message_type=MessageType.ASSISTANT,
        content=ai_message
    )
    db.add(user_message_db)
    db.add(ai_message_db)
    db.commit()
    db.refresh(user_message_db)
    db.refresh(ai_message_db)

    # Return response with conversation id, AI reply, and retrieved context
    return ChatResponse(
        conversation_id=chat_session.id,
        ai_response=ai_message,
        retrieved_context=retrieved_context_snippets
    )