import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TableOfContents from './components/TableOfContents';
import PolicySection from './components/PolicySection';
import ContactInfo from './components/ContactInfo';
import VersionHistory from './components/VersionHistory';
import PrivacyHighlight from './components/PrivacyHighlight';
import CookieSettings from './components/CookieSettings';
import Icon from '../../components/AppIcon';

const PrivacyPolicyLegal = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'data-collection', title: 'Data Collection' },
    { id: 'data-usage', title: 'How We Use Data' },
    { id: 'client-side-processing', title: 'Client-Side Processing' },
    { id: 'third-party-services', title: 'Third-Party Services' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'user-rights', title: 'Your Rights' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'international-transfers', title: 'International Transfers' },
    { id: 'children-privacy', title: 'Children\'s Privacy' },
    { id: 'policy-changes', title: 'Policy Changes' },
    { id: 'legal-basis', title: 'Legal Basis' },
    { id: 'contact', title: 'Contact Information' }
  ];

  const policyContent = {
    overview: `Tool Tica is committed to protecting your privacy and ensuring transparency in how we handle your data. This Privacy Policy explains our data practices for our web-based utility platform that provides PDF processing, image conversion, text manipulation, SEO optimization, and calculation tools.

Our platform is designed with privacy-first principles, utilizing client-side processing to ensure your data never leaves your device for tool operations. This policy covers all services provided through tooltica.com and related subdomains.

Last Updated: August 20, 2024
Effective Date: August 20, 2024
Version: 2.1`,

    'data-collection': `We collect minimal data necessary to provide and improve our services:

**Information You Provide:**
• Contact information when you reach out to us
• Feedback and support requests
• Newsletter subscription email addresses (if you opt-in)

**Automatically Collected Information:**
• Basic analytics data (page views, session duration, device type)
• Technical information (browser type, operating system, IP address)
• Cookie data for essential website functionality

**Information We DO NOT Collect:**
• Files you process using our tools (processed client-side only)
• Personal documents or content within uploaded files
• Detailed browsing behavior or personal profiles
• Location data beyond general geographic region`,

    'data-usage': `We use collected data solely for the following purposes:

**Service Provision:**
• Ensuring website functionality and performance
• Providing customer support and responding to inquiries
• Maintaining and improving our tools and services

**Analytics and Improvement:**
• Understanding general usage patterns to improve user experience
• Identifying technical issues and optimizing performance
• Developing new features based on aggregate user needs

**Communication:**
• Responding to support requests and inquiries
• Sending important service updates or security notifications
• Newsletter communications (only if you've opted in)

We never sell, rent, or share your personal data with third parties for marketing purposes.`,

    'client-side-processing': `Tool Tica's core commitment is client-side processing for all tool operations:

**What This Means:**
• All file processing happens directly in your browser
• Your files never leave your device or get uploaded to our servers
• No file content is transmitted, stored, or accessible to us
• Processing is performed using JavaScript libraries in your browser

**Technical Implementation:**
• PDF processing uses PDF.js library running locally
• Image processing utilizes Canvas API and WebAssembly
• Text manipulation happens entirely in browser memory
• Calculations are performed using client-side JavaScript

**Your Privacy Benefits:**
• Complete control over your sensitive documents
• No risk of data breaches involving your files
• Instant processing without network delays
• Works offline once the page is loaded

This client-side approach ensures maximum privacy and security for your data.`,

    'third-party-services': `We integrate with limited third-party services to provide essential functionality:

**Google Analytics:**
• Purpose: Website performance and usage analytics
• Data Collected: Anonymized usage statistics, page views, session data
• Privacy: IP addresses are anonymized, no personal identification
• Control: You can opt-out using browser settings or ad blockers

**Google AdSense:**
• Purpose: Displaying relevant advertisements to support our free services
• Data Collected: Basic demographic and interest categories
• Privacy: Uses cookies for ad personalization (can be disabled)
• Control: Manage ad preferences through Google Ad Settings

**Content Delivery Network (CDN):**
• Purpose: Fast delivery of website assets and libraries
• Data Collected: Basic request logs for performance optimization
• Privacy: No personal data collection, only technical delivery metrics

We regularly review our third-party integrations to ensure they meet our privacy standards.`,

    cookies: `We use cookies and similar technologies to enhance your experience:

**Essential Cookies (Always Active):**
• Session management and security
• Website functionality and preferences
• Language and accessibility settings

**Analytics Cookies (Optional):**
• Google Analytics for usage insights
• Performance monitoring and optimization
• Error tracking and debugging

**Advertising Cookies (Optional):**
• Google AdSense for relevant ad delivery
• Ad performance measurement
• Frequency capping and personalization

**Functional Cookies (Optional):**
• Theme preferences (dark/light mode)
• Tool favorites and recent usage
• User interface customizations

You can manage your cookie preferences using our Cookie Settings panel or through your browser settings.`,

    'user-rights': `Under GDPR and other privacy laws, you have the following rights:

**Access Rights:**
• Request information about data we hold about you
• Obtain copies of your personal data
• Understand how your data is processed

**Control Rights:**
• Correct inaccurate or incomplete data
• Delete your personal data (right to be forgotten)
• Restrict processing of your data
• Object to data processing for legitimate interests

**Portability Rights:**
• Receive your data in a structured, machine-readable format
• Transfer your data to another service provider

**Communication Rights:**
• Opt-out of marketing communications at any time
• Withdraw consent for data processing
• File complaints with supervisory authorities

To exercise these rights, contact us at privacy@tooltica.com. We will respond within 30 days of receiving your request.`,

    'data-security': `We implement comprehensive security measures to protect your data:

**Technical Safeguards:**
• SSL/TLS encryption for all data transmission
• Secure hosting infrastructure with regular security updates
• Regular security audits and vulnerability assessments
• Access controls and authentication systems

**Operational Safeguards:**
• Limited access to personal data on a need-to-know basis
• Regular staff training on privacy and security practices
• Incident response procedures for potential breaches
• Regular backup and disaster recovery procedures

**Physical Safeguards:**
• Secure data centers with restricted physical access
• Environmental controls and monitoring systems
• Redundant systems for high availability

**Client-Side Security:**
• All file processing happens locally in your browser
• No file uploads or server-side storage of your documents
• Secure JavaScript libraries with regular updates

While we implement strong security measures, no system is 100% secure. We encourage users to take their own precautions when using online services.`,

    'data-retention': `We retain data only as long as necessary for legitimate purposes:

**Analytics Data:**
• Retained for 26 months (Google Analytics default)
• Automatically deleted after retention period
• Can be deleted earlier upon request

**Contact Information:**
• Support inquiries: Retained for 3 years for reference
• Newsletter subscriptions: Until you unsubscribe
• Account data: Deleted within 30 days of account closure

**Technical Logs:**
• Server logs: Retained for 90 days for security and performance
• Error logs: Retained for 1 year for debugging purposes
• Automatically purged after retention periods

**File Processing Data:**
• Client-side processing means no server-side retention
• Files never leave your device during processing
• No file content is stored or cached on our servers

You can request early deletion of your data by contacting privacy@tooltica.com.`,

    'international-transfers': `Tool Tica operates globally with the following data transfer practices:

**Primary Data Location:**
• Website hosted in secure data centers within the EU/US
• Analytics data processed by Google (Privacy Shield certified)
• CDN services distributed globally for performance

**Transfer Safeguards:**
• Standard Contractual Clauses (SCCs) for EU data transfers
• Privacy Shield certification for US-based processors
• Regular assessment of international transfer mechanisms
• Encryption in transit and at rest for all transfers

**Your Rights:**
• Right to object to international transfers
• Right to request data localization where technically feasible
• Right to information about specific transfer mechanisms

**Client-Side Processing Advantage:**
• Most data processing happens locally in your browser
• Minimal data actually crosses international boundaries
• File content never leaves your device regardless of location

We monitor international privacy law developments and adjust our practices accordingly.`,

    'children-privacy': `Tool Tica is committed to protecting children's privacy online:

**Age Restrictions:**
• Our services are not directed to children under 13
• We do not knowingly collect data from children under 13
• Parental consent required for users aged 13-16 in the EU

**If We Learn of Child Data Collection:**
• Immediate deletion of any data from children under 13
• Notification to parents/guardians where possible
• Review of data collection practices to prevent recurrence

**Parental Rights:**
• Right to review any data we may have about their child
• Right to request deletion of child's data • Right to refuse further collection of child's data

**Educational Use:**
• Schools and educational institutions may use our tools
• Institutional consent may apply for educational contexts
• Special protections for student data under FERPA/COPPA

**Safe Design Principles:**
• No social features or user-generated content
• No behavioral advertising to minors
• Clear, age-appropriate privacy notices

Parents concerned about their child's data should contact us immediately at privacy@tooltica.com.`,

    'policy-changes': `We may update this Privacy Policy to reflect changes in our practices or legal requirements:

**Notification Process:**
• Email notification to newsletter subscribers
• Prominent notice on our website homepage
• Updated "Last Modified" date on this policy
• Summary of significant changes provided

**Types of Changes:**
• Legal compliance updates (GDPR, CCPA, etc.)
• New feature additions or service changes
• Third-party service updates or changes
• Security enhancement implementations

**Your Options:**
• Continue using our services under the new policy
• Contact us with questions or concerns about changes
• Exercise your rights to delete data or restrict processing
• Opt-out of services if you disagree with changes

**Significant Changes:**
• 30-day advance notice for material changes
• Opportunity to review and comment on major updates
• Clear explanation of how changes affect you
• Option to withdraw consent for new processing activities

We encourage you to review this policy periodically to stay informed about how we protect your privacy.`,

    'legal-basis': `Our legal basis for processing personal data under GDPR:

**Legitimate Interest (Article 6(1)(f)):**
• Website analytics for service improvement
• Security monitoring and fraud prevention
• Technical support and customer service
• Business operations and administration

**Consent (Article 6(1)(a)):**
• Newsletter subscriptions and marketing communications
• Optional analytics and advertising cookies
• Voluntary feedback and survey participation
• Social media interactions and sharing

**Contract Performance (Article 6(1)(b)):**
• Providing requested tools and services
• Processing support requests and inquiries
• Delivering promised functionality and features

**Legal Obligation (Article 6(1)(c)):**
• Compliance with applicable laws and regulations
• Response to legal requests and court orders
• Tax and accounting record keeping
• Data breach notification requirements

**Balancing Test:**
We regularly assess whether our legitimate interests override your privacy rights and freedoms. You have the right to object to processing based on legitimate interest.`,

    contact: `For privacy-related questions, concerns, or requests, please contact us:

**Privacy Officer:**
Email: privacy@tooltica.com
Response Time: Within 48 hours

**General Support:**
Email: support@tooltica.com
Response Time: Within 24 hours

**Legal Inquiries:**
Email: legal@tooltica.com
Response Time: Within 72 hours

**Mailing Address:**
Tool Tica Privacy Team
[Address to be provided]
[City, State, ZIP]
[Country]

**Data Protection Officer:**
For EU residents, you can contact our Data Protection Officer at dpo@tooltica.com

**Supervisory Authority:**
EU residents have the right to lodge complaints with their local supervisory authority if they believe their privacy rights have been violated.`
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections?.map(section => ({
        id: section?.id,
        element: document.getElementById(section?.id)
      }));

      const currentSection = sectionElements?.find(section => {
        if (section?.element) {
          const rect = section?.element?.getBoundingClientRect();
          return rect?.top <= 100 && rect?.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection?.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element?.getBoundingClientRect()?.top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy & Legal - Tool Tica</title>
        <meta name="description" content="Comprehensive privacy policy and legal information for Tool Tica. Learn about our data practices, client-side processing, and your privacy rights." />
        <meta name="keywords" content="privacy policy, legal, data protection, GDPR, client-side processing, Tool Tica" />
        <meta property="og:title" content="Privacy Policy & Legal - Tool Tica" />
        <meta property="og:description" content="Transparent privacy practices and legal compliance information for our privacy-focused tool platform." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://tooltica.com/privacy-policy-legal" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <Icon name="Shield" size={24} color="white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold gradient-primary bg-clip-text text-transparent">
                  Privacy & Legal
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your privacy is our priority. Learn about our transparent data practices, 
                client-side processing guarantees, and your rights as a user.
              </p>
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Last Updated: August 20, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} />
                  <span>Version 2.1</span>
                </div>
              </div>
            </div>

            {/* Privacy Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <PrivacyHighlight
                title="Client-Side Processing"
                description="All file processing happens in your browser. Your data never leaves your device."
                icon="Shield"
                variant="primary"
              />
              <PrivacyHighlight
                title="No Data Collection"
                description="We don't collect, store, or access your files or personal documents."
                icon="EyeOff"
                variant="success"
              />
              <PrivacyHighlight
                title="GDPR Compliant"
                description="Full compliance with European privacy regulations and user rights."
                icon="Scale"
                variant="accent"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents */}
              <div className="lg:col-span-1">
                <TableOfContents
                  sections={sections}
                  activeSection={activeSection}
                  onSectionClick={handleSectionClick}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Policy Sections */}
                <PolicySection
                  id="overview"
                  title="Overview"
                  content={policyContent?.overview}
                  isHighlighted={true}
                />

                <PolicySection
                  id="data-collection"
                  title="Data Collection"
                  content={policyContent?.['data-collection']}
                />

                <PolicySection
                  id="data-usage"
                  title="How We Use Data"
                  content={policyContent?.['data-usage']}
                />

                <PolicySection
                  id="client-side-processing"
                  title="Client-Side Processing"
                  content={policyContent?.['client-side-processing']}
                  isHighlighted={true}
                />

                <PolicySection
                  id="third-party-services"
                  title="Third-Party Services"
                  content={policyContent?.['third-party-services']}
                  isExpandable={true}
                  defaultExpanded={false}
                />

                <PolicySection
                  id="cookies"
                  title="Cookies & Tracking"
                  content={policyContent?.cookies}
                />

                {/* Cookie Settings Component */}
                <CookieSettings />

                <PolicySection
                  id="user-rights"
                  title="Your Rights"
                  content={policyContent?.['user-rights']}
                  isHighlighted={true}
                />

                <PolicySection
                  id="data-security"
                  title="Data Security"
                  content={policyContent?.['data-security']}
                />

                <PolicySection
                  id="data-retention"
                  title="Data Retention"
                  content={policyContent?.['data-retention']}
                  isExpandable={true}
                  defaultExpanded={false}
                />

                <PolicySection
                  id="international-transfers"
                  title="International Transfers"
                  content={policyContent?.['international-transfers']}
                  isExpandable={true}
                  defaultExpanded={false}
                />

                <PolicySection
                  id="children-privacy"
                  title="Children's Privacy"
                  content={policyContent?.['children-privacy']}
                  isExpandable={true}
                  defaultExpanded={false}
                />

                <PolicySection
                  id="policy-changes"
                  title="Policy Changes"
                  content={policyContent?.['policy-changes']}
                />

                <PolicySection
                  id="legal-basis"
                  title="Legal Basis"
                  content={policyContent?.['legal-basis']}
                  isExpandable={true}
                  defaultExpanded={false}
                />

                <PolicySection
                  id="contact"
                  title="Contact Information"
                  content={policyContent?.contact}
                />

                {/* Contact Info Component */}
                <ContactInfo />

                {/* Version History Component */}
                <VersionHistory />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Tool Tica. All rights reserved. 
                Your privacy is protected by our client-side processing guarantee.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-2 text-xs text-success">
                  <Icon name="Shield" size={14} />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-accent">
                  <Icon name="Lock" size={14} />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-primary">
                  <Icon name="Eye" size={14} />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicyLegal;