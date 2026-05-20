from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv

import requests
import os
import fitz
import docx
from pptx import Presentation

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

API_URL = "https://openrouter.ai/api/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}


@app.route("/")
def home():
    return render_template("index.html")


# PDF Extraction
def extract_pdf_text(file):
    text = ""
    pdf = fitz.open(stream=file.read(), filetype="pdf")

    for page in pdf:
        text += page.get_text()

    return text


# DOCX Extraction
def extract_docx_text(file):
    doc = docx.Document(file)
    text = ""

    for para in doc.paragraphs:
        text += para.text + "\n"

    return text


# PPTX Extraction
def extract_pptx_text(file):
    prs = Presentation(file)
    text = ""

    for slide in prs.slides:
        for shape in slide.shapes:
            if hasattr(shape, "text"):
                text += shape.text + "\n"

    return text


@app.route("/summarize", methods=["POST"])
def summarize():

    try:

        text = ""

        # FILE MODE
        if "file" in request.files:

            file = request.files["file"]
            filename = file.filename.lower()

            if filename.endswith(".pdf"):
                text = extract_pdf_text(file)

            elif filename.endswith(".docx"):
                text = extract_docx_text(file)

            elif filename.endswith(".pptx"):
                text = extract_pptx_text(file)

            else:
                return jsonify({
                    "summary": "Unsupported file format"
                })

        # TEXT MODE
        else:
            data = request.json
            text = data.get("notes", "")

        prompt = f"""
        You are an advanced AI learning assistant.

        Analyze the provided study material carefully.

        Generate:

        1. Professional Summary
        2. Important Bullet Points
        3. Key Concepts
        4. Student Friendly Explanation
        5. Exam Preparation Notes

        Study Material:

        {text}
        """

        response = requests.post(
            API_URL,
            headers=headers,
            json={
                "model": "openai/gpt-4.1-mini",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            }
        )

        result = response.json()

        print(result)

        summary = result["choices"][0]["message"]["content"]

        return jsonify({
            "summary": summary
        })

    except Exception as e:
        return jsonify({
            "summary": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)