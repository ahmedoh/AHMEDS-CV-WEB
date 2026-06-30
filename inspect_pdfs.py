import fitz
import os

pdf_dir = r"C:\Users\NV\.gemini\antigravity\brain\5dd65414-8ea1-4566-993d-676d19dbfbc5"
pdfs = [
    "media__1782805784113.pdf",
    "media__1782805804131.pdf",
    "media__1782805839460.pdf"
]

for pdf_name in pdfs:
    pdf_path = os.path.join(pdf_dir, pdf_name)
    doc = fitz.open(pdf_path)
    text = doc[0].get_text()
    print(f"--- {pdf_name} ---")
    print(text[:300].strip())
    doc.close()
