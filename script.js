from backend.routers import quiz, summary, upload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="DocuMind AI API",
    description="API Service untuk ekstraksi, ringkasan, dan pembuatan kuis dari dokumen.",
    version="1.0.0",
)

# Konfigurasi CORS agar frontend dapat berkomunikasi dengan backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Pada mode produksi, ganti dengan domain spesifik
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Menggabungkan Router
app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(summary.router, prefix="/api", tags=["Summary"])
app.include_router(quiz.router, prefix="/api", tags=["Quiz"])


@app.get("/")
def read_root():
  return {"message": "Welcome to DocuMind AI API"}


if __name__ == "__main__":
  import uvicorn

  uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
