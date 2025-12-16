# CPO Guide: Security-People Partnership Dashboard

## Overview

This dashboard represents a strategic partnership between the Chief Information Security Officer (CISO) and Chief People Officer (CPO) at Vestwell. It goes beyond traditional security metrics to demonstrate how security integrates with people operations, culture, and the employee experience.

---

## 🌟 New Features Overview

### 1. **Human Risk Exposure Model (HREM)**
**Tab:** Risk Exposure Model

**What It Is:**
Role-based risk classification that segments the 390-person workforce into 4 tiers based on data access and business criticality:

- **Critical Exposure** (18 employees, 4.6%): Finance team with access to SSN, ACH, contributions
- **High Exposure** (118 employees, 30.3%): Engineering, Customer Success with PII/production access
- **Moderate Exposure** (156 employees, 40.0%): Product, Sales, Operations with internal tools access
- **Low Exposure** (98 employees, 25.1%): Marketing, Admin with limited data access

**Why CPOs Love This:**
- **Reduces Training Burnout**: Low-risk roles get 4 hrs/year training vs. 24 hrs for critical roles
- **Fair & Proportional**: Controls match actual risk, not arbitrary job titles
- **Scales Intelligently**: Onboarding, background checks, and access scale with exposure
- **Improves Retention**: Employees feel respected, not over-controlled

**Key Metrics:**
- Overall Risk Score: **72/100**
- Training ROI: **89%**
- Role-based training hours: 4-24 hrs/year depending on tier

---

### 2. **Security Experience Index (SXI)**
**Tab:** Security Experience

**What It Is:**
Measures how security *feels* to employees, not just how effective it is. This is crucial because security that creates fear, confusion, or friction drives shadow IT and disengagement.

**Core Metrics:**
- **Overall SXI Score**: **8.2/10** (target: >8.0)
- **Understanding Score**: 8.5/10 - "I understand why controls exist"
- **Support Score**: 7.9/10 - "Security team is approachable"
- **Psychological Safety**: 8.4/10 - "I feel safe reporting mistakes"
- **Reporting Comfort**: 8.1/10 - "I know where to ask questions"
- **Frustration Index**: 2.3/10 (lower is better)
- **NPS Score**: **42** (would recommend security program)

**Why This Matters to CPOs:**
- **Reduces Shadow IT**: When employees feel frustrated, they find workarounds. High SXI = compliance
- **Psychological Safety**: Feeling safe admitting mistakes is a core culture health indicator
- **Engagement & Retention**: Punitive security drives disengagement; supportive security improves satisfaction

**Improvement Opportunities:**
- Lowest score: "Security doesn't block work" (7.9/10) → Review approval workflows
- Continue "Ask Security Anything" sessions (147 questions in 30 days shows engagement)
- Pair with HREM for role-based training

---

### 3. **Security Enablement Lifecycle**
**Tab:** Employee Journey

**What It Is:**
Security mapped to the 5 stages of the employee journey, showing how controls evolve with roles—from hiring through exit.

**The 5 Stages:**

#### Stage 1: Hiring & Pre-Boarding
- **Focus**: Role clarity & access intent
- **Security Actions**: Background check (94% complete), HREM tier assigned, access requirements documented
- **Metric**: 387 background checks completed

#### Stage 2: Onboarding (Days 1-30)
- **Focus**: Expectations & habits
- **Security Actions**: Role-based training, account provisioning (avg 1.8 hrs), MFA setup
- **Metrics**: 98.2% training completion, 3.2 days avg to full access

#### Stage 3: Growth & Tenure (Ongoing)
- **Focus**: Privilege evolution
- **Security Actions**: Annual access reviews, privilege escalation monitoring, HREM-based training
- **Metrics**: 47 privilege reviews, 23 role changes YTD

#### Stage 4: Role Change / Transfer
- **Focus**: Access recalibration
- **Security Actions**: Old access removed, new access granted, HREM tier reassessed
- **Metrics**: 1.2 days avg processing, 100% access reviews

#### Stage 5: Exit / Offboarding
- **Focus**: Clean separation
- **Security Actions**: All accounts deactivated, physical access revoked, data return verified
- **Metrics**: 2.3 hrs avg deprovision, 99.1% clean exits

**CPO Partnership Value:**
- **Integrated, Not Bolted On**: Security is part of the employee journey, not a separate compliance burden
- **Smoother Onboarding**: HR knows exactly what security needs at each stage
- **Reduces Access Creep**: Role changes trigger automatic access reviews
- **HR Controls Risk**: People Ops drives the lifecycle, security supports it

---

### 4. **Dual SSO Integration (Rippling + JumpCloud)**
**Tab:** Identity & Access

**What It Is:**
Vestwell currently uses two identity providers:
- **Rippling** (60%, 234 users): HR-driven provisioning for Google Workspace, Okta, Slack, Zoom
- **JumpCloud** (40%, 156 users): Technical infrastructure for engineering workstations, VPN, SSH keys

**The Merge Strategy (Target: Q2 2025):**

**Phase 1: Discovery** ✅ COMPLETE
User inventory & app mapping

