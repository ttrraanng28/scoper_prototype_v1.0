import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import AnalysisProgress from './AnalysisProgress';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 3-layer analysis progression tracking
  const [analysisState, setAnalysisState] = useState({
    currentLayer: 1, // 1: Goals, 2: Signals, 3: SMART Metrics
    layersCompleted: [],
    goalType: null, // 'problem-solving' | 'idea-execution'
    businessMatrix: {
      relationship: null, // 'owner-company' | 'owner-employee' | 'employee-company'
      domain: null // 'actors' | 'information' | 'processes'
    },
    analysisComplete: false
  });

  // Backend API endpoint - configured for production deployment
  const API_ENDPOINT = 'https://scoper-backend-prod.trangthu180695.workers.dev/';

  // Function to detect layer transitions and business context in AI responses
  const analyzeAIResponse = (responseContent) => {
    const content = responseContent.toLowerCase();
    
    // Detect goal type classification
    let goalType = null;
    if (content.includes('problem-solving') || content.includes('solving a problem')) {
      goalType = 'problem-solving';
    } else if (content.includes('idea-execution') || content.includes('executing an idea')) {
      goalType = 'idea-execution';
    }
    
    // Detect business matrix relationships
    let relationship = null;
    if (content.includes('owner-company') || content.includes('you and your company')) {
      relationship = 'owner-company';
    } else if (content.includes('owner-employee') || content.includes('you and your team')) {
      relationship = 'owner-employee';
    } else if (content.includes('employee-company') || content.includes('team and company')) {
      relationship = 'employee-company';
    }
    
    // Detect business matrix domains
    let domain = null;
    if (content.includes('actors') || content.includes('interfaces') || content.includes('roles')) {
      domain = 'actors';
    } else if (content.includes('information') || content.includes('artifacts') || content.includes('data')) {
      domain = 'information';
    } else if (content.includes('processes') || content.includes('controls') || content.includes('workflows')) {
      domain = 'processes';
    }
    
    // Detect layer transitions based on keywords
    let detectedLayer = analysisState.currentLayer;
    
    // Layer 2 (Signals) indicators
    if (content.includes('signals') || content.includes('current state') || 
        content.includes('operational efficiency') || content.includes('strategic positioning')) {
      detectedLayer = 2;
    }
    
    // Layer 3 (SMART Metrics) indicators
    if (content.includes('smart metrics') || content.includes('measurable') || 
        content.includes('success criteria') || content.includes('kpi')) {
      detectedLayer = 3;
    }
    
    // Project cards completion indicator
    const analysisComplete = content.includes('project cards') || 
                           content.includes('recommendations') ||
                           (content.includes('sop-first') && content.includes('tech-first'));
    
    return {
      goalType,
      relationship,
      domain,
      detectedLayer,
      analysisComplete
    };
  };

  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim()) return;

    const userMessage = {
      role: 'user',
      content: messageContent,
      timestamp: new Date().toISOString()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const aiMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);
        
        // Analyze AI response for layer progression and business context
        const analysis = analyzeAIResponse(data.response);
        
        setAnalysisState(prev => {
          const newState = { ...prev };
          
          // Update goal type if detected
          if (analysis.goalType && !prev.goalType) {
            newState.goalType = analysis.goalType;
          }
          
          // Update business matrix if detected
          if (analysis.relationship && !prev.businessMatrix.relationship) {
            newState.businessMatrix.relationship = analysis.relationship;
          }
          if (analysis.domain && !prev.businessMatrix.domain) {
            newState.businessMatrix.domain = analysis.domain;
          }
          
          // Update layer progression
          if (analysis.detectedLayer > prev.currentLayer) {
            // Mark previous layer as completed
            if (!prev.layersCompleted.includes(prev.currentLayer)) {
              newState.layersCompleted = [...prev.layersCompleted, prev.currentLayer];
            }
            newState.currentLayer = analysis.detectedLayer;
          }
          
          // Update analysis completion status
          if (analysis.analysisComplete) {
            newState.analysisComplete = true;
            // Mark current layer as completed if not already
            if (!prev.layersCompleted.includes(prev.currentLayer)) {
              newState.layersCompleted = [...prev.layersCompleted, prev.currentLayer];
            }
          }
          
          return newState;
        });
      } else {
        throw new Error(data.error || 'Failed to get response from AI');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message);
      
      // Add error message to conversation
      const errorMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err.message}. Please try again.`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-panel-strong p-6 mb-4 mt-4 rounded-2xl animate-fade-in">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          AI Scoper
        </h1>
        <p className="text-ai-text-secondary text-center text-base">
          Transform your business challenges into actionable project plans
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-error-bg border border-error-border text-red-100 p-4 mx-4 mb-4 rounded-xl flex justify-between items-center animate-slide-up">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
          <button 
            onClick={clearError}
            className="text-red-100 hover:text-white ml-4 p-1 rounded-full hover:bg-red-500/20 transition-colors duration-200"
            aria-label="Close error message"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Analysis Progress */}
      <AnalysisProgress analysisState={analysisState} />

      {/* Messages Container */}
      <div className="flex-1 glass-panel rounded-2xl mb-4 overflow-hidden">
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
          analysisState={analysisState}
        />
      </div>

      {/* Input Container */}
      <div className="glass-panel-strong rounded-2xl mb-4">
        <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;