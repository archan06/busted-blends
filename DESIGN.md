---
name: Busted Blends
description: A loud red-and-black student barber site. The hero is a tunnel of his real cuts flying at the camera as you scroll, then the cuts, what he cuts, and an easy way to book.
colors:
  ink: "#0b0b0c"
  red: "#d4141c"
  red-dark: "#8f0b10"
  red-glow: "#2a0406"
  red-text: "#ff5a52"
  paper: "#f2ede6"
  paper-ink: "#1a1716"
  paper-muted: "#5c5550"
  on-red: "#fff6f0"
  on-ink: "#f2ede6"
  on-ink-muted: "#b4aca6"
  rule: "#26262a"
  rule-dash: "#3a3a40"
  frame-fill: "#2a2627"
typography:
  display:
    fontFamily: "Big Shoulders Display, Archivo, sans-serif"
    fontSize: "clamp(4.5rem, 14vw, 13rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Big Shoulders Display, Archivo, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
  row:
    fontFamily: "Big Shoulders Display, Archivo, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 0.95
  card-title:
    fontFamily: "Big Shoulders Display, Archivo, sans-serif"
    fontSize: "clamp(2.4rem, 4vw, 3.4rem)"
    fontWeight: 900
    lineHeight: 0.9
  button:
    fontFamily: "Big Shoulders Display, Archivo, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 900
    lineHeight: 1
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)"
    fontWeight: 500
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  nav:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  focus: "4px"
  button: "6px"
  row: "8px"
  frame: "10px"
  panel: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(80px, 12vh, 140px)"
  section-head: "clamp(36px, 6vh, 64px)"
  grid-gap: "clamp(12px, 1.8vw, 24px)"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "14px 26px 12px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.red-dark}"
    textColor: "{colors.on-red}"
  link-text:
    textColor: "{colors.on-ink}"
    height: "44px"
  link-text-hover:
    textColor: "{colors.red-text}"
  nav-glass:
    textColor: "{colors.on-ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "6px"
  nav-link:
    textColor: "{colors.on-ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  nav-book:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  nav-book-hover:
    backgroundColor: "{colors.red-dark}"
  tunnel-card:
    backgroundColor: "{colors.frame-fill}"
    rounded: "{rounded.frame}"
    width: "clamp(120px, 16vw, 230px)"
  cut-card:
    backgroundColor: "{colors.frame-fill}"
    rounded: "{rounded.frame}"
  cut-open:
    textColor: "{colors.on-ink}"
    typography: "{typography.card-title}"
    rounded: "{rounded.frame}"
    padding: "24px 12px"
  service-row:
    textColor: "{colors.on-ink}"
    typography: "{typography.row}"
    padding: "clamp(20px, 3vh, 32px) 0"
  service-row-hover:
    textColor: "{colors.red}"
  contact-panel:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    rounded: "{rounded.panel}"
    padding: "clamp(22px, 3vw, 32px)"
  contact-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.row}"
    padding: "12px 16px"
    height: "60px"
  contact-row-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: Busted Blends

## Overview

**Creative North Star: "The Tunnel Of Cuts"**

A plain, confident barber site on a near-black ground with a deep red glow at its centre. The hero is the one theatrical moment: his real cut photos hang as rounded cards on a golden-angle spiral receding into the dark, and scrolling pulls the camera through them. Cards fade up out of the depth and fade away just before they would hit the lens. The name sits dead centre over a dark wash, huge and stamped, BUSTED in paper and BLENDS in red.

After the hero the page settles into a normal barber site: a plain grid of the same cuts, a list of what gets cut in big display rows, and a red panel of paper contact rows. Density is low and the type is big. The photos are the only imagery; there is no illustration. Glass is reserved for the one floating thing, the nav pill; red panels and paper rows are the material for things you act on. Motion is short and tied to scroll or hover, and reduced motion shows one still arrangement of the tunnel with no tall scroll.

**Key Characteristics:**
- Near-black ground with a red radial glow at the centre of the hero; red is the only hue.
- The real cut photos are the world: 4:5 cards with 10px corners, in 3D in the hero and flat in the grid. No filters.
- Condensed 900-weight uppercase display (Big Shoulders Display) over plain Archivo.
- One glass surface: the fixed frosted nav pill.
- Depth by perspective and soft downward shadow, never by hard offsets.

## Colors

Black ground, one red family, warm paper.

### Primary
- **Sign Red** (red): fills and large type. The Book button (hero and nav), the contact panel, BLENDS in the title, the second B of the mark, the focus ring, the selection highlight, the scrollbar thumb, service-row hover and the open card's hover outline.
- **Ember Red** (red-dark): the hovered state of every red fill.
- **Red Text** (red-text): the red for small text on black (about 6:1). Hover colour of the text link and the open card's "Book a cut" line.

### Secondary
- **Hero Glow** (red-glow): the centre of the tunnel stage's radial gradient (ellipse 60% 55% at the centre, fading to ink by 75%). It is what the photo cards emerge from.

