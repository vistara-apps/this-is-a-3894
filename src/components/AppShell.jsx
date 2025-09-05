import React from 'react'
import { Scale, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function AppShell({ children, userTier = 'free', isAuthenticated = false, onAuthClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tierColors = {
    free: 'text-text-secondary',
    basic: 'text-accent',
    pro: 'text-primary'
  }

  const tierLabels = {
    free: 'Free',
    basic: 'Basic',
    pro: 'Pro'
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Scale className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-text-primary">LegalEase</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                Cheat Sheets
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                Templates
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                Resources
              </a>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${tierColors[userTier]}`}>
                  {tierLabels[userTier]} Plan
                </span>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <User className="w-5 h-5" />
                    <span className="text-sm">Account</span>
                  </div>
                ) : (
                  <button
                    onClick={onAuthClick}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors py-2">
                  Cheat Sheets
                </a>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors py-2">
                  Templates
                </a>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors py-2">
                  Resources
                </a>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${tierColors[userTier]}`}>
                      {tierLabels[userTier]} Plan
                    </span>
                    {isAuthenticated ? (
                      <div className="flex items-center space-x-2 text-text-secondary">
                        <User className="w-5 h-5" />
                        <span className="text-sm">Account</span>
                      </div>
                    ) : (
                      <button
                        onClick={onAuthClick}
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold text-text-primary">LegalEase</span>
              </div>
              <p className="text-text-secondary text-sm">
                Empowering individuals with accessible legal knowledge and tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary transition-colors">Know Your Rights</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Document Templates</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Legal Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-text-secondary">
            <p>&copy; 2024 LegalEase. All rights reserved. This is not legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
