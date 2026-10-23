from backend.routers.upload import documents_db
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class QuizRequest(BaseModel):
  document_id: str
  num_questions: int = 3


@router.post("/generate-quiz")
async def generate_quiz(req: QuizRequest):
  if req.document_id not in documents_db:
    raise HTTPException(
        status_code=404, detail="Dokumen tidak ditemukan atau telah kadaluwarsa."
    )

  # Integrasikan dengan LLM untuk generate soal secara dinamis di sini
  return {
      "questions": [
          {
              "question": (
                  "Apa format file yang didukung oleh platform DocuMind AI?"
              ),
              "options": [
                  {"option_id": "A", "option_text": "PDF dan TXT"},
                  {"option_id": "B", "option_text": "MP3 dan MP4"},
                  {"option_id": "C", "option_text": "PNG dan JPG"},
                  {"option_id": "D", "option_text": "ZIP dan RAR"},
              ],
              "correct_option_id": "A",
          },
          {
              "question": (
                  "Fitur utama apa yang disediakan oleh platform DocuMind AI?"
              ),
              "options": [
                  {"option_id": "A", "option_text": "Edit Video secara Online"},
                  {
                      "option_id": "B",
                      "option_text": "Ringkasan Dokumen & Kuis Interaktif",
                  },
                  {
                      "option_id": "C",
                      "option_text": "Manajemen Database Relasional",
                  },
                  {"option_id": "D", "option_text": "Desain Vektor Grafis"},
              ],
              "correct_option_id": "B",
          },
      ]
  }
