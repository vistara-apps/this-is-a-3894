import React from 'react'
import { FileText, Lock, Star } from 'lucide-react'

export function CheatSheetCard({ cheatSheet, scenario, userTier, onAccess }) {
  const canAccess = userTier !== 'free' || cheatSheet.isFree

  return (
    <div className="card hover:shadow-lg transition-shadow duration-250 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-primary" />
          {cheatSheet.isFree && (
            <Star className="w-4 h-4 text-accent" title="Free content" />
          )}
        </div>
        {!canAccess && (
          <Lock className="w-4 h-4 text-text-secondary" />
        )}
      </div>
      
      <h3 className="font-semibold text-text-primary mb-2 leading-tight">
        {cheatSheet.title}
      </h3>
      
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {cheatSheet.plainTextSummary}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {scenario.keywords.slice(0, 3).map((keyword) => (
          <span
            key={keyword}
            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
          >
            {keyword}
          </span>
        ))}
      </div>
      
      <button
        onClick={onAccess}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-150 ${
          canAccess
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-gray-100 text-text-secondary cursor-not-allowed'
        }`}
        disabled={!canAccess}
      >
        {canAccess ? 'Read Cheat Sheet' : 'Upgrade to Access'}
      </button>
    </div>
  )
}