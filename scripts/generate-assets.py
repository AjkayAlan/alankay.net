#!/usr/bin/env python3
"""Generate site assets for alankay.net.

Produces:
  public/portrait.jpg         — resized, web-optimized portrait for the hero
  public/favicon.svg          — scalable DNA-helix favicon
  public/favicon.ico          — multi-size ICO (16/32/48)
  public/apple-touch-icon.png — 180px Apple touch icon

Requires Pillow:  python3 -m pip install pillow
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
ASSETS = ROOT / "assets"  # source assets (not shipped)

# Design tokens (mirrors src/styles/global.css)
INK = "#15202B"
# Identity sequence: Personal, Professional, Background, Values (P·P·B·V)
COLORS = ["#2D9CDB", "#23A26D", "#E0675A", "#D9A521"]
# Helix geometry (in a 64-unit viewBox)
CX = 32.0
R = 22.0  # helix radius (wider = rungs span further across the tile)
TOP = 12.0
BOTTOM = 52.0
TURNS = 1.0  # one full turn: rungs land at uniform separation, not in the bulges


def helix_x(t: float, phase: float) -> float:
    """x position of one strand at normalized height t (0..1)."""
    return CX + R * math.cos(t * TURNS * 2 * math.pi + phase)


def helix_y(t: float) -> float:
    return TOP + (BOTTOM - TOP) * t


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
    """Draw the DNA-helix mark at the given square size."""
    scale = size / 64.0
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Rounded ink tile.
    radius = round(14 * scale)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=INK)

    # Two backbone strands (sampled as polylines).
    strand_a = []
    strand_b = []
    for i in range(33):
        t = i / 32.0
        strand_a.append((helix_x(t, 0.0) * scale, helix_y(t) * scale))
        strand_b.append((helix_x(t, math.pi) * scale, helix_y(t) * scale))
    d.line(strand_a, fill="#4E5E6E", width=max(1, round(1.2 * scale)), joint="curve")
    d.line(strand_b, fill="#4E5E6E", width=max(1, round(1.2 * scale)), joint="curve")

    # Four colored rungs (base pairs) at even heights.
    for i, color in enumerate(COLORS):
        t = (i + 0.5) / 4.0
        y = helix_y(t) * scale
        x1 = helix_x(t, 0.0) * scale
        x2 = helix_x(t, math.pi) * scale
        w = max(2, round(3.4 * scale))
        r = w / 2.0
        # Rounded rectangle: uniform thickness, rounded ends (cylinder).
        d.rounded_rectangle([min(x1, x2), y - r, max(x1, x2), y + r], radius=r, fill=color)

    img.save(out, fmt, **save_kwargs)
    print(f"wrote {out}")


def make_favicons() -> None:
    # Scalable SVG (preferred by modern browsers).
    svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">']
    svg.append('  <rect width="64" height="64" rx="14" fill="#15202B"/>')
    # Backbones as polylines.
    for phase in (0.0, math.pi):
        pts = " ".join(
            f"{helix_x(i / 32.0, phase):.2f},{helix_y(i / 32.0):.2f}"
            for i in range(33)
        )
        svg.append(f'  <polyline points="{pts}" fill="none" stroke="#4E5E6E" stroke-width="1.2" stroke-linejoin="round"/>')
    # Rungs.
    for i, color in enumerate(COLORS):
        t = (i + 0.5) / 4.0
        y = helix_y(t)
        x1 = helix_x(t, 0.0)
        x2 = helix_x(t, math.pi)
        svg.append(f'  <line x1="{x1:.2f}" y1="{y:.2f}" x2="{x2:.2f}" y2="{y:.2f}" stroke="{color}" stroke-width="3.4" stroke-linecap="round"/>')
    svg.append("</svg>\n")
    (PUBLIC / "favicon.svg").write_text("\n".join(svg), encoding="utf-8")
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
    strand_a = []
    strand_b = []
    for i in range(33):
        t = i / 32.0
        strand_a.append((helix_x(t, 0.0) * scale, helix_y(t) * scale))
        strand_b.append((helix_x(t, math.pi) * scale, helix_y(t) * scale))
    d.line(strand_a, fill="#4E5E6E", width=max(1, round(1.2 * scale)), joint="curve")
    d.line(strand_b, fill="#4E5E6E", width=max(1, round(1.2 * scale)), joint="curve")
    for i, color in enumerate(COLORS):
        t = (i + 0.5) / 4.0
        y = helix_y(t) * scale
        x1 = helix_x(t, 0.0) * scale
        x2 = helix_x(t, math.pi) * scale
        w = max(2, round(3.4 * scale))
        r = w / 2.0
        d.rounded_rectangle([min(x1, x2), y - r, max(x1, x2), y + r], radius=r, fill=color)
    return img


if __name__ == "__main__":
    make_portrait()
    make_favicons()
