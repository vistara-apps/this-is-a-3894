import React, { useState } from 'react'
import { X, Download, Loader2, FileText, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { generateTemplatePDF } from '../lib/pdfGenerator'
import { generateDocumentTemplate } from '../lib/openai'
import toast from 'react-hot-toast'

export function TemplateGeneratorModal({ isOpen, onClose, template, userTier }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [step, setStep] = useState(1) // 1: form, 2: preview, 3: download
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm()

  // Common form fields for legal documents
  const getFormFields = () => {
    const templateType = template?.title?.toLowerCase() || ''
    
    if (templateType.includes('demand letter') || templateType.includes('complaint')) {
      return [
        { name: 'yourName', label: 'Your Full Name', type: 'text', required: true },
        { name: 'yourAddress', label: 'Your Address', type: 'textarea', required: true },
        { name: 'recipientName', label: 'Recipient Name', type: 'text', required: true },
        { name: 'recipientAddress', label: 'Recipient Address', type: 'textarea', required: true },
        { name: 'issueDescription', label: 'Description of Issue', type: 'textarea', required: true },
        { name: 'desiredOutcome', label: 'What You Want Done', type: 'textarea', required: true },
        { name: 'deadline', label: 'Response Deadline', type: 'date', required: false }
      ]
    } else if (templateType.includes('lease') || templateType.includes('rental')) {
      return [
        { name: 'landlordName', label: 'Landlord Name', type: 'text', required: true },
        { name: 'tenantName', label: 'Tenant Name', type: 'text', required: true },
        { name: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
        { name: 'rentAmount', label: 'Monthly Rent Amount', type: 'number', required: true },
        { name: 'leaseStartDate', label: 'Lease Start Date', type: 'date', required: true },
        { name: 'leaseEndDate', label: 'Lease End Date', type: 'date', required: true }
      ]
    } else {
      // Generic form fields
      return [
        { name: 'yourName', label: 'Your Full Name', type: 'text', required: true },
        { name: 'yourAddress', label: 'Your Address', type: 'textarea', required: true },
        { name: 'otherPartyName', label: 'Other Party Name', type: 'text', required: true },
        { name: 'description', label: 'Description/Details', type: 'textarea', required: true },
        { name: 'date', label: 'Date', type: 'date', required: false }
      ]
    }
  }

  const formFields = getFormFields()

  const onSubmit = async (data) => {
    setIsGenerating(true)
    try {
      // Generate AI-enhanced content if OpenAI is available
      let content = template.templateContent || template.content || ''
      
      if (import.meta.env.VITE_OPENAI_API_KEY) {
        const aiContent = await generateDocumentTemplate(template.title, data)
        if (aiContent && aiContent !== 'Unable to generate template at this time') {
          content = aiContent
        }
      }
      
      setGeneratedContent(content)
      setStep(2)
      toast.success('Template generated successfully!')
    } catch (error) {
      toast.error('Failed to generate template')
      console.error('Template generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    try {
      const formData = getValues()
      const result = generateTemplatePDF(
        { 
          ...template, 
          templateContent: generatedContent || template.templateContent 
        }, 
        formData
      )
      
      if (result.success) {
        toast.success(`Downloaded: ${result.fileName}`)
        setStep(3)
      } else {
        toast.error('Failed to generate PDF')
      }
    } catch (error) {
      toast.error('Failed to download template')
      console.error('PDF generation error:', error)
    }
  }

  const handleClose = () => {
    setStep(1)
    setGeneratedContent('')
    reset()
    onClose()
  }

  if (!isOpen || !template) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-modal">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Generate Document Template
            </h2>
            <p className="text-text-secondary">{template.title}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Form */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Document Information
                </h3>
                <p className="text-text-secondary">
                  Fill in the required information to customize your document template.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formFields.map((field) => (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          {...register(field.name, {
                            required: field.required ? `${field.label} is required` : false
                          })}
                          rows={3}
                          className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          {...register(field.name, {
                            required: field.required ? `${field.label} is required` : false
                          })}
                          className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={field.type !== 'date' ? `Enter ${field.label.toLowerCase()}` : ''}
                        />
                      )}
                      
                      {errors[field.name] && (
                        <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Template
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Preview */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Document Preview
                </h3>
                <p className="text-text-secondary">
                  Review your generated document before downloading.
                </p>
              </div>

              <div className="bg-gray-50 border border-border rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-text-primary">
                    {generatedContent || template.templateContent || 'No content available'}
                  </pre>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  ← Back to Edit
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-accent text-white px-6 py-2 rounded-md hover:bg-accent/90 transition-colors flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Document Downloaded Successfully!
              </h3>
              <p className="text-text-secondary mb-6">
                Your customized legal document has been generated and downloaded.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-yellow-800 mb-1">Important Disclaimer</p>
                    <p className="text-sm text-yellow-700">
                      This document template is for informational purposes only and does not constitute legal advice. 
                      Please consult with a qualified attorney before using this document for legal purposes.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
