# SGB Theme Test Project

This directory contains a test Quarto project that demonstrates and validates the SGB theme extension.

## Structure

- `_quarto.yml` - Quarto project configuration that uses the SGB theme
- `index.qmd` - Main test page with various content types
- `about.qmd` - Secondary page to test navigation
- `_site/` - Generated HTML output (after running `quarto render`)

## Running Tests

From the root directory:

```bash
# Build the test site and run tests
npm test

# Only build the test site
npm run build

# Preview the test site
npm run preview
```

## What's Tested

The test suite validates:

1. **Basic Structure**
   - HTML5 doctype and proper page structure
   - Page titles and headings
   - Navigation between pages

2. **Content Rendering**
   - Code blocks and syntax highlighting
   - Table of contents generation
   - External and internal links

3. **Theme Features** (when extension is properly applied)
   - Custom font (Euclid Circular B)
   - Analytics integration (Plausible)
   - External links opening in new windows
   - Custom styling

4. **Multi-page Functionality**
   - Navigation between pages
   - Consistent theme application

## Notes

- Some theme features may not be applied depending on Quarto version compatibility
- The extension requires the correct directory structure in `_extensions/sgb-theme/`
- Tests are designed to be informative about missing features rather than failing completely
