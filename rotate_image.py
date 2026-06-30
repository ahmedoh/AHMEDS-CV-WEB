from PIL import Image
import os

img_path = r"C:\Users\NV\.gemini\antigravity\scratch\ahmed_fadel_cv\assets\cert_parasites.png"

if os.path.exists(img_path):
    with Image.open(img_path) as im:
        # Rotate 90 degrees clockwise (or counter-clockwise)
        # Let's rotate 90 degrees counter-clockwise or clockwise. In the screenshot, the text's top is on the left.
        # Rotating 90 degrees clockwise (Image.ROTATE_270 or Image.ROTATE_90)
        # If the top of the text is to the left, we need to rotate 90 degrees clockwise to make it top-up.
        rotated = im.transpose(Image.ROTATE_270) # ROTATE_270 is 90 degrees counter-clockwise? Let's check:
        # Image.ROTATE_90 is 90 degrees CCW, Image.ROTATE_180 is 180, Image.ROTATE_270 is 270 (90 degrees CW)
        # Actually, let's use rotated = im.rotate(-90, expand=True) or transpose(Image.ROTATE_270)
        rotated.save(img_path)
        print("Rotated cert_parasites.png 90 degrees clockwise")
else:
    print("File not found")
