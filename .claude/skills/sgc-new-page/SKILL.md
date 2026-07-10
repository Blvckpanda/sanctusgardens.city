---
name: sgc-new-page
description: Scaffold a new SGC page from an existing page's boilerplate. Preserves header, footer, mobile-nav, and asset links.
disable-model-invocation: true
---

# SGC New Page — Page Scaffolder

Generate a new `.html` page for Sanctus Gardens City using the standard site boilerplate.

## Input

The skill needs:
- **Page title** (`<title>` and `<h1>`)
- **Meta description**
- **Hero sub text**
- **Main sections** (content structure)

## Process

1. Copy `sustainability.html` as the base template (least custom JS, cleanest skeleton)
2. Replace `<title>`, `<meta name="description">`, `<h1>`, `.pagehero__sub`
3. Replace the main section content while preserving all nav/footer/mobile-nav blocks
4. Write to the requested filename

## Usage

```
/sgc-new-page filename=partnerships.html title="..."
```
