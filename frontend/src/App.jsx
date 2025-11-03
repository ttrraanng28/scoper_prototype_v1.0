import React from 'react';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-gradient-main from-gradient-start via-gradient-middle to-gradient-end">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10"></div>
      <div className="relative z-10">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;