import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types for TypeScript-like documentation
export const DatabaseSchema = {
  users: {
    userId: 'uuid',
    email: 'string',
    subscriptionTier: 'string', // 'free', 'basic', 'pro'
    createdAt: 'timestamp'
  },
  legal_scenarios: {
    scenarioId: 'uuid',
    title: 'string',
    description: 'string',
    keywords: 'string[]'
  },
  cheat_sheets: {
    cheatSheetId: 'uuid',
    scenarioId: 'uuid',
    title: 'string',
    content: 'string',
    plainTextSummary: 'string',
    isFree: 'boolean'
  },
  document_templates: {
    templateId: 'uuid',
    scenarioId: 'uuid',
    title: 'string',
    templateContent: 'string',
    requiredFields: 'string[]'
  }
}
