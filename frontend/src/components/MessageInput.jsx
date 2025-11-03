import React, { useState } from 'react';

const MessageInput = ({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-6">
      <div className="flex-1 relative">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe your business challenge or idea..."
          className="input-glass w-full p-4 rounded-xl resize-none min-h-[56px] max-h-[120px] text-base leading-relaxed"
          rows={1}
          disabled={isLoading}
          aria-label="Message input"
        />
        <div className="absolute bottom-2 right-2 text-xs text-white/40">
          {inputValue.length > 0 && (
            <span>{inputValue.length} chars</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={!inputValue.trim() || isLoading}
        className="btn-primary px-6 py-4 rounded-xl flex items-center justify-center min-w-[90px] shadow-user-message"
        aria-label="Send message"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="hidden sm:inline text-sm">Sending</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            <span className="hidden sm:inline font-medium">Send</span>
          </div>
        )}
      </button>
    </form>
  );
};

export default MessageInput;