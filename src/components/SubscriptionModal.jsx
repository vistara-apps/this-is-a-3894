import React from 'react'
import { Check, X } from 'lucide-react'

export function SubscriptionModal({ onClose, onSubscribe }) {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      period: '/month',
      features: [
        'Full access to cheat sheets',
        'Scenario-based search',
        'Email support',
        'Mobile access'
      ],
      tier: 'basic',
      popular: false
    },
    {
      name: 'Pro',
      price: '$15',
      period: '/month',
      features: [
        'Everything in Basic',
        'Document template generation',
        'Legal resource hub',
        'Priority support',
        'Custom templates'
      ],
      tier: 'pro',
      popular: true
    }
  ]

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
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.tier}
                className={`relative p-6 rounded-lg border-2 transition-colors duration-150 ${
                  plan.popular
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-surface'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
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
                  onClick={() => onSubscribe(plan.tier)}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-150 ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-surface border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  Subscribe to {plan.name}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-text-secondary">
            <p>Cancel anytime. No hidden fees. 30-day money-back guarantee.</p>
          </div>
        </div>
      </div>
    </div>
  )
}