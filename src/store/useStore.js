import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import { mockSubscribe } from '../lib/stripe'

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      userTier: 'free',
      isAuthenticated: false,
      
      // UI state
      searchQuery: '',
      selectedScenario: null,
      activeTab: 'cheatsheets',
      showSubscriptionModal: false,
      isLoading: false,
      
      // Data state
      scenarios: [],
      cheatSheets: [],
      documentTemplates: [],
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setUserTier: (tier) => set({ userTier: tier }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSelectedScenario: (scenario) => set({ selectedScenario: scenario }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setShowSubscriptionModal: (show) => set({ showSubscriptionModal: show }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      // Authentication actions
      signIn: async (email, password) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          })
          
          if (error) throw error
          
          set({ 
            user: data.user, 
            isAuthenticated: true,
            isLoading: false 
          })
          
          // Fetch user subscription tier
          await get().fetchUserTier()
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },
      
      signUp: async (email, password) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password
          })
          
          if (error) throw error
          
          set({ isLoading: false })
          return { success: true, message: 'Check your email for verification link' }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },
      
      signOut: async () => {
        try {
          await supabase.auth.signOut()
          set({ 
            user: null, 
            isAuthenticated: false, 
            userTier: 'free' 
          })
        } catch (error) {
          console.error('Error signing out:', error)
        }
      },
      
      // Subscription actions
      subscribe: async (planType) => {
        set({ isLoading: true })
        try {
          // For demo purposes, using mock subscription
          const result = await mockSubscribe(planType)
          
          if (result.success) {
            set({ 
              userTier: planType,
              showSubscriptionModal: false,
              isLoading: false 
            })
            
            // In a real app, update user record in database
            if (get().user) {
              await supabase
                .from('users')
                .update({ subscriptionTier: planType })
                .eq('userId', get().user.id)
            }
            
            return { success: true }
          }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },
      
      // Data fetching actions
      fetchUserTier: async () => {
        const user = get().user
        if (!user) return
        
        try {
          const { data, error } = await supabase
            .from('users')
            .select('subscriptionTier')
            .eq('userId', user.id)
            .single()
          
          if (data && !error) {
            set({ userTier: data.subscriptionTier || 'free' })
          }
        } catch (error) {
          console.error('Error fetching user tier:', error)
        }
      },
      
      fetchScenarios: async () => {
        try {
          const { data, error } = await supabase
            .from('legal_scenarios')
            .select('*')
          
          if (data && !error) {
            set({ scenarios: data })
          }
        } catch (error) {
          console.error('Error fetching scenarios:', error)
        }
      },
      
      fetchCheatSheets: async () => {
        try {
          const { data, error } = await supabase
            .from('cheat_sheets')
            .select('*')
          
          if (data && !error) {
            set({ cheatSheets: data })
          }
        } catch (error) {
          console.error('Error fetching cheat sheets:', error)
        }
      },
      
      fetchDocumentTemplates: async () => {
        try {
          const { data, error } = await supabase
            .from('document_templates')
            .select('*')
          
          if (data && !error) {
            set({ documentTemplates: data })
          }
        } catch (error) {
          console.error('Error fetching document templates:', error)
        }
      },
      
      // Initialize app data
      initializeApp: async () => {
        set({ isLoading: true })
        
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          set({ user: session.user, isAuthenticated: true })
          await get().fetchUserTier()
        }
        
        // Fetch app data (fallback to mock data if database is not set up)
        try {
          await Promise.all([
            get().fetchScenarios(),
            get().fetchCheatSheets(),
            get().fetchDocumentTemplates()
          ])
        } catch (error) {
          console.log('Using mock data - database not configured')
        }
        
        set({ isLoading: false })
      }
    }),
    {
      name: 'legalease-store',
      partialize: (state) => ({
        userTier: state.userTier,
        searchQuery: state.searchQuery,
        activeTab: state.activeTab
      })
    }
  )
)

export default useStore
