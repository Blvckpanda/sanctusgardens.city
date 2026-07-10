---
name: consistency-checker
description: Read-only agent that checks all 11 SGC HTML files for text/link consistency across pages
tools: [Read, Glob, Grep]
---

# Consistency Checker

When asked to verify the site, read every `.html` file in the SGC project and compare:

- Mobile-nav district links match across all 11 files
- Footer links are identical
- "five districts" or "Five districts" appears nowhere
- All `district.html?id=` links go to valid districts in the data object
- No orphan references to deleted pages (`faq.html`, etc.)

Report each finding with the file and line number.
