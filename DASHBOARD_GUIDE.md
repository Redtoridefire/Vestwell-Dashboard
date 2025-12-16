# Dashboard User Guide
## Vestwell CPO Dashboard - Security & People Risk Analytics

---

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [Dashboard Navigation](#dashboard-navigation)
3. [Understanding Metrics](#understanding-metrics)
4. [Interactive Features](#interactive-features)
5. [Interpreting Data](#interpreting-data)
6. [Action Items](#action-items)
7. [Best Practices](#best-practices)

---

## 🎯 Introduction

This dashboard represents a strategic partnership between Information Security and People Operations at Vestwell. It provides a unified view of how people-related factors impact security posture and compliance readiness.

### Purpose
- **For CPOs**: Understand security culture health and workforce risk factors
- **For CISOs**: Communicate security metrics in people-centric language
- **For Leadership**: Make data-driven decisions about security investments

### Update Frequency
- **Real-time**: User activity and access metrics
- **Daily**: Training completion, phishing simulations
- **Weekly**: Compliance status, risk scores
- **Monthly**: Trend analysis, audit readiness

---

## 🧭 Dashboard Navigation

### Tab Structure

#### 1. **Overview Tab** 📊
Your starting point for a high-level view of organizational security health.

**What You'll See:**
- 6 key performance indicators at the top
- Quick insights highlighting trends and action items
- Overall security score (0-100)

**When to Use:**
- Daily check-ins
- Executive briefings
- Quick status updates
- Identifying urgent issues

#### 2. **Security Culture Tab** 👥
Measures how well employees understand and practice security.

**What You'll See:**
- Phishing simulation results with trends
- Training completion by module and department
- Security champions program metrics
- Cultural health indicators

**When to Use:**
- Planning training initiatives
- Assessing program effectiveness
- Quarterly reviews
- Budget justification for awareness programs

#### 3. **Identity & Access Tab** 🔐
Tracks who has access to what and how well it's governed.

**What You'll See:**
- Privileged account inventory
- MFA adoption rates
- Access review status
- Lifecycle management timelines

**When to Use:**
- Access review planning
- Audit preparation
- Onboarding/offboarding improvements
- Privilege management

#### 4. **Insider Risk Tab** 👁️
Identifies potential security threats from within the organization.

**What You'll See:**
- High-risk user indicators
- Anomalous behavior patterns
- Data exfiltration attempts
- Monitoring coverage

**When to Use:**
- Risk assessments
- Investigation support
- Policy enforcement
- Workforce planning

#### 5. **Compliance Tab** ✅
Ensures regulatory requirements are met.

**What You'll See:**
- SOC 2, PCI DSS, FINRA status
- Background check tracking
- Audit readiness metrics
- Control effectiveness

**When to Use:**
- Audit preparation
- Regulatory reporting
- Compliance planning
- Risk mitigation

---

## 📊 Understanding Metrics

### Color Coding System

#### 🟢 Green (Good)
- **Meaning**: Meeting or exceeding targets
- **Action**: Maintain current practices
- **Example**: 99.2% MFA adoption (target: >95%)

#### 🟡 Amber (Warning)
- **Meaning**: Approaching threshold, needs attention
- **Action**: Review and improve within 30 days
- **Example**: 5 access reviews overdue

#### 🔴 Red (Critical)
- **Meaning**: Below acceptable threshold, immediate action required
- **Action**: Address within 7 days
- **Example**: Data exfiltration incident detected

### Trend Indicators

#### ⬆️ Upward (Improving)
- Green arrow with positive percentage
- Example: "Phishing click rate -5.1%"

#### ⬇️ Downward (Declining)
- Red arrow with negative percentage
- Example: "Training completion -3%"

#### ➡️ Stable (Consistent)
- No arrow, maintaining status
- Example: "MFA adoption steady at 99%"

---

## 🎮 Interactive Features

### 1. Flip Cards
**How to Use:**
- Click on any flip card to reveal additional information
- Front side shows current metrics
- Back side shows trends or program details

**Example:**
- **Front**: Phishing click rate: 8.3%
- **Back**: 6-month trend showing improvement from 16.2% to 8.3%

### 2. Drill-Down Views
**How to Access:**
- Click on metrics with "View Details" or hover cursor change
- Opens modal with comprehensive breakdown

**Available Drill-Downs:**
- Phishing simulation historical data
- Training completion by department
- Privileged account inventory
- Insider risk user list
- Compliance framework status

**Navigation:**
- Click X or outside modal to close
- Scroll within modal for full content

### 3. Metric Cards
**Interactive Elements:**
- Hover for shadow effect
- Click for detailed view (where available)
- View trends and changes at a glance

---

## 📈 Interpreting Data

### Security Score (0-100)

**Calculation:**
```
Security Score = 
  Training Completion (25%) +
  Phishing Resilience (20%) +
  MFA Adoption (15%) +
  Access Review Compliance (15%) +
  Incident Response Readiness (15%) +
  Compliance Status (10%)
```

**Score Ranges:**
- **90-100**: Excellent - Industry leading
- **80-89**: Good - Above average
- **70-79**: Fair - Meeting minimum standards
- **Below 70**: Needs improvement

**Current Vestwell Score: 87/100** ✅

### Phishing Simulation

**Click Rate:**
- **Industry Average**: 15-20%
- **Target**: Below 10%
- **Vestwell Current**: 8.3% ✅

**Report Rate:**
- **Industry Average**: 40-60%
- **Target**: Above 70%
- **Vestwell Current**: 76.4% ✅

**Interpretation:**
A decreasing click rate combined with increasing report rate indicates strong security awareness culture.

### Training Completion

**Targets by Module:**
- **Annual Security**: >95%
- **Financial Services**: >95%
- **PCI Fundamentals**: >95%
- **Incident Response**: >90%

**By Department:**
- Engineering and Technical: Target 95%+
- Operations and Admin: Target 95%+
- All others: Target 90%+

### MFA Adoption

**Industry Benchmarks:**
- **Basic**: 80-85%
- **Good**: 90-95%
- **Excellent**: >95%

**Vestwell**: 99.2% (Excellent) ✅

### Access Review Compliance

**Timeline Targets:**
- **Privileged Accounts**: Every 30 days
- **Standard Accounts**: Every 90 days
- **Contractor Accounts**: Every 60 days

**Current Status:**
- 5 overdue reviews (⚠️ Needs attention)

### Deprovisioning Time

**Industry Standards:**
- **Voluntary Departure**: <8 hours
- **Involuntary Departure**: <4 hours
- **High-Risk Departure**: <1 hour

**Vestwell Average**: 2.3 hours (✅ Excellent)

---

## ⚡ Action Items

### Priority Levels

#### 🔴 Critical (Address within 7 days)
Current critical items:
1. **Data Exfiltration Incident**: 1 incident under investigation
   - Owner: Security Team
   - Action: Complete investigation and remediation

#### 🟡 High (Address within 30 days)
Current high-priority items:
1. **Access Reviews Overdue**: 5 reviews pending
   - Owner: IT & HR
   - Action: Complete reviews and document
   
2. **Background Checks Expiring**: 8 expiring within 30 days
   - Owner: HR
   - Action: Initiate renewal process

3. **Training Completion**: 22 employees incomplete
   - Owner: L&D + Managers
   - Action: Follow up and ensure completion

#### 🟢 Medium (Address within 90 days)
Current medium-priority items:
1. **Orphaned Accounts**: 2 accounts need cleanup
   - Owner: IT
   - Action: Verify and deactivate
   
2. **High-Risk Users**: 4 users flagged
   - Owner: Security + HR
   - Action: Review and assess

### How to Take Action

**For CPOs:**
1. Review dashboard weekly
2. Focus on training and culture metrics
3. Coordinate with Security on people-related risks
4. Ensure background checks and compliance items are current

**For CISOs:**
1. Monitor daily for critical alerts
2. Investigate insider risk indicators
3. Coordinate access reviews with IT
4. Prepare evidence for audits

**For Managers:**
1. Ensure team training completion
2. Report security concerns
3. Participate in access reviews
4. Support security champions

---

## ✅ Best Practices

### Daily Activities
- [ ] Check critical alerts (red indicators)
- [ ] Review new insider risk flags
- [ ] Monitor ongoing incidents

### Weekly Activities
- [ ] Review all dashboard tabs
- [ ] Track trend changes
- [ ] Update stakeholders on metrics
- [ ] Address high-priority items

### Monthly Activities
- [ ] Comprehensive metric review
- [ ] Training program assessment
- [ ] Compliance status check
- [ ] Executive reporting

### Quarterly Activities
- [ ] Deep-dive analytics
- [ ] Program effectiveness review
- [ ] Budget planning based on metrics
- [ ] Audit preparation

### Reporting Guidelines

**For Board/Executive Reports:**
- Use Overview tab as starting point
- Focus on security score and trends
- Highlight major improvements
- Address critical issues

**For Department Managers:**
- Share relevant tab (Culture for training, etc.)
- Provide context for metrics
- Set clear expectations
- Offer support and resources

**For Auditors:**
- Navigate to Compliance tab
- Provide drill-down details
- Export evidence (when implemented)
- Document control effectiveness

---

## 🎓 Glossary

**MFA (Multi-Factor Authentication)**: Requires two or more verification methods to access accounts

**Privileged Account**: Accounts with elevated permissions (admin, root, etc.)

**Orphaned Account**: User account no longer associated with an active employee

**SoD (Segregation of Duties)**: Dividing critical functions among different people

**Phishing Simulation**: Controlled test emails to assess security awareness

**Security Champion**: Employee volunteer who promotes security in their department

**Insider Risk**: Potential threat from current or former employees

**SOC 2**: Security and availability certification for service providers

**PCI DSS**: Payment Card Industry Data Security Standard

**FINRA**: Financial Industry Regulatory Authority

**Background Check**: Pre-employment screening and ongoing verification

**Access Review**: Periodic verification that user permissions are appropriate

**Deprovisioning**: Removing access when employee leaves or changes roles

---

## 📞 Support & Questions

**For Technical Issues:**
- Contact: security@vestwell.com
- Include: Screenshot and description

**For Metric Questions:**
- Contact: Your CISO or Security Team
- Include: Specific metric and context

**For HR/People Questions:**
- Contact: Your CPO or HR Team
- Include: Employee-specific concerns

**For Feature Requests:**
- Submit via internal feedback channel
- Describe: Desired functionality and use case

---

## 🔄 Changelog & Updates

**v1.0.0 - December 15, 2024**
- Initial dashboard release
- 5 main tabs with 50+ metrics
- Interactive drill-downs and flip cards
- Comprehensive documentation

**Upcoming Features:**
- Real-time data integration
- Custom date ranges
- PDF export functionality
- Dark mode

---

**Remember**: This dashboard is a tool for collaboration between Security and People Operations. The goal is not just compliance, but building a security-conscious culture where every employee is a stakeholder in protecting the organization.

---

*Last Updated: December 15, 2024*
*Version: 1.0.0*
