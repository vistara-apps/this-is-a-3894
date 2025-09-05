import React from 'react'
import { Download, Lock, FileText } from 'lucide-react'

export function DocumentTemplateCard({ template, scenario, userTier, onAccess }) {
  const canAccess = userTier !== 'free'

  return (
    <div className="card hover:shadow-lg transition-shadow duration-250 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <FileText className="w-5 h-5 text-accent" />
        {!canAccess && (
          <Lock className="w-4 h-4 text-text-secondary" />
        )}
      </div>
      
      <h3 className="font-semibold text-text-primary mb-2 leading-tight">
        {template.title}
      </h3>
      
      <p className="text-text-secondary text-sm mb-4">
        Professional template for {scenario.title.toLowerCase()}
      </p>
      
      <div className="mb-4">
        <p className="text-xs text-text-secondary mb-2">Required fields:</p>
        <div className="flex flex-wrap gap-1">
          {template.requiredFields.slice(0, 3).map((field) => (
            <span
              key={field}
              className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full"
            >
              {field}
            </span>
          ))}
          {template.requiredFields.length > 3 && (
            <span className="text-xs text-text-secondary">
              +{template.requiredFields.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <button
        onClick={onAccess}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-150 flex items-center justify-center space-x-2 ${
          canAccess
            ? 'bg-accent text-white hover:bg-accent/90'
            : 'bg-gray-100 text-text-secondary cursor-not-allowed'
        }`}
        disabled={!canAccess}
      >
        <Download className="w-4 h-4" />
        <span>{canAccess ? 'Generate Template' : 'Upgrade to Access'}</span>
      </button>
    </div>
  )
}