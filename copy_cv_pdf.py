import os
import shutil

pdf_path = r"C:\Users\NV\.gemini\antigravity\brain\5dd65414-8ea1-4566-993d-676d19dbfbc5\media__1782805748687.pdf"
dst_path = r"C:\Users\NV\.gemini\antigravity\scratch\ahmed_fadel_cv\assets\ahmed_fadel_cv.pdf"

if os.path.exists(pdf_path):
    shutil.copy2(pdf_path, dst_path)
    print("Copied CV PDF to assets/ahmed_fadel_cv.pdf")
else:
    print("CV PDF not found in brain directory")
