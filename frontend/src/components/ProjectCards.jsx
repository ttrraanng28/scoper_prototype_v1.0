import React, { useState } from 'react';

const ProjectCards = ({ projectCards, onCardSelect }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const getApproachIcon = (approach) => {
    switch (approach) {
      case 'sop-first':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
          </svg>
        );
      case 'role-first':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'tech-first':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
          </svg>
        );
      case 'quick-win':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getApproachColor = (approach) => {
    switch (approach) {
      case 'sop-first':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'role-first':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'tech-first':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'quick-win':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const formatApproachName = (approach) => {
    switch (approach) {
      case 'sop-first':
        return 'SOP First';
      case 'role-first':
        return 'Role First';
      case 'tech-first':
        return 'Tech First';
      case 'quick-win':
        return 'Quick Win';
      default:
        return approach;
    }
  };

  const handleCardClick = (card, index) => {
    setSelectedCard(selectedCard === index ? null : index);
    if (onCardSelect) {
      onCardSelect(card);
    }
  };

  if (!projectCards || projectCards.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center space-x-2 mb-4">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-semibold text-white">Project Recommendations</h3>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {projectCards.map((card, index) => (
          <div
            key={index}
            className={`glass-panel-strong rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              selectedCard === index ? 'ring-2 ring-white/30' : ''
            }`}
            onClick={() => handleCardClick(card, index)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {card.title}
                </h4>
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getApproachColor(card.approach)}`}>
                  {getApproachIcon(card.approach)}
                  <span className="text-sm font-medium">
                    {formatApproachName(card.approach)}
                  </span>
                </div>
              </div>
            </div>

            {/* Goal Statement */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-white mb-2">Goal</h5>
              <p className="text-sm text-ai-text-secondary leading-relaxed">
                {card.goalStatement}
              </p>
            </div>

            {/* Why Now */}
            {card.whyNow && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-white mb-2">Why Now</h5>
                <p className="text-sm text-ai-text-secondary leading-relaxed">
                  {card.whyNow}
                </p>
              </div>
            )}

            {/* Expanded Details */}
            {selectedCard === index && (
              <div className="space-y-4 border-t border-white/10 pt-4 animate-slide-down">
                {/* Team Responsibilities */}
                {card.teamwork && (
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Team Responsibilities</h5>
                    <div className="space-y-2 text-sm text-ai-text-secondary">
                      {card.teamwork.founderRole && (
                        <div>
                          <span className="text-white font-medium">Founder:</span> {card.teamwork.founderRole}
                        </div>
                      )}
                      {card.teamwork.teamMemberRole && (
                        <div>
                          <span className="text-white font-medium">Team:</span> {card.teamwork.teamMemberRole}
                        </div>
                      )}
                      {card.teamwork.externalSupport && card.teamwork.externalSupport.length > 0 && (
                        <div>
                          <span className="text-white font-medium">External:</span> {card.teamwork.externalSupport.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Success Metrics */}
                {card.successMetrics && (
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Success Metrics</h5>
                    <div className="space-y-1 text-sm text-ai-text-secondary">
                      {card.successMetrics.primary && (
                        <div>
                          <span className="text-white font-medium">Primary:</span> {card.successMetrics.primary}
                        </div>
                      )}
                      {card.successMetrics.secondary && card.successMetrics.secondary.length > 0 && (
                        <div>
                          <span className="text-white font-medium">Secondary:</span> {card.successMetrics.secondary.join(', ')}
                        </div>
                      )}
                      {card.successMetrics.timeline && (
                        <div>
                          <span className="text-white font-medium">Timeline:</span> {card.successMetrics.timeline}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Effort & Unlocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {card.estimatedEffort && (
                    <div>
                      <h5 className="text-sm font-medium text-white mb-2">Estimated Effort</h5>
                      <p className="text-sm text-ai-text-secondary">
                        {card.estimatedEffort}
                      </p>
                    </div>
                  )}
                  
                  {card.unlocks && (
                    <div>
                      <h5 className="text-sm font-medium text-white mb-2">Unlocks</h5>
                      <p className="text-sm text-ai-text-secondary">
                        {card.unlocks}
                      </p>
                    </div>
                  )}
                </div>

                {/* Assumptions */}
                {card.assumptions && card.assumptions.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Key Assumptions</h5>
                    <ul className="space-y-1 text-sm text-ai-text-secondary">
                      {card.assumptions.map((assumption, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                          <span>{assumption}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Click indicator */}
            <div className="flex items-center justify-center mt-4 pt-3 border-t border-white/10">
              <span className="text-xs text-ai-text-secondary">
                {selectedCard === index ? 'Click to collapse' : 'Click to expand details'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;