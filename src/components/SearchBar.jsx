import React from 'react'
import { Search, Loader2 } from 'lucide-react'

export function SearchBar({ searchQuery, onSearchChange, placeholder, isLoading = false }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        {isLoading ? (
          <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5 animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
        )}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-150 bg-surface text-text-primary"
          disabled={isLoading}
        />
      </div>
      
      {/* Search suggestions */}
      {searchQuery === '' && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-white/80">Popular searches:</span>
          {['landlord disputes', 'employment rights', 'consumer protection', 'small claims court'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSearchChange(suggestion)}
              className="px-3 py-1 text-sm bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors duration-150"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
