import fitz
import os

pdf_path = r"C:\Users\NV\.gemini\antigravity\brain\5dd65414-8ea1-4566-993d-676d19dbfbc5\media__1782805748687.pdf"
out_dir = r"C:\Users\NV\.gemini\antigravity\scratch\ahmed_fadel_cv\assets"

doc = fitz.open(pdf_path)
page = doc[0]
image_list = page.get_images(full=True)

print(f"Number of images on page: {len(image_list)}")
for img_idx, img in enumerate(image_list):
    xref = img[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image["image"]
    image_ext = base_image["ext"]
    print(f"Image {img_idx}: xref={xref}, ext={image_ext}, size={len(image_bytes)} bytes")
    out_name = f"extracted_avatar.{image_ext}"
    with open(os.path.join(out_dir, out_name), "wb") as f:
        f.write(image_bytes)
    print(f"Saved raw image to {out_name}")
doc.close()