### Neutral
- **Ink** (ink): page ground, theme colour, hover fill of contact rows, and the base of the hero's dark wash.
- **Paper** (paper): the BUSTED half of the title and the contact rows. Same value as on-ink, which is all text on dark ground.
- **Paper Ink** (paper-ink) and **Paper Grey** (paper-muted): label and value text on paper rows.
- **Warm White on Red** (on-red): all text on Sign Red fills; the focus ring inside the contact panel.
- **Ash** (on-ink-muted): secondary copy on dark (section intros, service descriptions, footer, the Scroll cue).
- **Rule** (rule): 1px lines between sections, between service rows and above the footer.
- **Empty Frame Dash** (rule-dash): the 2px dashed outline of the "Your cut goes here" card.
- **Frame Fill** (frame-fill): the warm near-black behind every photo frame while it loads.

### Named Rules
**The Two Reds For Text Rule.** Sign Red sets large type only (BLENDS, the mark, service rows on hover, all at least 20px bold). Any red text smaller than that on black uses Red Text.

**The Paper On Red Rule.** Text on a Sign Red fill is always Warm White on Red. Pressable rows on a red panel are paper with Paper Ink text, never red on red.

## Typography

**Display Font:** Big Shoulders Display 900 (with Archivo, sans-serif)
**Body Font:** Archivo 400/500/700 (with system-ui, sans-serif)

**Character:** Big Shoulders is the stamped, condensed signage; Archivo is the plain small print that gets out of the way.

### Hierarchy
- **Display** (900, clamp(4.5rem, 14vw, 13rem), 0.84, -0.01em, uppercase): the hero title only, centred; 23vw under 520px. Carries a dark text-shadow so it reads over photos passing behind it.
- **Headline** (900, clamp(3rem, 7vw, 6rem), 0.9, uppercase, balanced): section titles.
- **Row** (900, clamp(2.2rem, 5vw, 4.25rem), 0.95, uppercase): each service name in the "What I cut" list.
- **Card Title** (900, clamp(2.4rem, 4vw, 3.4rem), 0.9, uppercase): "Your cut goes here" in the open card.
- **Button** (900, 1.6rem, 1, uppercase): the Book a cut button; the contact panel head uses it at 1.5rem.
- **Lede** (500, clamp(1.1rem, 1.6vw, 1.3rem), max 34ch): the line under the title, with a dark text-shadow.
- **Body** (400, 1rem to 1.1rem, 1.55, max 38 to 42ch): section copy, usually in Ash.
- **Nav** (700, 0.85rem, 0.08em, uppercase): nav pill links. The mark is display 900 at 1.25rem, 0.02em. The Scroll cue is Archivo 700 at 0.8rem, 0.14em, uppercase, in Ash.

### Named Rules
**The One Display Weight Rule.** Display type is Big Shoulders at 900, uppercase, every time. Hierarchy comes from size, never from a lighter cut.

## Layout

Full-width bands with a side gutter of clamp(16px, 4vw, 56px); sections take clamp(80px, 12vh, 140px) of vertical padding and are separated by a 1px Rule line. Section heads put the headline left and a short Ash paragraph right, bottom-aligned, wrapping as needed, with clamp(36px, 6vh, 64px) below.

The hero is a 400vh section holding a sticky stage 100svh tall (min 560px) that clips its contents. The title block is centred both ways inside it; the Scroll cue sits 28px from the bottom. With reduced motion the section collapses to the stage's height and the cards hold one still arrangement; without JavaScript it collapses the same way and shows no cards and no Scroll cue.

Cuts: a grid of 4 columns, 3 at 1100px, 2 at 860px, gap clamp(12px, 1.8vw, 24px), the dashed open card in the last cell. Services are two equal columns (name, description), one column at 860px. Book is copy left and the red panel right (max 440px), stacking at 860px with the panel at max 480px. Under 520px the nav drops the Services link.

## Elevation & Depth

