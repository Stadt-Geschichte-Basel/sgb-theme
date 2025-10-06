# Quarto Theme for Stadt.Geschichte.Basel

This Quarto theme provides the official branding and styling for projects of Stadt.Geschichte.Basel.

[![GitHub issues](https://img.shields.io/github/issues/Stadt-Geschichte-Basel/sgb-theme.svg)](https://github.com/Stadt-Geschichte-Basel/sgb-theme/issues)
[![GitHub forks](https://img.shields.io/github/forks/Stadt-Geschichte-Basel/sgb-theme.svg)](https://github.com/Stadt-Geschichte-Basel/sgb-theme/network)
[![GitHub stars](https://img.shields.io/github/stars/Stadt-Geschichte-Basel/sgb-theme.svg)](https://github.com/Stadt-Geschichte-Basel/sgb-theme/stargazers)
[![Code license](https://img.shields.io/github/license/Stadt-Geschichte-Basel/sgb-theme.svg)](https://github.com/Stadt-Geschichte-Basel/sgb-theme/blob/main/LICENSE-AGPL.md)
[![Data license]([![Data license](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://github.com/Stadt-Geschichte-Basel/sgb-theme/blob/main/LICENSE-CCBY.md))](https://github.com/Stadt-Geschichte-Basel/sgb-theme/blob/main/LICENSE-CCBY.md)

<!-- [![DOI](https://zenodo.org/badge/1066687287.svg)](https://zenodo.org/badge/latestdoi/ZENODO_RECORD) -->

## Usage

**This theme is intended for official Stadt.Geschichte.Basel projects only.**

To use this theme in your Quarto project, you can add it from the GitHub repository:

```bash
quarto add Stadt-Geschichte-Basel/sgb-theme --no-prompt
```

This command will download the extension files to your project's `_extensions/` directory.  
To activate the theme, manually add the following to your `_quarto.yml` (under `format -> html -> theme`):

```yaml
format:
  html:
    theme: sgb-theme
```

### Required Assets

The theme requires the following assets in your project root directory:

1. **Logo**: `assets/img/logo.svg` - The Stadt.Geschichte.Basel logo for the navbar
2. **Fonts**:
   - `assets/fonts/EuclidCircularB-Regular-WebS.woff2`
   - `assets/fonts/EuclidCircularB-Medium-WebS.woff2`
   - `assets/fonts/EuclidCircularB-Semibold-WebS.woff2`

You can copy these assets from the `_extensions/sgb-theme/assets/` directory after installing the theme:

```bash
# Copy logo
mkdir -p assets/img
cp _extensions/sgb-theme/assets/img/logo.svg assets/img/

# Copy fonts
mkdir -p assets/fonts
cp _extensions/sgb-theme/assets/fonts/*.woff2 assets/fonts/
```

## Development & Testing

This repository includes a comprehensive test suite to validate the theme functionality:

### Running Tests

```bash
# Install dependencies
pnpm install

# Run tests (builds test site and validates output)
pnpm test

# Preview test site
pnpm run preview

# Build test site only
pnpm run build
```

### Test Structure

- `test/` - Test Quarto project demonstrating theme features
- `tests/` - Test scripts that validate generated HTML output
- `playwright.config.js` - Configuration for browser-based testing (optional)

The test suite validates:

- Basic HTML structure and navigation
- Theme-specific features (fonts, analytics, styling)
- Multi-page functionality
- Code highlighting and table of contents generation

### Extension Structure

```
_extensions/
└── sgb-theme/
    ├── _extension.yml      # Extension metadata and configuration
    ├── _theme.scss         # SCSS theme variables
    ├── styles.css          # Custom CSS including @font-face declarations
    ├── favicon.png         # Site favicon
    └── assets/             # Additional theme assets
        ├── fonts/          # Euclid Circular B web fonts
        └── img/            # Logo and images
```

### Font Configuration

The theme uses **Euclid Circular B** as the main font. The font configuration consists of two parts:

1. **@font-face declarations** in `styles.css` that load the font files from `assets/fonts/`
2. **mainfont setting** in `_extension.yml` under `formats: html:` that applies the font to the document

The theme includes three font weights:

- Regular (400)
- Medium (500)
- Semibold (600)

If you need to override the font in your project, you can do so in your `_quarto.yml`:

```yaml
format:
  html:
    mainfont: 'Your Custom Font'
```

### Analytics Configuration

The theme includes [Plausible Analytics](https://plausible.io/) configured for the Stadt.Geschichte.Basel domain by default. You can customize or disable this in your project's `_quarto.yml`:

#### Option 1: Use your own Plausible domain

```yaml
format:
  sgb-theme-html:
    include-in-header:
      text: |
        <script defer data-domain="your-domain.com" src="https://plausible.io/js/script.outbound-links.js"></script>
```

#### Option 2: Disable analytics completely

```yaml
format:
  sgb-theme-html:
    include-in-header: null
```

#### Option 3: Use a different analytics service

```yaml
format:
  sgb-theme-html:
    include-in-header:
      text: |
        <!-- Your custom analytics script here -->
```

## Support

This project is maintained by [@Stadt-Geschichte-Basel](https://github.com/Stadt-Geschichte-Basel). Please understand that we can't provide individual support via email. We also believe that help is much more valuable when it's shared publicly, so more people can benefit from it.

| Type                                   | Platforms                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| 🚨 **Bug Reports**                     | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/sgb-theme/issues)    |
| 📊 **Report bad data**                 | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/sgb-theme/issues)    |
| 📚 **Docs Issue**                      | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/sgb-theme/issues)    |
| 🎁 **Feature Requests**                | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/sgb-theme/issues)    |
| 🛡 **Report a security vulnerability** | See [SECURITY.md](SECURITY.md)                                                        |
| 💬 **General Questions**               | [GitHub Discussions](https://github.com/Stadt-Geschichte-Basel/sgb-theme/discussions) |

## Roadmap

No changes are currently planned.

## Contributing

All contributions to this repository are welcome! If you find errors or problems with the data, or if you want to add new data or features, please open an issue or pull request. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. The available versions are listed in the [tags on this repository](https://github.com/Stadt-Geschichte-Basel/sgb-theme/tags).

## Authors and acknowledgment

- **Moritz Twente** - _Initial work_ - [mtwente](https://github.com/mtwente)
- **Moritz Mähr** - _Enhancements_ - [maehr](https://github.com/maehr)

See also the list of [contributors](https://github.com/Stadt-Geschichte-Basel/sgb-theme/graphs/contributors) who contributed to this project.

## Licensing

### Fonts

The theme uses the "Euclid Circular B" font family. A proper license must be acquired for its use. For more information, please see [Swiss Typefaces](https://www.swisstypefaces.com/fonts/euclid/).

### Code

The code in this repository is released under the GNU Affero General Public License v3.0 - see the [LICENSE-AGPL](LICENSE-AGPL.md) file for details. By using this code, you agree to make any modifications available under the same license.

### Data and Content

The data in this repository is released under the Creative Commons Attribution 4.0 International (CC BY 4.0) License - see the [LICENSE-CCBY](LICENSE-CCBY.md) file for details. By using this data, you agree to give appropriate credit to the original author(s) and to indicate if any modifications have been made.
