# Reference Component Library

A demonstration of integrating design tokens from Figma (via Tokens Studio) with React components using Style Dictionary.

## About This Project

This reference implementation shows how to create a design system workflow from Figma to code by:

1. Exporting design tokens from Figma using Tokens Studio
2. Processing those tokens with Style Dictionary to generate CSS variables
3. Using those variables in React components

The project demonstrates a complete design token implementation including:

- Color scales (primary, secondary, tertiary)
- Typography (font families, weights, sizes)
- Spacing and sizing systems
- Border radii and widths
- Effects like shadows
- Component-specific tokens

## Featured Components

Currently the library includes:

- **Button**: A fully-featured button component with:
  - Multiple variants (primary, secondary, tertiary)
  - Interactive states (default, hover, active, disabled)
  - All styling driven by design tokens

## Project Structure

```
reference-component-library/
├── src/
│   ├── components/
│   │   └── Button.jsx       # Example component using design tokens
│   ├── App.jsx              # Demo component showcase
│   ├── main.jsx             # Entry point
│   ├── index.css            # Generated CSS variables from tokens
│   └── tokens.js            # Generated JS tokens
├── tokens/
│   └── tokens.json          # Design tokens from Tokens Studio for Figma
├── sd.config.cjs            # Style Dictionary configuration
├── build-tokens.js          # Custom token build script
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/reference-component-library.git
   cd reference-component-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the design tokens:
   ```bash
   npm run tokens
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Workflow

When design tokens are updated in Figma:

1. Export them from Tokens Studio to `tokens/tokens.json`
2. Run `npm run tokens` to regenerate the CSS variables
3. The components will automatically use the updated design tokens

## Technical Implementation

This project uses:

- **Vite**: For fast development and building
- **React**: For component development
- **Style Dictionary**: To transform design tokens into platform-specific formats
- **Tokens Studio Transforms**: For handling Tokens Studio's token format

## Use Cases

This reference implementation is useful for:

1. Design system teams setting up a token workflow
2. Front-end developers implementing design tokens
3. Designers exploring how tokens translate to code
4. Teams establishing a design-to-development workflow

## Importing Design Tokens from Git Repository

This project supports importing design tokens directly from a Git repository:

```bash
# Basic usage: Import tokens.json from a repository
npm run fetch-tokens https://github.com/username/design-tokens.git

# Specify a branch (default is main)
npm run fetch-tokens https://github.com/username/design-tokens.git develop

# Specify a custom path to tokens.json within the repository
npm run fetch-tokens https://github.com/username/design-tokens.git main path/to/tokens/tokens.json
```

This approach allows you to:
- Version your design tokens independently
- Share tokens across multiple projects
- Track token changes through Git history
- Use branch strategies for token development

After fetching, the script automatically runs the token build process to generate CSS variables.

## License

MIT