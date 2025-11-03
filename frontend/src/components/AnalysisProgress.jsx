import React from 'react';

const AnalysisProgress = ({ analysisState }) => {
  const { currentLayer, layersCompleted, goalType, businessMatrix, analysisComplete } = analysisState;

  const layers = [
    { id: 1, name: 'Goals', description: 'Goal Identification' },
    { id: 2, name: 'Signals', description: 'Signal Collection' },
    { id: 3, name: 'SMART Metrics', description: 'Success Metrics' }
  ];

  const getLayerStatus = (layerId) => {
    if (layersCompleted.includes(layerId)) return 'completed';
    if (layerId === currentLayer) return 'current';
    return 'pending';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'current':
        return (
          <div className="w-5 h-5 rounded-full bg-blue-400 animate-pulse flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full border-2 border-gray-400 bg-transparent"></div>
        );
    }
  };

  const formatGoalType = (type) => {
    if (!type) return null;
    return type === 'problem-solving' ? 'Problem Solving' : 'Idea Execution';
  };

  const formatBusinessMatrix = (matrix) => {
    if (!matrix.relationship || !matrix.domain) return null;
    
    const relationshipMap = {
      'owner-company': 'Owner ↔ Company',
      'owner-employee': 'Owner ↔ Employee',
      'employee-company': 'Employee ↔ Company'
    };
    
    const domainMap = {
      'actors': 'Actors & Interfaces',
      'information': 'Information & Artifacts',
      'processes': 'Processes & Controls'
    };
    
    return {
      relationship: relationshipMap[matrix.relationship],
      domain: domainMap[matrix.domain]
    };
  };

  // Don't show progress if no analysis has started
  if (currentLayer === 1 && layersCompleted.length === 0 && !goalType) {
    return null;
  }

  return (
    <div className="glass-panel-strong p-4 mb-4 rounded-xl animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Analysis Progress</h3>
        {analysisComplete && (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
            Complete
          </span>
        )}
      </div>
      
      {/* Layer Progress */}
      <div className="space-y-3 mb-4">
        {layers.map((layer) => {
          const status = getLayerStatus(layer.id);
          return (
            <div key={layer.id} className="flex items-center space-x-3">
              {getStatusIcon(status)}
              <div className="flex-1">
                <div className={`font-medium ${
                  status === 'completed' ? 'text-green-400' :
                  status === 'current' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  Layer {layer.id}: {layer.name}
                </div>
                <div className="text-sm text-ai-text-secondary">
                  {layer.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Business Context */}
      {(goalType || businessMatrix.relationship || businessMatrix.domain) && (
        <div className="border-t border-white/10 pt-4 space-y-2">
          <h4 className="text-sm font-medium text-white mb-2">Business Context</h4>
          
          {goalType && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-sm text-ai-text-secondary">
                Goal Type: <span className="text-white font-medium">{formatGoalType(goalType)}</span>
              </span>
            </div>
          )}
          
          {formatBusinessMatrix(businessMatrix) && (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-sm text-ai-text-secondary">
                  Relationship: <span className="text-white font-medium">
                    {formatBusinessMatrix(businessMatrix).relationship}
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm text-ai-text-secondary">
                  Domain: <span className="text-white font-medium">
                    {formatBusinessMatrix(businessMatrix).domain}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisProgress;