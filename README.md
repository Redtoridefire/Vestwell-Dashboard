# Vestwell CPO Dashboard
## Security & People Risk Analytics Platform

A comprehensive dashboard designed to showcase the strategic partnership between the Chief Information Security Officer (CISO) and Chief People Officer (CPO) at Vestwell, a leading fintech platform powering the modern savings economy.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![React](https://img.shields.io/badge/React-18.3-61dafb)

---

## 📊 Overview

This dashboard provides real-time visibility into critical security and people metrics that matter to both security leadership and human resources. It's designed specifically for executive-level viewing with a focus on actionable insights and compliance readiness.

### Key Features

- **🎯 Security Culture Metrics**: Phishing simulation results, training completion, security champions program
- **🔐 Identity & Access Governance**: Privileged account management, MFA adoption, access review status
- **👁️ Insider Risk Monitoring**: Behavioral analytics, anomaly detection, offboarding tracking
- **✅ Compliance Status**: SOC 2, PCI DSS, FINRA, SEC regulatory tracking
- **🔄 Interactive Drill-downs**: Click on metrics to view detailed breakdowns
- **🎴 Flip Cards**: Interactive cards that reveal additional context
- **📈 Trend Analysis**: Historical data visualization and improvement tracking

---

## 🏢 About Vestwell

**Company Profile:**
- 📍 Headquarters: New York City
- 👥 Employees: ~390 people
- 💰 Assets Under Administration: $30B+
- 🏦 Businesses Served: 350,000+
- 👤 Active Savers: 1.5M+
- 🗺️ Geographic Coverage: All 50 states
- 🏆 Market Position: Powers 85% of state retirement programs

**Compliance Requirements:**
- SOC 2 Type II (Service Organization Controls)
- PCI DSS v4.0.1 (Payment Card Industry Data Security Standard)
- SEC Investment Advisor Registration
- FINRA Rule 3110 (Supervision)
- State-specific privacy and security regulations

---

## 🎨 Design Philosophy

The dashboard uses a **refined corporate aesthetic** appropriate for C-suite audiences:

- **Color Palette**: Professional blues and greens with warm accent colors
- **Typography**: Plus Jakarta Sans for headings, Inter for body text
- **Layout**: Clean, information-dense without feeling cluttered
- **Interactions**: Smooth transitions, hover states, and microinteractions
- **Accessibility**: WCAG 2.1 AA compliant with proper contrast and focus states

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vestwell-cpo-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

---

## 📁 Project Structure

```
vestwell-cpo-dashboard/
├── app/
│   ├── page.tsx          # Main dashboard component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles and Tailwind
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS customization
├── postcss.config.js     # PostCSS configuration
└── README.md            # This file
```

---

## 📊 Dashboard Sections

### 1. Overview Tab
**Key Performance Indicators:**
- Total employee count (390)
- Overall security score (87/100)
- Compliance rate (98.5%)
- Critical alerts (3)
- Training completion (94.2%)
- Incident response readiness (100%)

**Quick Insights:**
- Trend analysis and improvements
- Action items requiring attention
- Upcoming audits and milestones

### 2. Security Culture Tab
**Metrics:**
- **Phishing Simulation**: Click rate (8.3%), report rate (76.4%)
- **Training Completion**: By module and department
- **Security Champions**: 23 active champions across 8 departments
- **Cultural Health**: Engagement scores and participation rates

**Interactive Elements:**
- Flip cards showing 6-month trends
- Department-level drill-downs
- Training module breakdowns

### 3. Identity & Access Tab
**Governance Metrics:**
- **Privileged Accounts**: 47 accounts with detailed inventory
- **Orphaned Accounts**: 2 accounts requiring cleanup
- **MFA Adoption**: 99.2% organization-wide
- **Access Reviews**: 5 overdue reviews
- **Deprovisioning**: Average 2.3 hours (target: <4 hours)

**Lifecycle Management:**
- Onboarding time to access
- Offboarding deprovisioning speed
- Role change processing times

### 4. Insider Risk Tab
**Risk Indicators:**
- **High Risk Users**: 4 users flagged
- **Anomalous Access**: 12 detected patterns
- **Data Exfiltration**: 1 incident under investigation
- **Offboarding Pending**: 3 employees

**Monitoring Coverage:**
- Production data access: 100%
- Financial data monitoring: 100%
- Privileged user activity: 100%
- Endpoint detection: 97.4%

### 5. Compliance Tab
**Regulatory Status:**
- **SOC 2 Type II**: Audit scheduled Q1 2026
- **PCI DSS**: 100% compliant
- **FINRA Training**: 100% completion
- **SEC Compliance**: Current status
- **Background Checks**: 387 completed, 3 pending, 8 expiring

**Audit Readiness:**
- Control effectiveness tracking
- Evidence collection status
- Upcoming review calendar

---

## 🔧 Customization

### Updating Metrics

Metrics are defined in the `dashboardData` object in `app/page.tsx`:

```typescript
const dashboardData = {
  overview: {
    totalEmployees: 390,
    securityScore: 87,
    // ... more metrics
  },
  // ... more sections
};
```

### Adding New Sections

1. Add a new tab to the navigation array
2. Create metric cards using the `MetricCard` component
3. Define drill-down data in `drillDownDetails`
4. Add the section content in the main render logic

### Styling Customization

- **Colors**: Edit `tailwind.config.js` for theme colors
- **Fonts**: Update font imports in `app/layout.tsx`
- **Spacing**: Modify Tailwind utilities in components

---

## 🎯 Use Cases

### For Chief People Officers (CPO)
- **Workforce Security Posture**: Understanding how employees engage with security
- **Training ROI**: Measuring effectiveness of security awareness programs
- **Risk Mitigation**: Identifying potential insider threats early
- **Compliance Assurance**: Ensuring background checks and training are current
- **Organizational Health**: Gauging security culture maturity

### For Chief Information Security Officers (CISO)
- **Executive Communication**: Clear, business-focused security metrics
- **Risk Quantification**: Translating technical risks into people impacts
- **Resource Justification**: Demonstrating value of security programs
- **Compliance Reporting**: Streamlined audit preparation
- **Stakeholder Alignment**: Shared language with HR leadership

### For Fractional CISOs
- **Client Reporting**: Professional, branded dashboards
- **Thought Leadership**: Demonstrating comprehensive approach
- **Value Demonstration**: Quantifiable security improvements
- **Compliance Consulting**: Audit-ready documentation
- **Strategic Planning**: Data-driven security roadmaps

---

## 🔐 Data Sources (Production Implementation)

This prototype uses realistic simulated data. In a production environment, integrate with:

### Security Tools
- **SIEM**: Splunk, Chronicle, Microsoft Sentinel
- **IAM**: Okta, Azure AD, JumpCloud
- **Training**: KnowBe4, SANS Security Awareness
- **Endpoint**: CrowdStrike, Carbon Black, SentinelOne

### HR Systems
- **HRIS**: Workday, BambooHR, ADP
- **Background Checks**: Checkr, HireRight, Sterling
- **Learning Management**: Cornerstone, Docebo, TalentLMS

### Compliance Platforms
- **GRC**: Vanta, Drata, SecureFrame
- **Audit Management**: AuditBoard, LogicGate
- **Risk Assessment**: Archer, RiskLens, FAIR

---

## 📈 Metrics Methodology

### Security Score Calculation
```
Security Score = (
  Training Completion × 0.25 +
  Phishing Resilience × 0.20 +
  MFA Adoption × 0.15 +
  Access Review Compliance × 0.15 +
  Incident Response Readiness × 0.15 +
  Compliance Status × 0.10
) × 100
```

### Risk Levels
- **Low**: Green indicators, routine monitoring
- **Medium**: Amber indicators, increased attention
- **High**: Red indicators, immediate action required

### Trend Analysis
- **Improving**: Positive directional change over time
- **Stable**: Consistent performance within acceptable range
- **Declining**: Negative trend requiring intervention

---

## 🛠️ Technical Details

### Built With
- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.7
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React 0.460

### Performance Optimizations
- Server-side rendering for initial load
- Client-side hydration for interactivity
- Optimized font loading with `next/font`
- Automatic code splitting
- Image optimization (when applicable)

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Documentation

### Component Architecture

**MetricCard**
```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  status?: 'good' | 'warning' | 'critical';
  onClick?: () => void;
}
```

**FlipCard**
```typescript
interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}
```

**DrillDownModal**
```typescript
interface DrillDownData {
  title: string;
  data: any[];
}
```

---

## 🚧 Future Enhancements

### Phase 1 (Short-term)
- [ ] Real-time data integration
- [ ] Export to PDF/Excel functionality
- [ ] Email report scheduling
- [ ] Custom date range filters
- [ ] Dark mode toggle

### Phase 2 (Mid-term)
- [ ] Role-based access control
- [ ] Multi-tenant support
- [ ] Advanced analytics with ML insights
- [ ] Mobile-responsive improvements
- [ ] API documentation

### Phase 3 (Long-term)
- [ ] Predictive risk scoring
- [ ] Automated incident workflows
- [ ] Integration marketplace
- [ ] White-label customization
- [ ] AI-powered recommendations

---

## 🤝 Contributing

This is a demonstration project. For production use, consider:

1. Adding authentication (NextAuth.js, Auth0, Clerk)
2. Implementing API routes for data fetching
3. Adding database integration (Prisma, Drizzle)
4. Setting up monitoring (Sentry, LogRocket)
5. Implementing comprehensive testing (Jest, Playwright)

---

## 📄 License

This project is provided as a demonstration and thought leadership piece. All rights reserved.

---

## 📞 Contact

**Project Context**: Created as a demonstration of CISO-to-CPO collaboration for Vestwell

**Author**: Mike (Senior Director of Cyber Security Risk Oversight & AI at American Express, Fractional CISO)

**Purpose**: Thought leadership and fractional CISO business development

---

## 🙏 Acknowledgments

- Vestwell for inspiring this security-people partnership model
- The fintech security community for compliance frameworks
- Modern dashboard design patterns from leading SaaS platforms

---

**Built with ❤️ for security-conscious organizations**

*Last Updated: December 15, 2024*
