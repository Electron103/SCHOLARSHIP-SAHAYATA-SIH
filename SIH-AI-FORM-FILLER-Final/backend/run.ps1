# Activate virtual environment and run uvicorn
& .\.venv\Scripts\Activate.ps1
uvicorn main:app --reload
