import React, { useState } from 'react'
import { Check, X, Loader2, Crown, Zap } from 'lucide-react'
import { subscriptionPlans } from '../lib/stripe'
import useStore from '../store/useStore'
import toast from 'react-hot-toast'

export function SubscriptionModal({ onClose, onSubscribe }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { subscribe } = useStore()
  const plans = [
    {
      name: 'Basic',
      price: `$${subscriptionPlans.basic.price}`,
      period: '/month',
      features: subscriptionPlans.basic.features,
      tier: 'basic',
      popular: false,
      icon: Zap,
      buttonClass: 'bg-primary text-white hover:bg-primary/90'
    },
    {
      name: 'Pro',
      price: `$${subscriptionPlans.pro.price}`,
      period: '/month',
      features: subscriptionPlans.pro.features,
      tier: 'pro',
      popular: true,
      icon: Crown,
      buttonClass: 'bg-accent text-white hover:bg-accent/90'
    }
  ]

  const handleSubscribe = async (planTier) => {
    setIsLoading(true)
    setSelectedPlan(planTier)
    
    try {
      const result = await subscribe(planTier)
      
      if (result.success) {
        toast.success(`Successfully subscribed to ${planTier} plan!`)
        onSubscribe(planTier)
        onClose()
      } else {
        toast.error(result.error || 'Subscription failed')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              Upgrade Your Access
            </h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary p-2"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isCurrentlyLoading = isLoading && selectedPlan === plan.tier
              
              return (
                <div
                  key={plan.tier}
                  className={`relative p-6 rounded-lg border-2 transition-all duration-150 ${
                    plan.popular
                      ? 'border-accent bg-accent/5'
                      : 'border-border bg-surface'
                  } ${isLoading && selectedPlan !== plan.tier ? 'opacity-50' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        plan.popular ? 'bg-accent/10' : 'bg-primary/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          plan.popular ? 'text-accent' : 'text-primary'
                        }`} />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-text-primary">
                        {plan.price}
                      </span>
                      <span className="text-text-secondary ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-text-primary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.tier)}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${plan.buttonClass}`}
                  >
                    {isCurrentlyLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Subscribe to ${plan.name}`
                    )}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo Mode:</strong> This is a demonstration. No actual payment will be processed.
              Subscription will be simulated for testing purposes.
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-text-secondary">
            <p>Cancel anytime. No hidden fees. 30-day money-back guarantee.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
