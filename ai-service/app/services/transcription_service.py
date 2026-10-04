import os
import tempfile
import logging
from typing import Tuple, List
from faster_whisper import WhisperModel
from app.config import settings
from app.models.transcription import TranscriptionResponse, TranscriptionSegment

logger = logging.getLogger("fluentai.transcription")

class TranscriptionService:
    def __init__(self):
        self._model = None

    def _get_model(self) -> WhisperModel:
        if self._model is None:
            logger.info(f"Loading faster-whisper model: {settings.WHISPER_MODEL} (device={settings.WHISPER_DEVICE}, compute_type={settings.WHISPER_COMPUTE_TYPE})")
            self._model = WhisperModel(
                settings.WHISPER_MODEL,
                device=settings.WHISPER_DEVICE,
                compute_type=settings.WHISPER_COMPUTE_TYPE
            )
        return self._model

    def transcribe_file_bytes(self, audio_bytes: bytes, filename: str = "audio.webm") -> TranscriptionResponse:
        suffix = ".webm"
        clean_filename = filename.lower()
        if clean_filename.endswith(".wav"):
            suffix = ".wav"
        elif clean_filename.endswith(".mp3"):
            suffix = ".mp3"
        elif clean_filename.endswith(".m4a"):
            suffix = ".m4a"
        elif clean_filename.endswith(".ogg"):
            suffix = ".ogg"

        # Create temporary file for processing
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
            tmp_file.write(audio_bytes)
            tmp_path = tmp_file.name

        try:
            model = self._get_model()
            segments_gen, info = model.transcribe(tmp_path, beam_size=5)

            formatted_segments: List[TranscriptionSegment] = []
            full_transcript_parts: List[str] = []

            for segment in segments_gen:
                text_clean = segment.text.strip()
                if text_clean:
                    formatted_segments.append(TranscriptionSegment(
                        start=round(float(segment.start), 2),
                        end=round(float(segment.end), 2),
                        text=text_clean
                    ))
                    full_transcript_parts.append(text_clean)

            full_transcript = " ".join(full_transcript_parts)
            duration_seconds = round(float(info.duration), 2) if hasattr(info, 'duration') and info.duration else (
                formatted_segments[-1].end if formatted_segments else 0.0
            )

            return TranscriptionResponse(
                success=True,
                transcript=full_transcript,
                language=info.language if hasattr(info, 'language') else 'en',
                durationSeconds=duration_seconds,
                segments=formatted_segments,
                languageProbability=round(float(info.language_probability), 4) if hasattr(info, 'language_probability') else None
            )

        finally:
            if os.path.exists(tmp_path):
                try:
                    os.remove(tmp_path)
                except Exception as e:
                    logger.warning(f"Failed to remove temporary file {tmp_path}: {e}")

transcription_service = TranscriptionService()
