import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export const getStripe = () => stripePromise

// Subscription plans configuration
export const subscriptionPlans = {
  basic: {
    name: 'Basic',
    price: 5,
    priceId: 'price_basic_monthly', // Replace with actual Stripe price ID
    features: [
      'Full access to cheat sheets',
      'Scenario-based search',
      'Email support'
    ]
  },
  pro: {
    name: 'Pro',
    price: 15,
    priceId: 'price_pro_monthly', // Replace with actual Stripe price ID
    features: [
      'Everything in Basic',
      'Document template generation',
      'Legal resource hub',
      'Priority support'
    ]
  }
}

/**
 * Creates a Stripe checkout session for subscription
 * @param {string} planType - 'basic' or 'pro'
 * @param {string} userEmail - User's email address
 * @returns {Promise<void>} - Redirects to Stripe checkout
 */
export async function createCheckoutSession(planType, userEmail) {
  try {
    const stripe = await getStripe()
    const plan = subscriptionPlans[planType]
    
    if (!plan) {
      throw new Error('Invalid plan type')
    }

    // In a real implementation, this would call your backend API
    // which would create the Stripe checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: plan.priceId,
        customerEmail: userEmail,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      }),
    })

    const session = await response.json()

    // Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      throw new Error(result.error.message)
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

/**
 * Mock function for demo purposes - simulates successful subscription
 * @param {string} planType - 'basic' or 'pro'
 * @returns {Promise<Object>} - Mock subscription result
 */
export async function mockSubscribe(planType) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    success: true,
    subscriptionId: `sub_mock_${Date.now()}`,
    planType,
    status: 'active'
  }
}
