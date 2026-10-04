import logging
from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.models.transcription import TranscriptionResponse
from app.services.transcription_service import transcription_service

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("fluentai.ai_main")

app = FastAPI(
    title="FluentAI AI Processing Microservice",
    description="Speech-to-text transcription engine powered by faster-whisper",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {
        "status": "ok",
        "service": "fluentai-ai",
        "transcription": True,
        "model": settings.WHISPER_MODEL,
        "device": settings.WHISPER_DEVICE
    }

@app.post("/api/v1/transcribe", response_model=TranscriptionResponse, status_code=status.HTTP_200_OK)
async def transcribe_audio(audio: UploadFile = File(...)):
    if not audio:
        raise HTTPException(status_code=400, detail="Missing required audio file parameter")

    logger.info(f"[AI TRANSCRIPTION] Processing uploaded file: filename='{audio.filename}', content_type='{audio.content_type}'")

    try:
        content = await audio.read()
        if not content or len(content) == 0:
            raise HTTPException(status_code=400, detail="Uploaded audio file payload is empty")

        logger.info(f"[AI TRANSCRIPTION] Audio stream loaded: {len(content)} bytes ({(len(content)/1024):.2f} KB)")
        result = transcription_service.transcribe_file_bytes(content, audio.filename or "recording.webm")
        
        logger.info(f"[AI TRANSCRIPTION SUCCESS] Language='{result.language}', Duration={result.durationSeconds}s, Transcript length={len(result.transcript)}")
        return result

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"[AI TRANSCRIPTION ERROR] Failed processing '{audio.filename}': {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Speech transcription processing failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
