# Summarify AI

An AI study assistant that turns lecture slides, documents, and raw notes into clear study material.
Upload a **PDF, Word, or PowerPoint** file (or paste your notes) and get a structured summary in seconds.

**Live demo:** https://summarify-ai-two.vercel.app

## What it does

Give it study material and it returns five sections:

1. **Professional summary**
2. **Important bullet points**
3. **Key concepts**
4. **Easy student explanation**
5. **Exam preparation notes**

## Features

- Upload **.pdf**, **.docx**, or **.pptx** files
- Or type / paste notes directly, or combine a file with extra notes
- Text is extracted from the file on the server (PyMuPDF, python-docx, python-pptx)
- AI summary generated through the [OpenRouter](https://openrouter.ai) API
- Friendly messages for empty input and unsupported file types
- Ready to deploy on **Vercel** (`vercel.json` included)

## Tech stack

| Part | Technology |
|------|------------|
| Backend | Python, Flask, Flask-CORS |
| File parsing | PyMuPDF (PDF), python-docx (Word), python-pptx (PowerPoint) |
| AI | OpenRouter API (`openai/gpt-4.1-mini`) |
| Frontend | HTML, CSS, JavaScript (`templates/`, `static/`) |
| Hosting | Vercel (gunicorn for production) |

## Project structure

```
summarify-ai/
├── app.py              # Flask app: routes, file extraction, AI request
├── requirements.txt    # Python dependencies
├── vercel.json         # Vercel deployment config
├── templates/
│   └── index.html      # Web page
└── static/             # CSS / JS / assets
```

## Run it locally

1. **Clone the repo**
   ```
   git clone https://github.com/Rohma05/summarifyAI.git
   cd summarifyAI
   ```
2. **Install the dependencies**
   ```
   pip install -r requirements.txt
   ```
3. **Add your API key.** Create a file named `.env` in the project folder:
   ```
   OPENROUTER_API_KEY=your_key_here
   ```
   Get a free key at [openrouter.ai](https://openrouter.ai). Never commit this file.
4. **Start the app**
   ```
   python app.py
   ```
5. Open **http://127.0.0.1:5000** in your browser.

## API

`POST /summarize` (multipart form data)

| Field | Type | Description |
|-------|------|-------------|
| `file` | file (optional) | A `.pdf`, `.docx`, or `.pptx` document |
| `notes` | text (optional) | Extra notes or pasted text |

At least one of the two is required. The response is JSON:

```json
{ "summary": "…generated study material…" }
```

## Deploying to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. In **Project Settings, Environment Variables**, add `OPENROUTER_API_KEY`.
4. Deploy.

## Notes and limitations

- Only the first **12,000 characters** of the material are sent to the AI, so very long documents are shortened.
- Scanned PDFs (images of text) have no extractable text, so they need OCR first.
- Run with `debug=True` only on your own machine, never in production.

## Author

**Rohma**, [@Rohma05](https://github.com/Rohma05)
