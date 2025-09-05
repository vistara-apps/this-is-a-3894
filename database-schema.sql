-- LegalEase Database Schema
-- This file contains the SQL schema for setting up the database in Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'pro')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legal scenarios table
CREATE TABLE legal_scenarios (
    scenario_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    keywords TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cheat sheets table
CREATE TABLE cheat_sheets (
    cheat_sheet_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scenario_id UUID REFERENCES legal_scenarios(scenario_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    plain_text_summary TEXT,
    is_free BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Document templates table
CREATE TABLE document_templates (
    template_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scenario_id UUID REFERENCES legal_scenarios(scenario_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    template_content TEXT NOT NULL,
    required_fields TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User activity log (optional)
CREATE TABLE user_activity (
    activity_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'cheat_sheet_view', 'template_download', etc.
    resource_id UUID, -- ID of the resource accessed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_legal_scenarios_keywords ON legal_scenarios USING GIN(keywords);
CREATE INDEX idx_cheat_sheets_scenario_id ON cheat_sheets(scenario_id);
CREATE INDEX idx_document_templates_scenario_id ON document_templates(scenario_id);
CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_user_activity_created_at ON user_activity(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = user_id);

-- User activity policies
CREATE POLICY "Users can view own activity" ON user_activity
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity" ON user_activity
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for legal content (scenarios, cheat sheets, templates)
CREATE POLICY "Public read access for legal_scenarios" ON legal_scenarios
    FOR SELECT USING (true);

CREATE POLICY "Public read access for cheat_sheets" ON cheat_sheets
    FOR SELECT USING (true);

CREATE POLICY "Public read access for document_templates" ON document_templates
    FOR SELECT USING (true);

-- Insert sample data
INSERT INTO legal_scenarios (scenario_id, title, description, keywords) VALUES
    (1, 'Landlord-Tenant Disputes', 'Common issues between landlords and tenants including repairs, deposits, and evictions', ARRAY['landlord', 'tenant', 'rent', 'deposit', 'repairs', 'eviction', 'lease']),
    (2, 'Employment Rights & Wrongful Termination', 'Understanding workplace rights, discrimination, and unlawful dismissal', ARRAY['employment', 'firing', 'discrimination', 'workplace', 'wages', 'overtime']),
    (3, 'Consumer Protection & Fraud', 'Protecting yourself from scams, defective products, and unfair business practices', ARRAY['consumer', 'fraud', 'scam', 'refund', 'warranty', 'defective']),
    (4, 'Small Claims Court Procedures', 'How to file and what to expect in small claims court', ARRAY['small claims', 'court', 'lawsuit', 'damages', 'filing']),
    (5, 'Debt Collection & Credit Issues', 'Dealing with debt collectors, credit reporting, and financial disputes', ARRAY['debt', 'collection', 'credit', 'bankruptcy', 'garnishment']),
    (6, 'Family Law Basics', 'Divorce, custody, child support, and domestic violence protection', ARRAY['divorce', 'custody', 'child support', 'domestic violence', 'family']);

-- Note: Insert statements for cheat_sheets and document_templates would be quite large
-- In a real implementation, these would be populated through the application or separate data migration scripts

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_legal_scenarios_updated_at BEFORE UPDATE ON legal_scenarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cheat_sheets_updated_at BEFORE UPDATE ON cheat_sheets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_document_templates_updated_at BEFORE UPDATE ON document_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
