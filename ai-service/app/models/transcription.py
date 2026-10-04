from pydantic import BaseModel
from typing import List, Optional

class TranscriptionSegment(BaseModel):
    start: float
    end: float
    text: str

class TranscriptionResponse(BaseModel):
    success: bool
    transcript: str
    language: str
    durationSeconds: float
    segments: List[TranscriptionSegment]
    languageProbability: Optional[float] = None
