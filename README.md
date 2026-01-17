# Rails Banking API Documentation

This repository contains the official documentation for the Rails Banking Infrastructure API, powered by Mintlify, along with an AI-powered API design tool integrated with Google Gemini.

## Features

- **Mintlify Documentation**: Beautiful, modern API documentation with Space Grotesk typography
- **AI API Designer**: Generate API endpoints using natural language with Google Gemini
- **TypeScript SDK Guides**: Comprehensive guides for the Rails TypeScript SDK
- **Interactive API Reference**: Complete REST API documentation with examples

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Gemini API key (for AI features)

### Installation

```bash
npm install
```

### Run Mintlify Documentation

```bash
npm run docs:dev
```

This starts the Mintlify development server at `http://localhost:3000`.

### Run AI API Designer

1. Set the `GEMINI_API_KEY` in `.env.local`:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

2. Start the Vite development server:

   ```bash
   npm run dev
   ```

This starts the AI-powered API design tool at `http://localhost:3000`.

## Project Structure

```
rails-docs-2/
├── api-reference/          # API endpoint documentation (MDX)
├── beginner-guide/         # Getting started guides
├── guides/                 # SDK and integration guides
├── essentials/             # Core documentation pages
├── snippets/               # Reusable MDX snippets
├── images/                 # Documentation images
├── logo/                   # Brand assets
├── ai-tools/               # AI tooling documentation
├── components/             # React components (AI Designer)
├── services/               # Gemini AI service integration
├── docs.json               # Mintlify configuration
├── App.tsx                 # AI Designer main component
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run docs:dev` | Start Mintlify documentation server |
| `npm run docs:build` | Build Mintlify documentation for production |
| `npm run dev` | Start AI API Designer (Vite) |
| `npm run build` | Build AI API Designer for production |
| `npm run preview` | Preview production build |

## Theme Configuration

The documentation uses a black and white theme with:

- **Headings**: Space Grotesk (700 weight)
- **Body**: Inter (400 weight)
- **Primary Color**: `#000000` (black)
- **Light Mode**: `#f8fafc`
- **Dark Mode**: `#ffffff`

## AI API Designer

The AI-powered API Designer allows you to:

1. Describe an API endpoint in natural language
2. Generate OpenAPI schemas automatically
3. Create mock responses
4. Generate client code in TypeScript, JavaScript, Python, or Go
5. Test endpoints with the built-in playground

### Example Prompts

- "E-commerce product list with filters"
- "Weather forecast with hourly breakdown"
- "Crypto wallet balance tracker"
- "Task manager with nested subtasks"

## Links

- [Rails GitHub Repository](https://github.com/sibabale/rails)
- [TypeScript SDK](https://github.com/sibabale/rails-typescript)
- [API Reference](/api-reference/introduction)

## License

MIT License - See LICENSE file for details.