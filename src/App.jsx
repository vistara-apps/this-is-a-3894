import React, { useState } from 'react'
import { AppShell } from './components/AppShell'
import { SearchBar } from './components/SearchBar'
import { CheatSheetCard } from './components/CheatSheetCard'
import { DocumentTemplateCard } from './components/DocumentTemplateCard'
import { SubscriptionModal } from './components/SubscriptionModal'
import { mockData } from './data/mockData'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [userTier, setUserTier] = useState('free') // free, basic, pro
  const [activeTab, setActiveTab] = useState('cheatsheets') // cheatsheets, templates

  // Filter content based on search query
  const filteredScenarios = mockData.scenarios.filter(scenario =>
    scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scenario.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const handleCheatSheetAccess = (cheatSheet) => {
    if (userTier === 'free' && !cheatSheet.isFree) {
      setShowSubscriptionModal(true)
      return
    }
    setSelectedScenario(cheatSheet)
  }

  const handleTemplateAccess = (template) => {
    if (userTier === 'free') {
      setShowSubscriptionModal(true)
      return
    }
    // In a real app, this would generate and download the template
    alert(`Generating template: ${template.title}`)
  }

  const handleSubscribe = (tier) => {
    setUserTier(tier)
    setShowSubscriptionModal(false)
    alert(`Subscribed to ${tier} plan!`)
  }

  return (
    <AppShell userTier={userTier}>
      <div className="min-h-screen bg-bg">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-12 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Know Your Rights, Instantly
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8">
                A digital hub for individuals to quickly understand and act on their legal rights, focusing on common scenarios.
              </p>
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search legal scenarios (e.g., 'landlord won't fix heating')"
              />
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => setActiveTab('cheatsheets')}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-150 ${
                activeTab === 'cheatsheets'
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-primary border hover:bg-gray-50'
              }`}
            >
              Know Your Rights Cheat Sheets
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-150 ${
                activeTab === 'templates'
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-primary border hover:bg-gray-50'
              }`}
            >
              Document Templates
            </button>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-text-secondary">
              {searchQuery 
                ? `Found ${filteredScenarios.length} scenarios matching "${searchQuery}"`
                : `Showing all ${filteredScenarios.length} scenarios`
              }
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'cheatsheets' && filteredScenarios.map(scenario => {
              const cheatSheet = mockData.cheatSheets.find(cs => cs.scenarioId === scenario.scenarioId)
              return cheatSheet ? (
                <CheatSheetCard
                  key={cheatSheet.cheatSheetId}
                  cheatSheet={cheatSheet}
                  scenario={scenario}
                  userTier={userTier}
                  onAccess={() => handleCheatSheetAccess(cheatSheet)}
                />
              ) : null
            })}

            {activeTab === 'templates' && filteredScenarios.map(scenario => {
              const templates = mockData.documentTemplates.filter(dt => dt.scenarioId === scenario.scenarioId)
              return templates.map(template => (
                <DocumentTemplateCard
                  key={template.templateId}
                  template={template}
                  scenario={scenario}
                  userTier={userTier}
                  onAccess={() => handleTemplateAccess(template)}
                />
              ))
            })}
          </div>

          {/* No Results */}
          {filteredScenarios.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">
                No scenarios found matching your search. Try different keywords.
              </p>
            </div>
          )}
        </div>

        {/* Subscription Modal */}
        {showSubscriptionModal && (
          <SubscriptionModal
            onClose={() => setShowSubscriptionModal(false)}
            onSubscribe={handleSubscribe}
          />
        )}

        {/* Selected Cheat Sheet Detail */}
        {selectedScenario && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold text-text-primary">
                    {selectedScenario.title}
                  </h2>
                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    ✕
                  </button>
                </div>
                <div className="prose prose-gray max-w-none">
                  <div className="mb-4 p-4 bg-accent/10 rounded-md">
                    <p className="text-sm font-medium text-accent mb-2">Plain English Summary:</p>
                    <p className="text-text-primary">{selectedScenario.plainTextSummary}</p>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: selectedScenario.content }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}

export default App