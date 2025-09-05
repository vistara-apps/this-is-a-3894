import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
})

/**
 * Generates a plain English summary of legal content
 * @param {string} legalContent - The complex legal text to summarize
 * @returns {Promise<string>} - Plain English summary
 */
export async function generatePlainEnglishSummary(legalContent) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a legal expert who explains complex legal concepts in simple, plain English that anyone can understand. Focus on practical implications and actionable information.'
        },
        {
          role: 'user',
          content: `Please summarize this legal information in plain English, focusing on what it means for the average person and what actions they can take:\n\n${legalContent}`
        }
      ],
      max_tokens: 300,
      temperature: 0.3
    })

    return response.choices[0]?.message?.content || 'Summary not available'
  } catch (error) {
    console.error('Error generating summary:', error)
    return 'Unable to generate summary at this time'
  }
}

/**
 * Generates a legal document template based on user inputs
 * @param {string} templateType - Type of document (e.g., 'demand_letter', 'complaint')
 * @param {Object} userInputs - User-provided information for the template
 * @returns {Promise<string>} - Generated document content
 */
export async function generateDocumentTemplate(templateType, userInputs) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a legal document assistant. Generate professional, legally appropriate document templates based on user inputs. Include placeholders for information that needs to be customized. Always include disclaimers that this is not legal advice.'
        },
        {
          role: 'user',
          content: `Generate a ${templateType} template with the following information: ${JSON.stringify(userInputs)}`
        }
      ],
      max_tokens: 800,
      temperature: 0.2
    })

    return response.choices[0]?.message?.content || 'Template generation failed'
  } catch (error) {
    console.error('Error generating template:', error)
    return 'Unable to generate template at this time'
  }
}

/**
 * Enhances search by finding relevant legal scenarios based on user query
 * @param {string} query - User's search query
 * @param {Array} scenarios - Available legal scenarios
 * @returns {Promise<Array>} - Ranked scenarios by relevance
 */
export async function enhanceSearch(query, scenarios) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a legal search assistant. Given a user query and a list of legal scenarios, rank the scenarios by relevance to the query. Return only the scenario IDs in order of relevance, separated by commas.'
        },
        {
          role: 'user',
          content: `Query: "${query}"\n\nScenarios: ${JSON.stringify(scenarios.map(s => ({ id: s.scenarioId, title: s.title, keywords: s.keywords })))}\n\nReturn the scenario IDs in order of relevance:`
        }
      ],
      max_tokens: 100,
      temperature: 0.1
    })

    const rankedIds = response.choices[0]?.message?.content
      ?.split(',')
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id)) || []

    // Reorder scenarios based on AI ranking
    const rankedScenarios = []
    rankedIds.forEach(id => {
      const scenario = scenarios.find(s => s.scenarioId === id)
      if (scenario) rankedScenarios.push(scenario)
    })

    // Add any remaining scenarios that weren't ranked
    scenarios.forEach(scenario => {
      if (!rankedScenarios.find(s => s.scenarioId === scenario.scenarioId)) {
        rankedScenarios.push(scenario)
      }
    })

    return rankedScenarios
  } catch (error) {
    console.error('Error enhancing search:', error)
    return scenarios // Return original order if AI enhancement fails
  }
}
