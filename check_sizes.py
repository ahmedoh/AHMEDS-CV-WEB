import os
from PIL import Image

out_dir = r"C:\Users\NV\.gemini\antigravity\scratch\ahmed_fadel_cv\assets"
images = [
    "cert_parasites.png",
    "cert_stanford_food.png",
    "cert_ccna.png",
    "cert_hourofcode_minecraft.jpg",
    "cert_hourofcode_codeorg.jpg"
]

for img_name in images:
    img_path = os.path.join(out_dir, img_name)
    if os.path.exists(img_path):
        with Image.open(img_path) as im:
            print(f"{img_name}: format={im.format}, size={im.size}")
    else:
        print(f"Not found: {img_name}")
