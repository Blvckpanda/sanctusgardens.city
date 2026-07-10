---
name: sgc-audit
description: Check all 11 SGC pages for nav/footer/mobile-nav/terminology consistency. Run after site-wide changes (adding districts, updating nav, fixing copy).
disable-model-invocation: true
---

# SGC Audit — Cross-Page Consistency Checker

Read every `.html` file in the SGC project and check for these invariants:

## Checks

1. **Mobile-nav district links** — All 6 present: residential, commercial, leisure, innovation, landmark, civic
2. **District count** — No "five districts" or "Five districts" anywhere (must be "six"/"Six")
3. **Footer links** — Same set across all pages (no orphan links to deleted pages like `faq.html`)
4. **district.html?id=civic** reference — Present in every mobile-nav Districts group
5. **meta description** — Doesn't reference "five districts"

## Usage

```
/sgc-audit
```
