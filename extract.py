import fitz  # PyMuPDF
import os

pdf_dir = r"C:\Users\NV\.gemini\antigravity\brain\5dd65414-8ea1-4566-993d-676d19dbfbc5"
out_dir = r"C:\Users\NV\.gemini\antigravity\scratch\ahmed_fadel_cv\assets"

os.makedirs(out_dir, exist_ok=True)

pdfs = [
    "media__1782805748687.pdf", # CV
    "media__1782805784113.pdf",
    "media__1782805804131.pdf",
    "media__1782805839460.pdf"
]

for pdf_name in pdfs:
    pdf_path = os.path.join(pdf_dir, pdf_name)
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        continue
    
    doc = fitz.open(pdf_path)
    print(f"Opened {pdf_name} with {len(doc)} pages")
    
    # Save the first page as PNG
    page = doc[0]
    pix = page.get_pixmap(dpi=150)
    out_name = pdf_name.replace(".pdf", ".png")
    out_path = os.path.join(out_dir, out_name)
    pix.save(out_path)
    print(f"Saved {out_path}")
    doc.close()
