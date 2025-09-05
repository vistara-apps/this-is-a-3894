export const mockData = {
  scenarios: [
    {
      scenarioId: 1,
      title: "Landlord-Tenant Disputes",
      description: "Common issues between landlords and tenants including repairs, deposits, and evictions",
      keywords: ["landlord", "tenant", "rent", "deposit", "repairs", "eviction", "lease"]
    },
    {
      scenarioId: 2,
      title: "Employment Rights & Wrongful Termination",
      description: "Understanding workplace rights, discrimination, and unlawful dismissal",
      keywords: ["employment", "firing", "discrimination", "workplace", "wages", "overtime"]
    },
    {
      scenarioId: 3,
      title: "Consumer Protection & Fraud",
      description: "Protecting yourself from scams, defective products, and unfair business practices",
      keywords: ["consumer", "fraud", "scam", "refund", "warranty", "defective"]
    },
    {
      scenarioId: 4,
      title: "Small Claims Court Procedures",
      description: "How to file and what to expect in small claims court",
      keywords: ["small claims", "court", "lawsuit", "damages", "filing"]
    },
    {
      scenarioId: 5,
      title: "Debt Collection & Credit Issues",
      description: "Dealing with debt collectors, credit reporting, and financial disputes",
      keywords: ["debt", "collection", "credit", "bankruptcy", "garnishment"]
    },
    {
      scenarioId: 6,
      title: "Family Law Basics",
      description: "Divorce, custody, child support, and domestic violence protection",
      keywords: ["divorce", "custody", "child support", "domestic violence", "family"]
    }
  ],

  cheatSheets: [
    {
      cheatSheetId: 1,
      scenarioId: 1,
      title: "Landlord Won't Make Repairs - Know Your Rights",
      content: `
        <h3>Your Rights as a Tenant</h3>
        <ul>
          <li><strong>Warranty of Habitability:</strong> Your landlord must maintain the property in livable condition</li>
          <li><strong>Essential Services:</strong> Heat, water, electricity, and plumbing must be functional</li>
          <li><strong>Response Time:</strong> Emergency repairs (24-48 hours), Non-emergency (30 days)</li>
          <li><strong>Rent Withholding:</strong> In some states, you can withhold rent for serious habitability issues</li>
        </ul>
        
        <h3>Steps to Take</h3>
        <ol>
          <li>Document the problem with photos and written records</li>
          <li>Send written notice to landlord (keep copies)</li>
          <li>Allow reasonable time for repairs</li>
          <li>Contact local housing authority if needed</li>
          <li>Consider escrow account for rent payments</li>
        </ol>
        
        <h3>Legal Remedies</h3>
        <ul>
          <li>Rent reduction for diminished use</li>
          <li>Repair and deduct (where permitted)</li>
          <li>Breaking lease without penalty</li>
          <li>Damages for temporary housing costs</li>
        </ul>
      `,
      plainTextSummary: "If your landlord won't make necessary repairs, you have legal rights including the warranty of habitability. Document issues, provide written notice, and know your state's specific tenant remedies.",
      isFree: true
    },
    {
      cheatSheetId: 2,
      scenarioId: 2,
      title: "Wrongful Termination - What Constitutes Illegal Firing",
      content: `
        <h3>At-Will Employment vs. Wrongful Termination</h3>
        <p>Most employment is "at-will," but firing is illegal when it violates:</p>
        <ul>
          <li><strong>Discrimination Laws:</strong> Race, gender, age, religion, disability, pregnancy</li>
          <li><strong>Retaliation:</strong> For filing complaints, whistleblowing, or asserting rights</li>
          <li><strong>Contract Violations:</strong> Breach of employment contract terms</li>
          <li><strong>Public Policy:</strong> Firing for jury duty, voting, refusing illegal acts</li>
        </ul>
        
        <h3>Protected Activities</h3>
        <ul>
          <li>Filing discrimination or harassment complaints</li>
          <li>Reporting safety violations (OSHA)</li>
          <li>Taking legally protected leave (FMLA)</li>
          <li>Discussing wages with coworkers</li>
          <li>Union organizing activities</li>
        </ul>
        
        <h3>Evidence to Collect</h3>
        <ul>
          <li>Employment records and performance reviews</li>
          <li>Documentation of protected activities</li>
          <li>Witness statements</li>
          <li>Company policies and procedures</li>
          <li>Communications about the termination</li>
        </ul>
      `,
      plainTextSummary: "While most employment is at-will, firing becomes illegal when it's based on discrimination, retaliation for protected activities, or violation of employment contracts.",
      isFree: false
    },
    {
      cheatSheetId: 3,
      scenarioId: 3,
      title: "Consumer Fraud Protection - Your Rights Against Scams",
      content: `
        <h3>Types of Consumer Fraud</h3>
        <ul>
          <li><strong>Identity Theft:</strong> Unauthorized use of personal information</li>
          <li><strong>Credit Card Fraud:</strong> Unauthorized charges or account opening</li>
          <li><strong>Online Scams:</strong> Phishing, fake websites, advance fee fraud</li>
          <li><strong>Telemarketing Fraud:</strong> Robocalls, fake charities, prize scams</li>
          <li><strong>Auto Fraud:</strong> Odometer tampering, undisclosed damage</li>
        </ul>
        
        <h3>Federal Protection Laws</h3>
        <ul>
          <li><strong>Fair Credit Billing Act:</strong> Dispute billing errors</li>
          <li><strong>Fair Debt Collection Practices Act:</strong> Protection from abusive collectors</li>
          <li><strong>Truth in Lending Act:</strong> Disclosure of credit terms</li>
          <li><strong>FTC Act:</strong> Protection from unfair business practices</li>
        </ul>
        
        <h3>Steps to Take If Scammed</h3>
        <ol>
          <li>Stop all contact with the scammer immediately</li>
          <li>Document everything (emails, receipts, phone records)</li>
          <li>Contact your bank/credit card company</li>
          <li>File reports with FTC, FBI IC3, and local police</li>
          <li>Place fraud alerts on credit reports</li>
          <li>Consider legal action for damages</li>
        </ol>
      `,
      plainTextSummary: "Consumer fraud protection includes federal laws that give you rights to dispute charges, seek refunds, and take legal action against fraudulent businesses.",
      isFree: true
    },
    {
      cheatSheetId: 4,
      scenarioId: 4,
      title: "Small Claims Court - Filing and Procedures",
      content: `
        <h3>What is Small Claims Court?</h3>
        <p>A simplified court for resolving disputes involving smaller amounts of money (typically $2,500-$10,000 depending on state).</p>
        
        <h3>Types of Cases</h3>
        <ul>
          <li>Unpaid debts and loans</li>
          <li>Property damage claims</li>
          <li>Breach of contract</li>
          <li>Security deposit disputes</li>
          <li>Consumer complaints</li>
          <li>Minor personal injury</li>
        </ul>
        
        <h3>Filing Process</h3>
        <ol>
          <li><strong>Determine Jurisdiction:</strong> File where defendant lives or business is located</li>
          <li><strong>Complete Forms:</strong> Plaintiff's claim form with case details</li>
          <li><strong>Pay Filing Fee:</strong> Usually $30-$100, may be waived for low income</li>
          <li><strong>Serve the Defendant:</strong> Official notice of the lawsuit</li>
          <li><strong>Prepare Evidence:</strong> Contracts, receipts, photos, witness statements</li>
        </ol>
        
        <h3>Court Day Tips</h3>
        <ul>
          <li>Arrive early and dress professionally</li>
          <li>Bring organized evidence and witnesses</li>
          <li>Tell your story clearly and chronologically</li>
          <li>Be respectful to judge and opposing party</li>
          <li>Ask for specific monetary damages</li>
        </ul>
      `,
      plainTextSummary: "Small claims court is an accessible way to resolve disputes under $10,000. The process involves filing forms, serving the defendant, and presenting your case with evidence.",
      isFree: false
    },
    {
      cheatSheetId: 5,
      scenarioId: 5,
      title: "Debt Collection - Your Rights Under FDCPA",
      content: `
        <h3>Fair Debt Collection Practices Act (FDCPA)</h3>
        <p>Federal law that regulates how debt collectors can contact and treat consumers.</p>
        
        <h3>Prohibited Debt Collector Actions</h3>
        <ul>
          <li><strong>Harassment:</strong> Repeated calls, profanity, threats of violence</li>
          <li><strong>False Statements:</strong> Lying about debt amount, legal consequences</li>
          <li><strong>Unfair Practices:</strong> Collecting more than owed, depositing post-dated checks early</li>
          <li><strong>Wrong Time/Place:</strong> Calling before 8 AM or after 9 PM</li>
          <li><strong>Third Party Contact:</strong> Discussing your debt with others</li>
        </ul>
        
        <h3>Your Rights</h3>
        <ul>
          <li><strong>Debt Validation:</strong> Request proof that you owe the debt</li>
          <li><strong>Cease Communication:</strong> Tell collectors to stop contacting you</li>
          <li><strong>Dispute the Debt:</strong> Challenge incorrect information</li>
          <li><strong>Sue for Violations:</strong> Up to $1,000 in damages plus attorney fees</li>
        </ul>
        
        <h3>Debt Validation Letter</h3>
        <p>Within 30 days of first contact, request:</p>
        <ul>
          <li>Amount of debt</li>
          <li>Name of creditor</li>
          <li>Proof you owe the debt</li>
          <li>Verification of collector's authority</li>
        </ul>
      `,
      plainTextSummary: "The Fair Debt Collection Practices Act protects you from abusive debt collectors. You have the right to verify debts, stop communication, and sue for violations.",
      isFree: false
    },
    {
      cheatSheetId: 6,
      scenarioId: 6,
      title: "Family Law - Divorce and Custody Basics",
      content: `
        <h3>Types of Divorce</h3>
        <ul>
          <li><strong>No-Fault Divorce:</strong> Irreconcilable differences, no blame assigned</li>
          <li><strong>Fault-Based Divorce:</strong> Adultery, abuse, abandonment (available in some states)</li>
          <li><strong>Uncontested:</strong> Both parties agree on all terms</li>
          <li><strong>Contested:</strong> Disagreement requiring court resolution</li>
        </ul>
        
        <h3>Child Custody Types</h3>
        <ul>
          <li><strong>Physical Custody:</strong> Where child lives day-to-day</li>
          <li><strong>Legal Custody:</strong> Decision-making authority for child</li>
          <li><strong>Joint Custody:</strong> Shared physical and/or legal custody</li>
          <li><strong>Sole Custody:</strong> One parent has primary responsibility</li>
        </ul>
        
        <h3>Child Support Guidelines</h3>
        <ul>
          <li>Based on both parents' income</li>
          <li>Considers time spent with each parent</li>
          <li>Includes healthcare and childcare costs</li>
          <li>Can be modified when circumstances change</li>
          <li>Enforcement through wage garnishment</li>
        </ul>
        
        <h3>Domestic Violence Protection</h3>
        <ul>
          <li><strong>Restraining Orders:</strong> Court orders to stop contact/harassment</li>
          <li><strong>Emergency Orders:</strong> Immediate protection (24-48 hours)</li>
          <li><strong>Permanent Orders:</strong> Long-term protection (1-5 years)</li>
          <li><strong>Violation Consequences:</strong> Criminal charges and arrest</li>
        </ul>
      `,
      plainTextSummary: "Family law covers divorce types, child custody arrangements, support calculations, and domestic violence protection through restraining orders.",
      isFree: false
    }
  ],

  documentTemplates: [
    {
      templateId: 1,
      scenarioId: 1,
      title: "Demand Letter for Repairs",
      templateContent: `
        [Your Name]
        [Your Address]
        [City, State, ZIP]
        [Date]

        [Landlord's Name]
        [Landlord's Address]
        [City, State, ZIP]

        RE: Demand for Repairs - [Property Address]

        Dear [Landlord's Name],

        I am writing to formally request immediate repairs to the following issues at the rental property located at [Property Address]:

        [List of Repair Issues]

        These conditions violate the warranty of habitability and may pose health and safety risks. Under [State] law, you are required to maintain the premises in habitable condition.

        Please complete these repairs within [Number] days of receiving this notice. If repairs are not completed, I may be forced to pursue legal remedies including rent withholding, repair and deduct, or termination of the lease.

        I look forward to your prompt attention to this matter.

        Sincerely,
        [Your Signature]
        [Your Printed Name]
      `,
      requiredFields: ["Landlord Name", "Property Address", "Repair Issues", "Timeline", "Your Name"]
    },
    {
      templateId: 2,
      scenarioId: 2,
      title: "Wrongful Termination Complaint Letter",
      templateContent: `
        [Your Name]
        [Your Address]
        [City, State, ZIP]
        [Date]

        [HR Director/Manager Name]
        [Company Name]
        [Company Address]
        [City, State, ZIP]

        RE: Formal Complaint Regarding Wrongful Termination

        Dear [HR Director/Manager Name],

        I am writing to formally object to my termination on [Date of Termination]. I believe my dismissal was wrongful and in violation of [Federal/State] employment laws.

        The termination appears to be in retaliation for [Protected Activity] and/or based on [Protected Characteristic]. Specifically:

        [Details of Protected Activity or Discrimination]

        I have documentation supporting my claims, including [List of Evidence].

        I request immediate reinstatement and compensation for lost wages and benefits. Please contact me within [Number] days to discuss resolution of this matter.

        If this matter is not resolved satisfactorily, I will be forced to file complaints with the appropriate government agencies and consider legal action.

        Sincerely,
        [Your Signature]
        [Your Printed Name]
      `,
      requiredFields: ["Company Name", "HR Contact", "Termination Date", "Protected Activity", "Evidence List"]
    },
    {
      templateId: 3,
      scenarioId: 3,
      title: "Consumer Complaint Letter",
      templateContent: `
        [Your Name]
        [Your Address]
        [City, State, ZIP]
        [Date]

        [Business Name]
        [Business Address]
        [City, State, ZIP]

        RE: Complaint Regarding [Product/Service]

        Dear Customer Service Manager,

        I am writing to express my dissatisfaction with [Product/Service] purchased on [Date] for $[Amount].

        The problem is: [Detailed Description of Issue]

        This issue violates [Warranty/Consumer Protection Law] and has caused me [Specific Damages].

        To resolve this matter, I request: [Specific Resolution Sought]

        I have attached copies of [Supporting Documentation].

        Please respond within [Number] days with your plan to resolve this matter. If I do not receive a satisfactory response, I will file complaints with the Better Business Bureau, state attorney general, and consider legal action.

        I look forward to your prompt response.

        Sincerely,
        [Your Signature]
        [Your Printed Name]
      `,
      requiredFields: ["Business Name", "Product/Service", "Purchase Date", "Issue Description", "Resolution Sought"]
    },
    {
      templateId: 4,
      scenarioId: 4,
      title: "Small Claims Court Filing",
      templateContent: `
        PLAINTIFF'S CLAIM AND ORDER TO GO TO SMALL CLAIMS COURT

        Case Number: [To be assigned by court]
        
        Plaintiff (Person suing):
        Name: [Your Name]
        Address: [Your Address]
        Phone: [Your Phone]

        Defendant (Person being sued):
        Name: [Defendant Name]
        Address: [Defendant Address]

        Amount of Claim: $[Amount]

        Why the defendant owes this money:
        [Detailed explanation of the dispute, including dates, agreements, and damages]

        I have asked the defendant to pay this money, but it has not been paid.

        I understand that:
        - By filing this claim, I may be sued back by the defendant
        - I cannot sue in small claims court for the same claim again
        - The judgment may be collected from my assets if I lose

        I declare under penalty of perjury that the information above is true and correct.

        Date: [Date]
        Signature: [Your Signature]
        Print Name: [Your Printed Name]
      `,
      requiredFields: ["Defendant Name", "Defendant Address", "Claim Amount", "Dispute Details", "Your Information"]
    },
    {
      templateId: 5,
      scenarioId: 5,
      title: "Debt Validation Request",
      templateContent: `
        [Your Name]
        [Your Address]
        [City, State, ZIP]
        [Date]

        [Debt Collector Name]
        [Collector Address]
        [City, State, ZIP]

        RE: Debt Validation Request - Account #[Account Number]

        Dear [Collector Name],

        This letter is sent in response to your recent contact regarding the collection of a debt. This is a formal request for validation of this debt.

        Under the Fair Debt Collection Practices Act (FDCPA), I have the right to request validation of any debt you claim I owe. Please provide the following information:

        1. The name and address of the original creditor
        2. Verification that you have the right to collect this debt
        3. The original amount of the debt
        4. A copy of the original signed agreement creating this debt
        5. A complete payment history from the original creditor

        Until you provide this validation, you must cease all collection activities.

        Please note that I am disputing this debt and requesting validation. This is not an acknowledgment that I owe this debt.

        Sincerely,
        [Your Signature]
        [Your Printed Name]
      `,
      requiredFields: ["Collector Name", "Collector Address", "Account Number", "Your Information"]
    },
    {
      templateId: 6,
      scenarioId: 6,
      title: "Petition for Restraining Order",
      templateContent: `
        PETITION FOR DOMESTIC VIOLENCE RESTRAINING ORDER

        Case Number: [To be assigned by court]

        Petitioner (Protected Person):
        Name: [Your Name]
        Address: [Confidential - to be provided to court clerk]

        Respondent (Person to be Restrained):
        Name: [Respondent Name]
        Address: [Respondent Address]
        Physical Description: [Height, Weight, Hair, Eyes]

        Relationship to Respondent: [Spouse, Ex-spouse, Dating partner, etc.]

        Facts Supporting This Request:
        [Detailed description of abuse/threats with dates and locations]

        Orders Requested:
        □ Respondent must not contact, harass, or come near me
        □ Respondent must stay away from my home, work, and children's school
        □ Respondent must move out of our shared residence
        □ Other: [Specify]

        I declare under penalty of perjury that the above is true and correct.

        Date: [Date]
        Signature: [Your Signature]
        Print Name: [Your Printed Name]

        EMERGENCY: If you are in immediate danger, call 911
      `,
      requiredFields: ["Respondent Name", "Respondent Address", "Relationship", "Abuse Details", "Orders Requested"]
    }
  ]
}