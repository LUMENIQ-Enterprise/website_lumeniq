# website_lumeniq

## UI System Guide

### Purpose
This document defines the canonical UI system for this repository so other agents can safely create new pages or update existing pages without breaking style consistency.

This guide is the source of truth for:
- Visual direction
- Typography setup
- Geist Pixel usage rules
- Number rendering behavior
- Layout and component patterns
- Update and migration workflow
- Validation checklist

### Visual Direction
The product style is a conversion-focused terminal-inspired landing experience with:
- Black-first base
- Subtle non-neon accent colors
- Minimal but intentional motion
- Strong information hierarchy
- Practical, readable spacing

Do not drift into generic SaaS gradients, heavy glassmorphism, or decorative clutter.

### File Scope
Current implementation lives in:
- index.html
- geist-pixel-test.html

When creating new pages, follow this same system unless the user explicitly asks for a different visual language.

### Font System
#### Required imports for main pages
Use Geist Sans and Geist Mono:
- https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/style.css
- https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/style.css

#### Required pixel font faces
Use explicit @font-face loading from Geist package files:
- Geist Pixel Square: https://cdn.jsdelivr.net/npm/geist@1.7.0/dist/fonts/geist-pixel/GeistPixel-Square.woff2
- Geist Pixel Line: https://cdn.jsdelivr.net/npm/geist@1.7.0/dist/fonts/geist-pixel/GeistPixel-Line.woff2

#### Token setup
Always keep these font tokens (or exact equivalents):
- --font-body -> Geist Sans stack
- --font-display -> Geist Mono stack
- --font-pixel -> Geist Pixel stack with mono fallback

Example token intent:
- Body copy: Geist Sans
- Main headings and structural text: Geist Mono
- Pixel accents: Geist Pixel

### Geist Pixel Usage Rules
#### Use Geist Pixel for
- Small UI labels
- Navigation micro text
- Section labels
- Step numbers and metric labels
- Sticky CTA micro text
- Metric values where numbers are central
- Outcome blocks where value and nearby text are treated as one visual unit

#### Do not use Geist Pixel for
- Large hero headline paragraphs and major long-form display text unless explicitly requested

#### Close proximity rule
If numbers and letters are semantically coupled and visually adjacent (for example 2.1x and its immediate descriptor), both should use Geist Pixel for consistency.

### Typography Size Scale (Geometric Raster)
All subtext / UI label elements follow a +2px lift from legacy values. The canonical sizes are:

| Role | Font-size | Font family |
|---|---|---|
| Body copy | 14px (base) | Geist Sans |
| Section labels (.label) | 13px | Geist Pixel |
| Navigation links (.nav-links) | 14px | Geist Pixel |
| Navigation CTA (.nav-cta) | 13px | Geist Pixel |
| Hero meta tags (.hero-meta) | 14px | Geist Pixel |
| Trust items (.trust-item) | 13px | Geist Pixel |
| Metric labels (.metric small) | 13px | Geist Pixel |
| Outcome labels (.outcome small) | 13px | Geist Pixel |
| Step numbers (.step-num) | 14px | Geist Pixel |
| Plan features (.plan ul) | 14px | Geist Pixel |
| Price subtext (.price small) | 14px | Geist Pixel |
| ROI output (.roi-output) | 14px | Geist Pixel |
| Form labels (label) | 13px | Geist Pixel |
| FAQ toggle (summary) | 14px | Geist Mono |
| FAQ content (details p) | 15px | Geist Sans |
| Quote attribution (.quote span) | 14px | Geist Mono |
| Footer (.footer) | 13px | Geist Pixel |
| Fine print (.fine) | 13px | Geist Sans |
| Sticky CTA (.sticky-cta) | 13px | Geist Pixel |
| Contact email (.contact-email) | 15px | Geist Mono |
| Base icon (.hn) | 14px | icon font |

Do not go below 13px for any subtext. Do not go below 14px for icon glyphs paired with 14px labels.

### Icon-Text Alignment Rules
All icon+text couplings must use one of the following consistent methods — never mix baseline tricks with flex:

