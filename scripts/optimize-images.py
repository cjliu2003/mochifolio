"""Export the source illustrations in art-source/ to web-sized WebP in public/assets/.

Run after adding or replacing an illustration: python3 scripts/optimize-images.py
Each image gets a full-size file and an 800px-wide file for srcset.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "art-source"
OUT = ROOT / "public" / "assets"
WIDTHS = {"": None, "-800": 800}

OUT.mkdir(parents=True, exist_ok=True)
for png in sorted(SRC.glob("*.png")):
    img = Image.open(png).convert("RGB")
    for suffix, width in WIDTHS.items():
        out = img if width is None else img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
        dest = OUT / f"{png.stem}{suffix}.webp"
        out.save(dest, "WEBP", quality=82, method=6)
        print(f"{dest.relative_to(ROOT)}  {out.width}x{out.height}  {dest.stat().st_size // 1024} KB")
