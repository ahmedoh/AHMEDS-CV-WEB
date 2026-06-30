import os
import shutil

assets_dir = r"C:\Users\NV\AppData\Local\Temp" # Wait, the assets are in our scratch/ahmed_fadel_cv/assets folder
assets_dir = r"C:\Users\NV\.gemini\antigravity\scratch\ahmed_fadel_cv\assets"

mapping = {
    "extracted_avatar.png": "avatar.png",
    "media__1782805784113.png": "cert_aha.png",
    "media__1782805804131.png": "cert_fifa.png",
    "media__1782805839460.png": "cert_mos.png"
}

for src, dst in mapping.items():
    src_path = os.path.join(assets_dir, src)
    dst_path = os.path.join(assets_dir, dst)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied {src} to {dst}")
    else:
        print(f"Source not found: {src_path}")
