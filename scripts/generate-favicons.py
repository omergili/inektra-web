#!/usr/bin/env python3
"""
Generiert Favicon-Set fuer inektra.de
Design: Hero-Dark Hintergrund, weisser i-Strich, oranger Rechteck-Punkt
Exakt wie im inektra-Logo: i-Punkt = kurzes Rechteck (kein Kreis!)
"""

from PIL import Image, ImageDraw
import os

# Brand Colors
HERO_DARK = (15, 23, 42)      # slate-900: #0f172a
WHITE = (255, 255, 255)
ORANGE = (234, 88, 12)         # accent-500: #ea580c
TRANSPARENT = (0, 0, 0, 0)

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')


def create_favicon(size=512):
    """Erstellt Favicon geometrisch – passend zum inektra Logo.

    Logo-Analyse:
    - i-Strich: schmaler vertikaler Balken, serifenlos
    - i-Punkt: kurzes Rechteck (KEIN Kreis), gleiche Breite wie Strich
    - Abstand zwischen Punkt und Strich: ca. 15% der Strichbreite
    """
    img = Image.new('RGBA', (size, size), TRANSPARENT)
    draw = ImageDraw.Draw(img)

    # Abgerundeter Hintergrund
    radius = int(size * 0.18)
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (size - 1, size - 1)],
                                 radius=radius, fill=255)
    draw.rounded_rectangle([(0, 0), (size - 1, size - 1)],
                            radius=radius, fill=HERO_DARK)

    cx = size // 2

    # Proportionen aus dem Logo abgeleitet
    bar_w = int(size * 0.16)       # Strich-Breite
    bar_top = int(size * 0.38)     # Strich Anfang
    bar_bottom = int(size * 0.80)  # Strich Ende

    # i-Punkt: Rechteck, gleiche Breite wie Strich, Hoehe ~60% der Breite
    dot_w = bar_w
    dot_h = int(bar_w * 0.60)
    dot_top = int(size * 0.20)
    dot_bottom = dot_top + dot_h

    # Strich (weiss)
    draw.rectangle(
        [(cx - bar_w // 2, bar_top),
         (cx + bar_w // 2, bar_bottom)],
        fill=WHITE
    )

    # Punkt (orange, Rechteck wie im Logo)
    draw.rectangle(
        [(cx - dot_w // 2, dot_top),
         (cx + dot_w // 2, dot_bottom)],
        fill=ORANGE
    )

    img.putalpha(mask)
    return img


def create_favicon_small(size):
    """Pixel-perfekte kleine Favicons"""
    if size >= 64:
        base = create_favicon(512)
        return base.resize((size, size), Image.Resampling.LANCZOS)

    img = Image.new('RGBA', (size, size), TRANSPARENT)
    draw = ImageDraw.Draw(img)
    radius = max(2, int(size * 0.18))
    draw.rounded_rectangle([(0, 0), (size - 1, size - 1)],
                            radius=radius, fill=HERO_DARK)

    cx = size // 2

    if size == 16:
        # 16x16: 2px breit
        bx = cx - 1
        draw.rectangle([(bx, 6), (bx + 1, 13)], fill=WHITE)   # Strich
        draw.rectangle([(bx, 3), (bx + 1, 4)], fill=ORANGE)    # Punkt

    elif size == 32:
        # 32x32: 4px breit
        bx = cx - 2
        draw.rectangle([(bx, 12), (bx + 3, 27)], fill=WHITE)   # Strich
        draw.rectangle([(bx, 6), (bx + 3, 9)], fill=ORANGE)    # Punkt

    elif size == 48:
        # 48x48: 7px breit
        bx = cx - 3
        draw.rectangle([(bx, 18), (bx + 6, 40)], fill=WHITE)   # Strich
        draw.rectangle([(bx, 10), (bx + 6, 14)], fill=ORANGE)  # Punkt

    return img


def create_svg():
    """SVG-Favicon"""
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="92" fill="#0f172a"/>
  <rect x="215" y="195" width="82" height="310" fill="white"/>
  <rect x="215" y="102" width="82" height="50" fill="#ea580c"/>
</svg>'''


def main():
    print("Generiere inektra.de Favicon-Set...")
    print("  Design: i-Punkt = Rechteck (wie im Logo)")
    print()

    # SVG
    with open(os.path.join(PUBLIC_DIR, 'icon.svg'), 'w') as f:
        f.write(create_svg())
    print("  [OK] icon.svg")

    # Kleine Groessen (pixel-perfekt)
    for s in [16, 32, 48]:
        create_favicon_small(s).save(
            os.path.join(PUBLIC_DIR, f'favicon-{s}x{s}.png'), 'PNG')
        print(f"  [OK] favicon-{s}x{s}.png")

    # ICO (Multi-Size)
    i16 = create_favicon_small(16)
    i32 = create_favicon_small(32)
    i48 = create_favicon_small(48)
    i32.save(os.path.join(PUBLIC_DIR, 'favicon.ico'),
             format='ICO', sizes=[(16, 16), (32, 32), (48, 48)],
             append_images=[i16, i48])
    print("  [OK] favicon.ico (16+32+48)")

    # Grosse Groessen
    base = create_favicon(512)
    base.resize((180, 180), Image.Resampling.LANCZOS).save(
        os.path.join(PUBLIC_DIR, 'apple-touch-icon.png'), 'PNG')
    print("  [OK] apple-touch-icon.png (180x180)")

    for s in [192, 512]:
        img = base if s == 512 else base.resize((s, s), Image.Resampling.LANCZOS)
        img.save(os.path.join(PUBLIC_DIR, f'icon-{s}x{s}.png'), 'PNG')
        print(f"  [OK] icon-{s}x{s}.png")

    # Manifest
    with open(os.path.join(PUBLIC_DIR, 'site.webmanifest'), 'w') as f:
        f.write('{\n  "name": "inektra GmbH - Kalibrierservice",\n'
                '  "short_name": "inektra",\n  "icons": [\n'
                '    {"src": "/icon-192x192.png", "sizes": "192x192", "type": "image/png"},\n'
                '    {"src": "/icon-512x512.png", "sizes": "512x512", "type": "image/png"}\n'
                '  ],\n  "theme_color": "#0f172a",\n'
                '  "background_color": "#ffffff",\n  "display": "standalone"\n}')
    print("  [OK] site.webmanifest")

    print("\nFertig!")


if __name__ == '__main__':
    main()