- **Inline-flex row** (navigation, hero-meta, footer, labels): `display: inline-flex; align-items: center; gap: Xpx;`
- **Block flex row** (step-num): `display: flex; align-items: center; gap: Xpx;` (e.g. `gap: 6px` for step-num)
- **Block flex start** (problem list items): `display: flex; align-items: flex-start; gap: 8px;` with `flex-shrink: 0; margin-top: 2px;` on the icon for optical first-line alignment
- **Grid centered** (trust items): `display: grid; place-items: center; gap: 8px;`

Do not use `vertical-align: baseline` or `margin-right` hacks on icons paired with text. Use gap on the flex/grid parent instead.

### Number Rendering Policy
All visible digits are globally rendered with Geist Pixel by script.

#### Implementation approach
- Text-node walker scans for digits and wraps each digit in span.pixel-number
- Dynamic values (for example ROI output) are re-rendered with digit wrapping

#### Exclusion mechanism
Use .no-pixel-numbers on any container to opt out.

Default exclusions in script walker:
- script
- style
- noscript
- textarea
- code
- pre
- .pixel-number
- .no-pixel-numbers

Use .no-pixel-numbers for legal copy, compliance text, or any area where default numeric typography must remain unchanged.

### Color System
Use calm, muted accents only. Keep black dominant.

Core intent:
- Background surfaces: near-black values
- Body text: high-contrast soft white
- Secondary text: muted gray
- Accents: muted mint, steel, sand, plum, copper

Avoid:
- Neon accents
- Bright saturated primaries
- High-contrast rainbow mixes

### Layout Rules
Current funnel page structure should be preserved as baseline for conversion pages:
1. Hero (value proposition + primary CTA)
2. Trust strip
3. Problem and solution split
4. Outcomes metrics
5. Proof/testimonials
6. Implementation path
7. Pricing
8. ROI calculator
9. FAQ
10. Lead capture
11. Sticky CTA

When adding sections:
- Keep the same spacing rhythm
- Maintain clear top border separation
- Preserve readable mobile flow

### Component Rules
#### Buttons
- Primary: subtle filled accent
- Secondary: outlined accent
- Short labels, uppercase style allowed

#### Cards and panels
- Thin borders
- Low radius
- Minimal shadow or none
- Strong text hierarchy over decoration

#### Forms
- Clear labels above controls
- Good contrast
- Compact but not cramped spacing

#### Tables and metrics
- Use consistent typographic hierarchy
- For metric clusters, keep numeric and adjacent contextual text style-cohesive

### Motion Rules
Allowed:
- Subtle fade-in on scroll
- Small hover transitions
- Minimal scanline/background movement

Not allowed:
- Bouncy transforms
- Heavy parallax
- Dramatic animation that distracts from conversion goals

### Accessibility and Readability
Always verify:
- Contrast remains strong on dark backgrounds
- Focus states are visible
- Font sizes remain readable on mobile
- Interactive controls are obvious and reachable

### Workflow for New Pages
1. Start from tokenized CSS variables
2. Add Geist Sans and Geist Mono imports
3. Add Geist Pixel @font-face declarations
4. Define font tokens and apply by typography role
5. Build section layout using the funnel hierarchy if conversion-focused
6. Add number pixelization script only if page needs global pixel digits
7. Add .no-pixel-numbers where legal or neutral text should opt out
8. Validate errors and responsive behavior

### Workflow for Updating Old Pages
1. Preserve content semantics first
2. Replace ad hoc font stacks with Geist token system
3. Migrate small UI text to Geist Pixel selectively
4. Keep large headlines non-pixel unless asked
5. Normalize color usage to muted accents
6. Add or maintain number wrapping behavior
7. Add opt-out class to sensitive sections
8. Re-check dynamic text rendering (currency, percentages, ratios)

### Agent Checklist Before Finishing
- Fonts load from correct sources
- No accidental neon colors introduced
- Pixel text is used in the right places only
- Number wrapping script still works
- .no-pixel-numbers exclusions still work
- ROI or other dynamic number outputs remain pixelized when required
- No console-breaking script changes
- Mobile layout still readable

### Notes for Agents
- Prefer minimal targeted edits over broad refactors.
- Keep this file updated when typography or number-rendering rules change.
- If a user asks for a style override, follow user instruction and then update this document accordingly.