**Phase 2: API Setup** ✅ COMPLETE
Rippling ↔ JumpCloud sync

**Phase 3: Pilot** 🔄 IN PROGRESS
Testing with 25 users (IT/Security)

**Phase 4: Rollout** 📅 Q2 2025
Full deployment to 390 employees

**Unified Vision:**
- **Single Source of Truth**: Rippling becomes the authoritative HR system (Rippling → JumpCloud → All Apps)
- **Granular Provisioning**: JumpCloud manages technical access based on role + HREM tier
- **Automated Workflows**: HR updates status in Rippling, access changes propagate instantly

**CPO Benefit:**
- Employees get provisioned on **day 1** with zero IT tickets
- HR sees **real-time access status**
- Offboarding is **instant and complete** - no orphaned accounts
- Target: Provision <1hr, Deprovision <15min

**Current Status:**
- 0 conflicts detected
- Both systems syncing actively
- Target completion: Q2 2025

---

## 📊 Dashboard Navigation

The dashboard has **8 tabs**:

1. **Overview**: High-level KPIs, security score (87/100), quick insights
2. **Risk Exposure Model**: HREM tiers, role-based risk breakdown
3. **Security Experience**: SXI scores, employee feedback, psychological safety
4. **Employee Journey**: Lifecycle stages from hire to exit
5. **Security Culture**: Phishing simulations, training completion, security champions
6. **Identity & Access**: Dual SSO integration, privileged accounts, MFA adoption
7. **Insider Risk**: Anomaly detection, monitoring coverage, high-risk users
8. **Compliance**: SOC 2, PCI DSS, FINRA, background checks

---

## 🎯 How to Use This Dashboard

### For CPOs:
- **Onboarding Planning**: Use the Lifecycle tab to understand security requirements at each hire stage
- **Culture Assessment**: Check SXI scores to gauge employee sentiment toward security
- **Resource Allocation**: Use HREM to justify role-based training budgets
- **Executive Reporting**: Overview tab shows security-people partnership health

### For CISOs:
- **Risk Prioritization**: HREM shows where to focus high-touch controls
- **Culture Metrics**: SXI identifies friction points before they become shadow IT
- **Lifecycle Automation**: Track provisioning/deprovisioning efficiency
- **Compliance Readiness**: Compliance tab for audit preparation

### For HR/People Ops:
- **Role Design**: HREM tier assignments during job description creation
- **Onboarding Checklists**: Lifecycle tab shows security tasks per stage
- **Employee Support**: SXI feedback helps improve security experience
- **SSO Status**: Identity & Access tab shows provisioning automation progress

---

## 🔑 Key Terminology

- **HREM**: Human Risk Exposure Model - role-based risk classification
- **SXI**: Security Experience Index - how security feels to employees
- **Lifecycle**: Employee journey from hiring through exit
- **SSO**: Single Sign-On - unified identity management system
- **NPS**: Net Promoter Score - would recommend security program
- **Psychological Safety**: Feeling safe to admit mistakes without fear of punishment

---

## 📈 Success Metrics

**Current Performance:**
- Organization Health Score: **87/100**
- Security Experience Index: **8.2/10**
- Clean Exit Rate: **99.1%**
- Training Completion: **94.2%**
- MFA Adoption: **99.2%**
- Phishing Click Rate: **8.3%** (down from 16.2% in July)

**Targets:**
- Maintain SXI >8.0
- Achieve <15min deprovision time post-SSO merge
- 100% training completion for critical exposure roles
- <5% phishing click rate by Q2 2025

---

## 🤝 CISO-CPO Partnership Framework

This dashboard embodies the following principles:

1. **Security Scales with Risk**: Not all employees face the same risk; controls should be proportional (HREM)
2. **Employee Experience Matters**: Security that feels punitive fails; measure the employee perspective (SXI)
3. **HR Owns the Lifecycle**: People Ops drives onboarding/offboarding; security supports it (Lifecycle)
4. **Automation Reduces Friction**: Unified SSO eliminates manual provisioning delays (Dual SSO)

---

## 📞 Contact & Support

**Security Team**: security@vestwell.com
**People Ops**: hr@vestwell.com
**Dashboard Questions**: [Your Contact]

**Monthly Reviews:**
- HREM: Quarterly risk tier reviews with HR
- SXI: Monthly employee survey (anonymous)
- Lifecycle: Bi-weekly onboarding/offboarding sync
- SSO Merge: Weekly project standup through Q2 2025

---

## 🚀 Roadmap

**Q1 2025:**
- Complete SSO merge pilot (Phase 3)
- Launch quarterly SXI surveys
- Integrate HREM into Rippling provisioning rules

**Q2 2025:**
- Full SSO rollout (Phase 4)
- Automated lifecycle workflows (hire-to-retire)
- Real-time access dashboards for HR

**Q3 2025:**
- Predictive insider risk modeling
- Role-based security training paths
- CPO-facing analytics portal

---

**Version:** 2.0
**Last Updated:** December 15, 2024
**Dashboard URL:** [Your Deployment URL]
