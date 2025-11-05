# Technology Stack

## Frontend
- **React 18** - UI framework for component-based architecture
- **Vite** - Build tool providing fast dev server and optimized production builds
- **Tailwind CSS** - Utility-first styling with glassmorphism design patterns
- **No state management library** - Simple React useState for conversation state

## Backend
- **Cloudflare Workers** - Serverless edge functions with V8 isolates runtime
- **Anthropic SDK** (`@anthropic-ai/sdk`) - Official Claude API client
- **Model**: `claude-sonnet-4-5-20250929` with embedded system prompt

## Deployment
- **Frontend**: GitHub Pages for static site hosting
- **Backend**: Cloudflare Workers with global edge distribution
- **Domain**: Custom domain support with HTTPS via Cloudflare

## Development Tools
- **Wrangler** - Cloudflare CLI for Worker deployment
- **gh-pages** - npm package for GitHub Pages deployment

## Common Commands

### Frontend Development
```bash
cd frontend
npm install
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm install
wrangler dev         # Start local development server
wrangler deploy      # Deploy to production
wrangler secret put ANTHROPIC_API_KEY  # Set API key
```

### Deployment
```bash
# Frontend to GitHub Pages
cd frontend
npm run build
npm run deploy

# Backend to Cloudflare Workers
cd backend
wrangler deploy
```

## Architecture Patterns
- **Embedded System Prompt**: Complete Scoper methodology embedded in Worker code for performance
- **Stateless Backend**: No persistent storage, conversation state managed client-side
- **CORS Configuration**: Worker configured for GitHub Pages domain access
- **Environment Variables**: API keys stored as Cloudflare Worker secrets