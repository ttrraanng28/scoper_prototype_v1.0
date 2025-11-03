import React, { useEffect, useRef } from 'react';
import LoadingIndicator from './LoadingIndicator';
import ProjectCards from './ProjectCards';

const MessageList = ({ messages, isLoading, analysisState }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const parseProjectCards = (content) => {
    // Look for project card patterns in the AI response
    const cardPatterns = [
      /(?:project\s+card|recommendation)\s*[:\-]?\s*(.+?)(?=(?:project\s+card|recommendation)|$)/gis,
      /(?:sop-first|role-first|tech-first|quick-win)\s*[:\-]?\s*(.+?)(?=(?:sop-first|role-first|tech-first|quick-win)|$)/gis
    ];
    
    const cards = [];
    
    // Try to extract structured project cards
    const lines = content.split('\n');
    let currentCard = null;
    let currentSection = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      
      // Detect card start
      if (line.includes('project card') || 
          line.includes('sop-first') || 
          line.includes('role-first') || 
          line.includes('tech-first') || 
          line.includes('quick-win')) {
        
        if (currentCard) {
          cards.push(currentCard);
        }
        
        currentCard = {
          title: lines[i].trim(),
          approach: line.includes('sop-first') ? 'sop-first' :
                   line.includes('role-first') ? 'role-first' :
                   line.includes('tech-first') ? 'tech-first' :
                   line.includes('quick-win') ? 'quick-win' : 'standard',
          goalStatement: '',
          whyNow: '',
          teamwork: { founderRole: '', teamMemberRole: '', externalSupport: [] },
          successMetrics: { primary: '', secondary: [], timeline: '' },
          unlocks: '',
          assumptions: [],
          estimatedEffort: ''
        };
        continue;
      }
      
      if (!currentCard) continue;
      
      // Detect sections
      if (line.includes('goal:') || line.includes('objective:')) {
        currentSection = 'goal';
        currentCard.goalStatement = lines[i].replace(/^[^:]*:\s*/, '').trim();
      } else if (line.includes('why now:') || line.includes('rationale:')) {
        currentSection = 'whyNow';
        currentCard.whyNow = lines[i].replace(/^[^:]*:\s*/, '').trim();
      } else if (line.includes('effort:') || line.includes('timeline:')) {
        currentSection = 'effort';
        currentCard.estimatedEffort = lines[i].replace(/^[^:]*:\s*/, '').trim();
      } else if (line.includes('unlocks:') || line.includes('enables:')) {
        currentSection = 'unlocks';
        currentCard.unlocks = lines[i].replace(/^[^:]*:\s*/, '').trim();
      } else if (line.includes('metrics:') || line.includes('success:')) {
        currentSection = 'metrics';
        currentCard.successMetrics.primary = lines[i].replace(/^[^:]*:\s*/, '').trim();
      } else if (currentSection && lines[i].trim() && !line.includes(':')) {
        // Continue previous section
        const content = lines[i].trim();
        if (currentSection === 'goal') {
          currentCard.goalStatement += ' ' + content;
        } else if (currentSection === 'whyNow') {
          currentCard.whyNow += ' ' + content;
        } else if (currentSection === 'effort') {
          currentCard.estimatedEffort += ' ' + content;
        } else if (currentSection === 'unlocks') {
          currentCard.unlocks += ' ' + content;
        }
      }
    }
    
    if (currentCard) {
      cards.push(currentCard);
    }
    
    return cards.length > 0 ? cards : null;
  };

  const formatMessageContent = (content, message) => {
    // Check if this message contains project cards
    const projectCards = parseProjectCards(content);
    
    if (projectCards && message.role === 'assistant') {
      return (
        <div className="space-y-4">
          <div className="prose prose-invert max-w-none">
            {content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              // Skip lines that are part of project cards structure
              if (paragraph.toLowerCase().includes('project card') ||
                  paragraph.toLowerCase().includes('sop-first') ||
                  paragraph.toLowerCase().includes('role-first') ||
                  paragraph.toLowerCase().includes('tech-first') ||
                  paragraph.toLowerCase().includes('quick-win')) {
                return null;
              }
              return (
                <p key={index} className="mb-2 last:mb-0">
                  {paragraph}
                </p>
              );
            }).filter(Boolean)}
          </div>
          <ProjectCards projectCards={projectCards} />
        </div>
      );
    }
    
    // Regular message formatting
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      return (
        <p key={index} className="mb-2 last:mb-0">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 && (
        <div className="text-center text-ai-text-secondary mt-12 mb-8 animate-fade-in">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-white">Welcome to AI Scoper</h2>
          <p className="text-lg max-w-md mx-auto leading-relaxed">
            Share your business challenge or idea to get started with structured analysis and actionable project recommendations.
          </p>
          <div className="mt-6 text-sm text-white/40">
            <p>✨ 3-layer analysis methodology</p>
            <p>📊 Business matrix framework</p>
            <p>🎯 Actionable project cards</p>
          </div>
        </div>
      )}
      
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div
            className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] p-4 rounded-2xl ${
              message.role === 'user'
                ? 'user-message ml-4 sm:ml-8'
                : 'ai-message mr-4 sm:mr-8'
            }`}
          >
            <div className="whitespace-pre-wrap leading-relaxed">
              {formatMessageContent(message.content, message)}
            </div>
            <div
              className={`text-xs mt-3 flex items-center ${
                message.role === 'user' 
                  ? 'text-white/70 justify-end' 
                  : 'text-ai-text-secondary justify-start'
              }`}
            >
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {formatTimestamp(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start animate-slide-up">
          <div className="max-w-[85%] sm:max-w-[80%] md:max-w-[75%] p-4 rounded-2xl ai-message mr-4 sm:mr-8">
            <LoadingIndicator />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;