#!/usr/bin/env python3
"""Generate site assets for alankay.net.

Produces:
  public/portrait.jpg         — resized, web-optimized portrait for the hero
  public/favicon.svg          — scalable "four tracks" favicon
  public/favicon.ico          — multi-size ICO (16/32/48)
  public/apple-touch-icon.png — 180px Apple touch icon

Requires Pillow:  python3 -m pip install pillow
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
ASSETS = ROOT / "assets"  # source assets (not shipped)

# Design tokens (mirrors src/styles/global.css)
INK = "#15202B"
COLORS = ["#2D9CDB", "#D9A521", "#23A26D", "#E0675A"]  # hockey, band, computers, parents
FRACTIONS = [0.78, 0.62, 0.46, 0.30]  # relative bar heights (echoes hero EQ)


def make_portrait() -> None:
    src = ASSETS / "portrait.jpg"
    dst = PUBLIC / "portrait.jpg"
    with Image.open(src) as im:
        im = im.convert("RGB")
        # Honor EXIF orientation, then downscale to a sensible hero size.
        from PIL import ImageOps

        im = ImageOps.exif_transpose(im)
        target_w = 900
        if im.width > target_w:
            im = im.resize(
                (target_w, round(im.height * target_w / im.width)), Image.LANCZOS
            )
        im.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"wrote {dst} ({dst.stat().st_size // 1024} KB)")


def draw_favicon(size: int, out: Path, fmt: str, **save_kwargs) -> None:
    """Draw the four-bar 'four tracks' mark at the given square size."""
    scale = size / 64.0
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Rounded ink tile.
    radius = round(14 * scale)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=INK)

    # Four bars, centered vertically.
    bar_w = round(7 * scale)
    gap = round(4 * scale)
    total_w = 4 * bar_w + 3 * gap
    left = round((size - total_w) / 2)
    max_h = round(40 * scale)

    for i, (color, frac) in enumerate(zip(COLORS, FRACTIONS)):
        h = max(round(max_h * frac), 2)
        x0 = left + i * (bar_w + gap)
        y0 = round((size - h) / 2)
        r = min(bar_w // 2, h // 2)
        d.rounded_rectangle([x0, y0, x0 + bar_w - 1, y0 + h - 1], radius=r, fill=color)

    img.save(out, fmt, **save_kwargs)
    print(f"wrote {out}")


def make_favicons() -> None:
    # Scalable SVG (preferred by modern browsers).
    svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n'
    svg += '  <rect width="64" height="64" rx="14" fill="#15202B"/>\n'
    bar_w, gap, left, max_h = 7, 4, 12, 40
    for i, (color, frac) in enumerate(zip(COLORS, FRACTIONS)):
        h = max(round(max_h * frac), 2)
        x = left + i * (bar_w + gap)
        y = round((64 - h) / 2)
        svg += (
            f'  <rect x="{x}" y="{y}" width="{bar_w}" height="{h}" '
            f'rx="{min(bar_w, h) // 2}" fill="{color}"/>\n'
        )
    svg += "</svg>\n"
    (PUBLIC / "favicon.svg").write_text(svg, encoding="utf-8")
    print("wrote public/favicon.svg")

    # Multi-size ICO. Pillow's ICO saver gates allowed sizes on the *base*
    # image's dimensions, so the largest frame must be the base and the
    # smaller frames passed via append_images.
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    frames = [draw_frame(s) for s in (16, 32, 48)]
    frames[-1].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=ico_sizes,
        append_images=frames[:-1],
    )
    print("wrote public/favicon.ico")

    # Apple touch icon (180px, opaque ink background).
    draw_favicon(180, PUBLIC / "apple-touch-icon.png", "PNG")


def draw_frame(size: int) -> Image.Image:
    """Return a rendered frame (used to assemble the ICO)."""
    scale = size / 64.0
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    radius = round(14 * scale)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=INK)
    bar_w = round(7 * scale)
    gap = round(4 * scale)
    left = round((size - (4 * bar_w + 3 * gap)) / 2)
    max_h = round(40 * scale)
    for i, (color, frac) in enumerate(zip(COLORS, FRACTIONS)):
        h = max(round(max_h * frac), 2)
        x0 = left + i * (bar_w + gap)
        y0 = round((size - h) / 2)
        r = min(bar_w // 2, h // 2)
        d.rounded_rectangle([x0, y0, x0 + bar_w - 1, y0 + h - 1], radius=r, fill=color)
    return img


if __name__ == "__main__":
    make_portrait()
    make_favicons()
