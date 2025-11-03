# Project Structure

## Directory Layout

```
claude-chat/
├── frontend/                    # React + Vite frontend application
│   ├── src/
│   │   ├── App.jsx             # Main chat interface component
│   │   └── index.css           # Tailwind CSS imports
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite config with base: '/claude-chat/'
└── backend/                     # Cloudflare Worker backend
    ├── src/
    │   └── index.js            # Worker handler with embedded system prompt
    └── wrangler.toml           # Cloudflare Worker configuration
```

## Key Files

### Frontend Components
- **App.jsx**: Primary chat container managing conversation state, message submission, and API communication
- **MessageList**: Renders conversation history with user messages right-aligned (purple) and AI messages left-aligned (white/transparent)
- **MessageInput**: Input field with send button and loading state handling
- **LoadingIndicator**: Animated feedback during AI processing

### Backend Components
- **index.js**: Main Worker handler with CORS, request routing, and Anthropic API integration
- **SystemPromptManager**: Embedded Scoper methodology from `pseudo_scoper-system_prompt.md`
- **ConversationProcessor**: Manages conversation context and Claude API communication

## Configuration Files

### Frontend (vite.config.js)
```javascript
export default {
  base: '/claude-chat/',  // GitHub Pages deployment path
  // Additional Vite configuration
}
```

### Backend (wrangler.toml)
```toml
name = "scoper-backend"
main = "src/index.js"
compatibility_date = "2024-01-01"
# ANTHROPIC_API_KEY stored as Worker secret
```

## Deployment Structure
- **GitHub Repo**: `https://github.com/ttrraanng28/scoper_prototype_v1.0`
- **GitHub Pages**: `https://ttrraanng28.github.io/scoper_prototype_v1.0`
- **Cloudflare Worker**: Global edge deployment with custom domain support

## Development Workflow
1. Frontend development in `frontend/` directory with Vite dev server
2. Backend development in `backend/` directory with Wrangler local testing
3. System prompt updates embedded directly in `backend/src/index.js`
4. Separate deployment processes for frontend (GitHub Pages) and backend (Cloudflare Workers)