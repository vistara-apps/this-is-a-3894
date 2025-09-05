import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { AppShell } from './components/AppShell'
import { SearchBar } from './components/SearchBar'
import { CheatSheetCard } from './components/CheatSheetCard'
import { DocumentTemplateCard } from './components/DocumentTemplateCard'
import { SubscriptionModal } from './components/SubscriptionModal'
import { AuthModal } from './components/AuthModal'
import { TemplateGeneratorModal } from './components/TemplateGeneratorModal'
import { mockData } from './data/mockData'
import { enhanceSearch } from './lib/openai'
import useStore from './store/useStore'

function App() {
  // Local state for UI
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [filteredScenarios, setFilteredScenarios] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Global state from store
  const {
    searchQuery,
    setSearchQuery,
    selectedScenario,
    setSelectedScenario,
    showSubscriptionModal,
    setShowSubscriptionModal,
    userTier,
    activeTab,
    setActiveTab,
    isAuthenticated,
    initializeApp,
    scenarios,
    cheatSheets,
    documentTemplates
  } = useStore()

  // Use mock data as fallback
  const currentScenarios = scenarios.length > 0 ? scenarios : mockData.scenarios
  const currentCheatSheets = cheatSheets.length > 0 ? cheatSheets : mockData.cheatSheets
  const currentTemplates = documentTemplates.length > 0 ? documentTemplates : mockData.documentTemplates

  // Initialize app on mount
  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  // Enhanced search with AI when available
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setFilteredScenarios(currentScenarios)
        return
      }

      setIsSearching(true)
      
      try {
        // Basic filtering
        const basicFiltered = currentScenarios.filter(scenario =>
          scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scenario.keywords?.some(keyword => 
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )

        // Try AI-enhanced search if OpenAI is available
        if (import.meta.env.VITE_OPENAI_API_KEY && basicFiltered.length > 1) {
          const aiRanked = await enhanceSearch(searchQuery, basicFiltered)
          setFilteredScenarios(aiRanked)
        } else {
          setFilteredScenarios(basicFiltered)
        }
      } catch (error) {
        console.error('Search error:', error)
        // Fallback to basic search
        const basicFiltered = currentScenarios.filter(scenario =>
          scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scenario.keywords?.some(keyword => 
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
        setFilteredScenarios(basicFiltered)
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [searchQuery, currentScenarios])

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
    
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    
    setSelectedTemplate(template)
    setShowTemplateModal(true)
  }

  const handleSubscribe = (tier) => {
    // This is handled by the store now
    console.log(`Subscribed to ${tier} plan!`)
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(0, 0%, 100%)',
            color: 'hsl(220, 40%, 20%)',
            border: '1px solid hsl(220, 20%, 80%)',
          },
        }}
      />
      
      <AppShell 
        userTier={userTier} 
        isAuthenticated={isAuthenticated}
        onAuthClick={() => setShowAuthModal(true)}
      >
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
                isLoading={isSearching}
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
              const cheatSheet = currentCheatSheets.find(cs => cs.scenarioId === scenario.scenarioId)
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
              const templates = currentTemplates.filter(dt => dt.scenarioId === scenario.scenarioId)
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

        {/* Modals */}
        {showSubscriptionModal && (
          <SubscriptionModal
            onClose={() => setShowSubscriptionModal(false)}
            onSubscribe={handleSubscribe}
          />
        )}

        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        )}

        {showTemplateModal && selectedTemplate && (
          <TemplateGeneratorModal
            isOpen={showTemplateModal}
            onClose={() => {
              setShowTemplateModal(false)
              setSelectedTemplate(null)
            }}
            template={selectedTemplate}
            userTier={userTier}
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
    </>
  )
}

export default App
