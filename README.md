# LegalEase - Know Your Rights, Instantly

A digital hub for individuals to quickly understand and act on their legal rights, focusing on common scenarios.

## 🚀 Features

### Core Features
- **Know Your Rights Cheat Sheets**: Condenses complex legal information into easy-to-digest summaries
- **Scenario-Based Legal Search**: AI-powered search to find relevant legal rights based on specific situations
- **Document Template Generation**: Customizable, pre-filled templates for common legal communications
- **Subscription Tiers**: Free, Basic ($5/mo), and Pro ($15/mo) plans
- **User Authentication**: Secure user accounts with Supabase Auth
- **PDF Generation**: Download legal documents as professionally formatted PDFs

### Technical Features
- **AI Integration**: OpenAI GPT for content summarization and template generation
- **Real-time Search**: Enhanced search with AI ranking and relevance scoring
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Zustand for efficient global state management
- **Form Handling**: React Hook Form with validation
- **Toast Notifications**: User-friendly feedback with react-hot-toast

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications
- **Zustand** - State management

### Backend & Services
- **Supabase** - Backend as a Service (Database, Auth, Real-time)
- **OpenAI API** - AI-powered content generation and search
- **Stripe** - Payment processing for subscriptions

### Libraries & Tools
- **jsPDF** - PDF generation
- **React Router DOM** - Client-side routing
- **PostCSS & Autoprefixer** - CSS processing

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (for database and auth)
- OpenAI API key (for AI features)
- Stripe account (for payments)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd legalease
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file and configure your variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App Configuration
VITE_APP_URL=http://localhost:5173
```

### 4. Database Setup
1. Create a new Supabase project
2. Run the SQL schema from `database-schema.sql` in your Supabase SQL editor
3. Enable Row Level Security (RLS) policies as defined in the schema

### 5. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── AppShell.jsx    # Main app layout
│   ├── AuthModal.jsx   # Authentication modal
│   ├── SearchBar.jsx   # Search component
│   ├── SubscriptionModal.jsx  # Subscription management
│   └── TemplateGeneratorModal.jsx  # Document generation
├── data/               # Mock data and constants
│   └── mockData.js     # Fallback data when DB is not configured
├── lib/                # Utility libraries
│   ├── supabase.js     # Supabase client configuration
│   ├── openai.js       # OpenAI API integration
│   ├── stripe.js       # Stripe payment integration
│   └── pdfGenerator.js # PDF generation utilities
├── store/              # State management
│   └── useStore.js     # Zustand store
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Design System

The app uses a carefully crafted design system with semantic tokens:

### Colors
- **Primary**: `hsl(220, 50%, 40%)` - Professional blue
- **Accent**: `hsl(160, 60%, 50%)` - Success green
- **Background**: `hsl(220, 10%, 95%)` - Light gray
- **Surface**: `hsl(0, 0%, 100%)` - Pure white
- **Text Primary**: `hsl(220, 40%, 20%)` - Dark blue-gray
- **Text Secondary**: `hsl(220, 30%, 40%)` - Medium blue-gray

### Typography
- **Display**: Large headings with bold weight
- **Heading**: Section headings with semibold weight
- **Body**: Regular text with normal weight
- **Caption**: Small text with medium weight

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Run the database schema from `database-schema.sql`
4. Configure authentication providers as needed

### OpenAI Setup
1. Get an API key from [OpenAI](https://platform.openai.com)
2. Add it to your environment variables
3. Monitor usage to manage costs

### Stripe Setup
1. Create a Stripe account
2. Get your publishable key from the dashboard
3. Create products and prices for subscription plans
4. Update the price IDs in `src/lib/stripe.js`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 🧪 Testing

The app includes demo mode for testing without actual payments:
- Use any email/password combination for authentication
- Subscription flows are simulated
- PDF generation works with mock data

## 📝 API Documentation

### Supabase Tables
- `users` - User accounts and subscription tiers
- `legal_scenarios` - Legal scenario categories
- `cheat_sheets` - Legal information summaries
- `document_templates` - Template documents
- `user_activity` - User interaction tracking

### OpenAI Integration
- Content summarization for cheat sheets
- Document template generation
- AI-enhanced search ranking

### Stripe Integration
- Subscription management
- Payment processing
- Webhook handling (backend required)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Legal Disclaimer

LegalEase is for informational purposes only and does not constitute legal advice. Users should consult with qualified attorneys for legal matters. The app provides general information about legal rights and procedures but cannot replace professional legal counsel.

## 🆘 Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact support at support@legalease.com

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI legal research
- [ ] Integration with legal databases
- [ ] Multi-language support
- [ ] Legal professional directory
- [ ] Case law search and analysis
- [ ] Document collaboration features
- [ ] API for third-party integrations