Depth comes from real perspective in the hero and soft black drop shadows elsewhere. The tunnel stage has a 900px perspective centred on the viewport; cards sit on a golden-angle spiral (radius 0.42 of the larger viewport side, each card's ring between 0.62 and 1, vertical squash 0.8) spaced 420px apart in depth, and scroll moves them toward the camera. A card fades in over its last 1600px of approach out of the dark and fades out over the 220px before it would pass the lens. Shadows always fall downward and are blurred; there is no hard offset shadow anywhere.

### Shadow Vocabulary
- **Object on dark** (`box-shadow: 0 12px 28px rgba(0,0,0,.5)`): the Book button.
- **Card in the tunnel** (`box-shadow: 0 20px 40px rgba(0,0,0,.55)`): each hero photo card.
- **Panel on dark** (`box-shadow: 0 30px 60px rgba(0,0,0,.5)`): the red contact panel.
- **Glass** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(255,255,255,.06), 0 10px 30px rgba(0,0,0,.35)`): the nav pill.
- **Title lift** (`text-shadow: 0 6px 30px rgba(0,0,0,.75)`; lede and text link `0 2px 14px rgba(0,0,0,.9)`): hero copy only, over a dark radial wash (ink at .85 to .55 to transparent), so it reads while photos pass behind.

### Named Rules
**The Copy Floats Over The Tunnel Rule.** Hero copy never gets a box. It reads over moving photos through the dark wash and text-shadows alone.

**The Refraction Is A Bonus Rule.** The liquid displacement filter (#liquid) runs only in Chromium. The glass nav must read as finished with blur, saturate, a 1px white edge and an inset highlight alone, because it also floats over flat black once the hero is past.

## Shapes

Rounded but tight on objects, fully round on the nav: 4px focus rings, 6px button, 8px contact rows, 10px photo frames (tunnel cards, grid cuts, the open card), 20px contact panel, 999px for the nav pill, its links and its highlight. Photo frames clip their images so the hover zoom stays inside the corners. The glass edge is a 1px white line at 14% alpha. The only dashed line is the open card's 2px outline.

## Components

### Primary Button (Book a cut)
Red, heavy, the one action in the hero.
- **Shape:** 6px radius, 56px minimum height, 14px 26px 12px padding, Button type with a down-arrow icon.
- **Hover:** fills Ember Red (0.2s). **Active:** scales to 0.97 (0.12s).
- **Focus:** 3px Sign Red outline, 3px offset.

### Text Link (See the cuts)
Archivo 700, paper, always underlined (2px, 0.25em offset), 44px tall. Hover turns it Red Text.

### Navigation (liquid glass pill)
Fixed, 14px from the top, centred. A 999px pill of rgba(24,22,24,.28) with blur(14px) saturate(180%), a 1px white edge and the Glass shadow; in Chromium the blur drops to 3px and the backdrop refracts through the #liquid displacement filter. Contents: the BB mark (second B in Sign Red), Cuts, Services, an Instagram icon, and a Sign Red Book link that darkens to Ember Red on hover. A translucent white highlight (rgba(255,255,255,.12) with an inset top line) slides under the hovered link (0.35s ease-out) and fades out when the pointer leaves the nav; it skips the Book link.

### Perspective Tunnel (signature)
The hero. 21 cards (the 7 cuts three times), each a 4:5 photo at clamp(120px, 16vw, 230px) wide in a 10px frame with the Card-in-the-tunnel shadow, placed and moved as described in Elevation & Depth. Cards are decorative (hidden from assistive tech); the grid below carries the photos' alt text. Reduced motion places one still arrangement and removes the tall scroll.

### Cut Card
- **Frame:** 10px radius, clips the photo, Frame Fill while loading, no shadow and no caption.
- **Photo:** 4:5, object-fit cover, per-photo focal point. On a fine pointer the image zooms to 1.04 over 0.6s.

### Open Cut Card ("Your cut goes here")
Same 4:5 footprint as a cut, transparent, 2px Empty Frame Dash outline at 10px. "Your cut goes here" in Card Title type with a Red Text "Book a cut" line and down arrow. Hover turns the outline Sign Red. Links to Book.

### Service Rows ("What I cut")
A list ruled with 1px Rule lines top and bottom. Each row: the service name in Row type left, a one-line Ash description right (max 42ch). Hover turns the name Sign Red (0.2s).

### Contact Panel and Rows
The red panel: Sign Red, 20px radius, Panel-on-dark shadow, "Busted Blends" head in Button type at 1.5rem, then paper rows 10px apart. Each row is 60px minimum, 12px 16px padding, 8px radius, an icon plus bold label with the value small in Paper Grey beneath. Hover inverts the row to Ink with paper text and Ash value (0.2s); focus uses a Warm White on Red outline. Set: text, call, email, Instagram.

### Icons
Inline SVG line icons on a 24px grid, 2px round-capped stroke, 1.25em, currentColor.

## Do's and Don'ts

### Do:
- **Do** keep red the only hue: Sign Red for fills and large type, Ember Red for hover, Red Text for small red text on black.
- **Do** let the real cut photos be the imagery, framed at 4:5 with 10px corners.
- **Do** keep glass to the floating nav, and make it finished without the refraction filter.
- **Do** use soft, downward, blurred black shadows; let the red centre glow supply atmosphere.
- **Do** set display type in Big Shoulders 900 uppercase and everything else in Archivo.
- **Do** give every motion a reduced-motion state: one still tunnel arrangement, no tall scroll, no smooth scroll.
- **Do** show focus with a 3px outline, 3px offset: Sign Red on dark, Warm White on Red inside the red panel.

### Don't:
- **Don't** set small red text on black in Sign Red; use Red Text.
- **Don't** use hard offset drop shadows.
- **Don't** make any surface depend on the #liquid refraction; it is Chromium-only.
- **Don't** use Stony Brook University logos or school colours; the school is named in copy only.
- **Don't** treat the contact values in the build as brand facts; they are placeholders.
