'use client';

import React, { useState } from 'react';
import {
  Shield, Users, AlertTriangle, CheckCircle, TrendingUp,
  Clock, FileText, Target, Activity, Lock, Eye,
  BookOpen, Award, Bell, BarChart3, ArrowUpRight,
  ArrowDownRight, Info, ChevronRight, X, UserCheck,
  Heart, Layers, GitBranch, Zap, Smile, ThumbsUp,
  MessageSquare, HelpCircle, TrendingDown, MapPin,
  Calendar, RefreshCw, ExternalLink, Download
} from 'lucide-react';

// Type Definitions
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  status?: 'good' | 'warning' | 'critical';
  onClick?: () => void;
}

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

interface DrillDownData {
  title: string;
  data: any[];
}

// Utility Functions
const getStatusColor = (status?: string) => {
  switch(status) {
    case 'good': return 'text-emerald-600';
    case 'warning': return 'text-amber-600';
    case 'critical': return 'text-rose-600';
    default: return 'text-slate-600';
  }
};

const getStatusBg = (status?: string) => {
  switch(status) {
    case 'good': return 'bg-emerald-50 border-emerald-200';
    case 'warning': return 'bg-amber-50 border-amber-200';
    case 'critical': return 'bg-rose-50 border-rose-200';
    default: return 'bg-slate-50 border-slate-200';
  }
};

// FlipCard Component
const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="flip-card-container cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          {front}
        </div>
        <div className="flip-card-back">
          {back}
        </div>
      </div>
    </div>
  );
};

// MetricCard Component
const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  status,
  onClick 
}) => {
  return (
    <div 
      className={`metric-card ${getStatusBg(status)} ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${getStatusColor(status)}`}>{value}</p>
          {change && (
            <div className="flex items-center mt-2 text-sm">
              {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-600 mr-1" />}
              {trend === 'down' && <ArrowDownRight className="w-4 h-4 text-rose-600 mr-1" />}
              <span className={trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}>{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${status === 'good' ? 'bg-emerald-100' : status === 'warning' ? 'bg-amber-100' : status === 'critical' ? 'bg-rose-100' : 'bg-slate-100'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// DrillDown Modal Component
const DrillDownModal: React.FC<{ data: DrillDownData | null; onClose: () => void }> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden animate-slideUp">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          {renderDrillDownContent(data)}
        </div>
      </div>
    </div>
  );
};

// Render drill-down content based on type
const renderDrillDownContent = (data: DrillDownData) => {
  return (
    <div className="space-y-4">
      {data.data.map((item, idx) => (
        <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(item).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{key}</p>
                <p className="text-sm font-semibold text-slate-900">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component
export default function VestwellCPODashboard() {
  const [drillDownData, setDrillDownData] = useState<DrillDownData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'culture' | 'access' | 'risk' | 'compliance' | 'hrem' | 'sxi' | 'lifecycle'>('overview');

  // Realistic metrics based on Vestwell's ~450 employees
  const dashboardData = {
    overview: {
      totalEmployees: 450,
      securityScore: 87,
      complianceStatus: '98.5%',
      criticalAlerts: 3,
      trainingCompletion: '94.2%',
      incidentResponseReady: '100%'
    },
    securityCulture: {
      phishingSimulation: {
        clickRate: '8.3%',
        reportRate: '76.4%',
        trend: 'down',
        lastTest: '11 days ago'
      },
      trainingMetrics: {
        annualCompliance: 424,
        financialServices: 441,
        pciFundamentals: 433,
        incidentResponse: 405
      },
      securityChampions: {
        active: 23,
        departments: 8,
        incidents: 12
      }
    },
    identityAccess: {
      privilegedAccounts: 47,
      orphanedAccounts: 2,
      mfaAdoption: '99.2%',
      accessReviewsOverdue: 5,
      avgDeprovisionTime: '2.3 hours',
      sodViolations: 0
    },
    insiderRisk: {
      highRiskUsers: 4,
      anomalousAccess: 12,
      dataExfiltration: 1,
      offboardingPending: 3,
      contractorAccess: 18
    },
    compliance: {
      soc2Status: 'Audit Scheduled Q1 2026',
      pciCompliance: '100%',
      finraTraining: '100%',
      secCompliance: 'Current',
      backgroundChecks: {
        completed: 447,
        pending: 3,
        expiring: 8
      }
    },
    hrem: {
      lowExposure: { count: 113, percentage: 25.1, avgTrainingHours: 4 },
      moderateExposure: { count: 180, percentage: 40.0, avgTrainingHours: 8 },
      highExposure: { count: 136, percentage: 30.2, avgTrainingHours: 16 },
      criticalExposure: { count: 21, percentage: 4.7, avgTrainingHours: 24 },
      riskScore: 72,
      trainingROI: '89%'
    },
    sxi: {
      overallScore: 8.2,
      understandingScore: 8.5,
      supportScore: 7.9,
      psychologicalSafety: 8.4,
      reportingComfort: 8.1,
      frustrationIndex: 2.3,
      npsScore: 42
    },
    lifecycle: {
      hiring: { clarity: '94%', backgroundChecks: 447 },
      onboarding: { completionRate: '98.2%', avgDays: 3.2 },
      growth: { privilegeReviews: 54, roleChanges: 27 },
      roleChange: { avgProcessingDays: 1.2, accessReviews: 100 },
      exit: { avgOffboardingHours: 2.3, cleanExits: '99.1%' }
    },
    dualSSO: {
      rippling: { users: 270, coverage: '60%', syncStatus: 'Active' },
      jumpcloud: { users: 180, coverage: '40%', syncStatus: 'Active' },
      mergeStatus: 'In Progress',
      targetDate: 'Q2 2025',
      conflicts: 0
    }
  };

  const drillDownDetails = {
    phishing: {
      title: 'Phishing Simulation Results - Last 6 Months',
      data: [
        { date: 'Dec 2024', clicks: '8.3%', reports: '76.4%', improvement: '+5.2%', participants: 450 },
        { date: 'Nov 2024', clicks: '9.1%', reports: '72.1%', improvement: '+3.1%', participants: 447 },
        { date: 'Oct 2024', clicks: '11.7%', reports: '68.9%', improvement: '+1.8%', participants: 444 },
        { date: 'Sep 2024', clicks: '13.2%', reports: '64.3%', improvement: '+2.4%', participants: 441 },
        { date: 'Aug 2024', clicks: '14.8%', reports: '61.2%', improvement: '+4.1%', participants: 437 },
        { date: 'Jul 2024', clicks: '16.2%', reports: '58.7%', improvement: 'Baseline', participants: 433 }
      ]
    },
    training: {
      title: 'Compliance Training Status by Department',
      data: [
        { department: 'Engineering', employees: 180, completed: 171, percentage: '95.0%', avgScore: '92%' },
        { department: 'Operations', employees: 100, completed: 95, percentage: '95.0%', avgScore: '89%' },
        { department: 'Product', employees: 52, completed: 50, percentage: '96.2%', avgScore: '91%' },
        { department: 'Sales', employees: 44, completed: 41, percentage: '93.2%', avgScore: '88%' },
        { department: 'Customer Success', employees: 34, completed: 33, percentage: '97.1%', avgScore: '93%' },
        { department: 'Finance', employees: 21, completed: 21, percentage: '100%', avgScore: '95%' },
        { department: 'Legal & Compliance', employees: 13, completed: 13, percentage: '100%', avgScore: '97%' },
        { department: 'HR', employees: 6, completed: 6, percentage: '100%', avgScore: '94%' }
      ]
    },
    privilegedAccess: {
      title: 'Privileged Account Inventory',
      data: [
        { account: 'Production DB Admin', users: 8, lastReview: '14 days ago', mfa: 'Enabled', status: 'Compliant' },
        { account: 'AWS Root Access', users: 3, lastReview: '7 days ago', mfa: 'Enabled', status: 'Compliant' },
        { account: 'Domain Admin', users: 5, lastReview: '21 days ago', mfa: 'Enabled', status: 'Compliant' },
        { account: 'Production Deploy', users: 12, lastReview: '10 days ago', mfa: 'Enabled', status: 'Compliant' },
        { account: 'Security Admin', users: 6, lastReview: '5 days ago', mfa: 'Enabled', status: 'Compliant' },
        { account: 'Backup Admin', users: 4, lastReview: '18 days ago', mfa: 'Enabled', status: 'Compliant' },
        { account: 'Customer Data Access', users: 9, lastReview: '12 days ago', mfa: 'Enabled', status: 'Compliant' }
      ]
    },
    insiderRisk: {
      title: 'Insider Risk Indicators - Active Monitoring',
      data: [
        { user: 'User #347', riskScore: 'Medium', indicators: 'After-hours access', department: 'Engineering', lastActivity: '2 days ago' },
        { user: 'User #189', riskScore: 'Medium', indicators: 'Multiple failed logins', department: 'Operations', lastActivity: '5 days ago' },
        { user: 'User #234', riskScore: 'Low', indicators: 'Data download spike', department: 'Customer Success', lastActivity: '1 day ago' },
        { user: 'User #092', riskScore: 'Medium', indicators: 'Role change pending', department: 'Sales', lastActivity: '3 days ago' }
      ]
    },
    compliance: {
      title: 'Regulatory Compliance Status',
      data: [
        { framework: 'SOC 2 Type II', status: 'In Progress', nextAudit: 'Q1 2026', findings: '0 critical', auditor: 'Deloitte' },
        { framework: 'PCI DSS v4.0.1', status: 'Compliant', nextAudit: 'Q2 2025', findings: '0 critical', auditor: 'TrustArc' },
        { framework: 'SEC Investment Advisor', status: 'Current', nextAudit: 'Annual', findings: '0', auditor: 'Internal' },
        { framework: 'FINRA Rule 3110', status: 'Compliant', nextAudit: 'Ongoing', findings: '0', auditor: 'Internal' },
        { framework: 'State Privacy Laws', status: 'Compliant', nextAudit: 'Q4 2025', findings: '0', auditor: 'Privacy Team' }
      ]
    },
    hremRoles: {
      title: 'Human Risk Exposure by Role',
      data: [
        { role: 'Finance Team', exposure: 'Critical', employees: 21, training: '24 hrs/yr', dataAccess: 'SSN, ACH, Contributions', lastReview: '7 days ago' },
        { role: 'Engineering', exposure: 'High', employees: 180, training: '16 hrs/yr', dataAccess: 'Production DB, Customer Data', lastReview: '14 days ago' },
        { role: 'Customer Success', exposure: 'High', employees: 34, training: '16 hrs/yr', dataAccess: 'PII, Account Details', lastReview: '10 days ago' },
        { role: 'Product Managers', exposure: 'Moderate', employees: 52, training: '8 hrs/yr', dataAccess: 'Analytics, Metadata', lastReview: '21 days ago' },
        { role: 'Sales', exposure: 'Moderate', employees: 44, training: '8 hrs/yr', dataAccess: 'CRM, Proposals', lastReview: '18 days ago' },
        { role: 'Operations', exposure: 'Moderate', employees: 84, training: '8 hrs/yr', dataAccess: 'Operational Systems', lastReview: '12 days ago' },
        { role: 'Marketing', exposure: 'Low', employees: 27, training: '4 hrs/yr', dataAccess: 'Public Content', lastReview: '30 days ago' },
        { role: 'Admin/Facilities', exposure: 'Low', employees: 8, training: '4 hrs/yr', dataAccess: 'Limited', lastReview: '25 days ago' }
      ]
    },
    sxiSurvey: {
      title: 'Security Experience Index - Detailed Results',
      data: [
        { metric: 'I understand why security controls exist', score: '8.5/10', trend: '+0.3', category: 'Understanding' },
        { metric: 'Security team is approachable and helpful', score: '8.3/10', trend: '+0.5', category: 'Support' },
        { metric: 'I feel safe reporting security mistakes', score: '8.4/10', trend: '+0.2', category: 'Psychological Safety' },
        { metric: 'I know where to ask security questions', score: '8.1/10', trend: '+0.4', category: 'Support' },
        { metric: 'Security controls don\'t block my work', score: '7.9/10', trend: '+0.1', category: 'Experience' },
        { metric: 'Security training is relevant to my role', score: '8.2/10', trend: '+0.6', category: 'Understanding' },
        { metric: 'I would recommend our security program', score: '8.0/10', trend: '+0.3', category: 'NPS' }
      ]
    },
    lifecycleMetrics: {
      title: 'Employee Lifecycle Security Metrics',
      data: [
        { stage: 'Pre-Hire', metric: 'Background Check Completion', value: '100%', target: '100%', avgDays: 'N/A' },
        { stage: 'Onboarding', metric: 'Security Training Completion', value: '98.2%', target: '95%', avgDays: '3.2' },
        { stage: 'Onboarding', metric: 'Account Provisioning Time', value: '1.8 hrs', target: '< 4 hrs', avgDays: 'N/A' },
        { stage: 'Growth', metric: 'Privilege Reviews (Annual)', value: '54', target: '54', avgDays: 'N/A' },
        { stage: 'Role Change', metric: 'Access Adjustment Time', value: '1.2 days', target: '< 2 days', avgDays: '1.2' },
        { stage: 'Exit', metric: 'Account Deprovisioning Time', value: '2.3 hrs', target: '< 4 hrs', avgDays: 'N/A' },
        { stage: 'Exit', metric: 'Clean Exit Rate', value: '99.1%', target: '> 98%', avgDays: 'N/A' }
      ]
    },
    securityScoreTimeline: {
      title: 'Security Score Timeline - Last 12 Months',
      data: [
        { month: 'Dec 2024', score: 87, change: '+3', drivers: 'MFA adoption, training completion' },
        { month: 'Nov 2024', score: 84, change: '+2', drivers: 'Phishing improvement' },
        { month: 'Oct 2024', score: 82, change: '+1', drivers: 'Access reviews completed' },
        { month: 'Sep 2024', score: 81, change: '+4', drivers: 'New security champions program' },
        { month: 'Aug 2024', score: 77, change: '+2', drivers: 'Incident response drills' },
        { month: 'Jul 2024', score: 75, change: '+1', drivers: 'Policy updates' },
        { month: 'Jun 2024', score: 74, change: '+3', drivers: 'Privileged access review' },
        { month: 'May 2024', score: 71, change: '+2', drivers: 'Training program launch' },
        { month: 'Apr 2024', score: 69, change: '+1', drivers: 'MFA rollout phase 2' },
        { month: 'Mar 2024', score: 68, change: '+2', drivers: 'Compliance audit prep' },
        { month: 'Feb 2024', score: 66, change: '+3', drivers: 'Security awareness campaign' },
        { month: 'Jan 2024', score: 63, change: 'Baseline', drivers: 'Initial assessment' }
      ]
    },
    complianceRateTimeline: {
      title: 'Compliance Rate Timeline - Last 12 Months',
      data: [
        { month: 'Dec 2024', rate: '98.5%', change: '+1.2%', gaps: 'None critical', audits: '0 findings' },
        { month: 'Nov 2024', rate: '97.3%', change: '+0.8%', gaps: 'Training overdue (7)', audits: 'In progress' },
        { month: 'Oct 2024', rate: '96.5%', change: '+1.1%', gaps: 'Background checks (3)', audits: 'Passed PCI' },
        { month: 'Sep 2024', rate: '95.4%', change: '+0.5%', gaps: 'Access reviews pending', audits: 'None' },
        { month: 'Aug 2024', rate: '94.9%', change: '+1.3%', gaps: 'Policy attestations', audits: 'SOC 2 prep' },
        { month: 'Jul 2024', rate: '93.6%', change: '+0.9%', gaps: 'MFA exceptions (12)', audits: 'None' },
        { month: 'Jun 2024', rate: '92.7%', change: '+1.5%', gaps: 'Training modules', audits: 'None' },
        { month: 'May 2024', rate: '91.2%', change: '+1.0%', gaps: 'Device compliance', audits: 'None' },
        { month: 'Apr 2024', rate: '90.2%', change: '+0.7%', gaps: 'Multiple areas', audits: 'Internal' },
        { month: 'Mar 2024', rate: '89.5%', change: '+1.8%', gaps: 'Onboarding delays', audits: 'None' },
        { month: 'Feb 2024', rate: '87.7%', change: '+0.6%', gaps: 'Access creep issues', audits: 'None' },
        { month: 'Jan 2024', rate: '87.1%', change: 'Baseline', gaps: 'Initial state', audits: 'Assessment' }
      ]
    },
    criticalAlertsDetail: {
      title: 'Critical Alerts - Active Issues',
      data: [
        { alert: 'Privileged account review overdue', severity: 'High', affected: '2 accounts', owner: 'IT Admin', dueDate: '3 days overdue', action: 'Complete quarterly review' },
        { alert: 'MFA not enabled for admin', severity: 'Critical', affected: '1 user', owner: 'Security', dueDate: '1 day overdue', action: 'Enforce MFA policy' },
        { alert: 'Orphaned contractor account detected', severity: 'Medium', affected: '1 account', owner: 'HR/IT', dueDate: 'Today', action: 'Verify status and disable' }
      ]
    },
    trainingMandatoryRoleBased: {
      title: 'Training Status - Mandatory vs Role-Based',
      data: [
        { training: 'Security Awareness (Annual)', type: 'Mandatory', completed: 424, total: 450, percentage: '94.2%', dueDate: 'Rolling' },
        { training: 'Phishing Recognition', type: 'Mandatory', completed: 441, total: 450, percentage: '98.0%', dueDate: 'Quarterly' },
        { training: 'Data Privacy Fundamentals', type: 'Mandatory', completed: 433, total: 450, percentage: '96.2%', dueDate: 'Annual' },
        { training: 'Incident Response Basics', type: 'Mandatory', completed: 405, total: 450, percentage: '90.0%', dueDate: 'Annual' },
        { training: 'Financial Services Compliance', type: 'Role-Based', completed: 235, total: 255, percentage: '92.2%', roles: 'Finance, Ops, CS' },
        { training: 'PCI-DSS Fundamentals', type: 'Role-Based', completed: 198, total: 214, percentage: '92.5%', roles: 'Engineering, Finance' },
        { training: 'Secure Development', type: 'Role-Based', completed: 171, total: 180, percentage: '95.0%', roles: 'Engineering' },
        { training: 'Data Access Controls', type: 'Role-Based', completed: 52, total: 55, percentage: '94.5%', roles: 'Finance, Data Team' }
      ]
    },
    irReadinessDetails: {
      title: 'Incident Response Readiness Details',
      data: [
        { component: 'IR Team Trained', status: 'Complete', coverage: '100%', lastTest: '45 days ago', nextTest: 'Q1 2025' },
        { component: 'Tabletop Exercises', status: 'Complete', coverage: '4 scenarios', lastTest: '30 days ago', nextTest: 'Q1 2025' },
        { component: 'Runbooks Current', status: 'Complete', coverage: '12 playbooks', lastTest: '15 days ago', nextTest: 'Monthly' },
        { component: 'Communication Plan', status: 'Complete', coverage: 'All channels', lastTest: '60 days ago', nextTest: 'Q2 2025' },
        { component: 'Evidence Collection', status: 'Complete', coverage: 'Tools ready', lastTest: '20 days ago', nextTest: 'Monthly' },
        { component: 'Legal/PR Contacts', status: 'Complete', coverage: 'All verified', lastTest: '90 days ago', nextTest: 'Quarterly' }
      ]
    },
    actionRequiredDetails: {
      title: 'Action Required - Overdue Items',
      data: [
        { item: 'Security training overdue', affected: '26 employees', department: 'Sales, Marketing', daysOverdue: '7-14 days', priority: 'Medium', owner: 'Department Managers' },
        { item: 'Background checks expiring', affected: '8 employees', department: 'Various', expiresIn: '30 days', priority: 'High', owner: 'HR' },
        { item: 'Access review pending', affected: '5 privileged accounts', department: 'IT, Engineering', daysOverdue: '3 days', priority: 'High', owner: 'IT Manager' },
        { item: 'Policy attestation missing', affected: '12 employees', department: 'New hires', daysOverdue: '5 days', priority: 'Medium', owner: 'Compliance' }
      ]
    },
    upcomingAuditDetails: {
      title: 'SOC 2 Type II Audit - Q1 2026',
      data: [
        { category: 'Trust Service Criteria', framework: 'SOC 2', controls: '52 controls', status: 'In scope', readiness: '94%', notes: '3 controls pending evidence' },
        { category: 'Security (CC)', framework: 'SOC 2', controls: '15 controls', status: 'Ready', readiness: '100%', notes: 'All evidence collected' },
        { category: 'Availability (A)', framework: 'SOC 2', controls: '8 controls', status: 'Ready', readiness: '100%', notes: 'Monitoring active' },
        { category: 'Confidentiality (C)', framework: 'SOC 2', controls: '12 controls', status: 'In progress', readiness: '92%', notes: 'DLP evidence needed' },
        { category: 'Privacy (P)', framework: 'SOC 2', controls: '10 controls', status: 'Ready', readiness: '100%', notes: 'Privacy program documented' },
        { category: 'Processing Integrity (PI)', framework: 'SOC 2', controls: '7 controls', status: 'In progress', readiness: '86%', notes: 'QA documentation needed' }
      ]
    },
    riskExposureLowDetails: {
      title: 'Low Risk Exposure Tier - Details',
      data: [
        { aspect: 'Data Access', details: 'Public content, marketing materials, general company info', controls: 'Standard access controls' },
        { aspect: 'Training Requirements', details: '4 hours/year - Basic security awareness', controls: 'Annual compliance training' },
        { aspect: 'Example Roles', details: 'Marketing, Admin, Facilities, General Staff', controls: 'Role-based access' },
        { aspect: 'Background Check', details: 'Standard employment verification', controls: 'Pre-hire screening' },
        { aspect: 'Monitoring Level', details: 'Standard user activity monitoring', controls: 'Annual access review' }
      ]
    },
    riskExposureModerateDetails: {
      title: 'Moderate Risk Exposure Tier - Details',
      data: [
        { aspect: 'Data Access', details: 'CRM data, proposals, analytics, operational systems metadata', controls: 'Need-to-know access' },
        { aspect: 'Training Requirements', details: '8 hours/year - Enhanced awareness + role-specific', controls: 'Semi-annual training' },
        { aspect: 'Example Roles', details: 'Sales, Product, Operations, Project Management', controls: 'Manager-approved access' },
        { aspect: 'Background Check', details: 'Enhanced background check with references', controls: 'Pre-hire + periodic updates' },
        { aspect: 'Monitoring Level', details: 'Enhanced monitoring for data downloads', controls: 'Quarterly access review' }
      ]
    },
    riskExposureHighDetails: {
      title: 'High Risk Exposure Tier - Details',
      data: [
        { aspect: 'Data Access', details: 'Production databases, customer PII, account details, financial data', controls: 'Privileged access management' },
        { aspect: 'Training Requirements', details: '16 hours/year - Comprehensive security + compliance', controls: 'Quarterly specialized training' },
        { aspect: 'Example Roles', details: 'Engineering, Customer Success, Senior Operations', controls: 'Multi-level approval required' },
        { aspect: 'Background Check', details: 'Comprehensive background + credit check', controls: 'Pre-hire + annual refresh' },
        { aspect: 'Monitoring Level', details: 'Real-time monitoring, anomaly detection, DLP', controls: 'Monthly access review' }
      ]
    },
    riskExposureCriticalDetails: {
      title: 'Critical Risk Exposure Tier - Details',
      data: [
        { aspect: 'Data Access', details: 'SSN, ACH routing, retirement contributions, full financial records', controls: 'Highly restricted PAM' },
        { aspect: 'Training Requirements', details: '24 hours/year - Advanced security + regulatory compliance', controls: 'Monthly specialized training' },
        { aspect: 'Example Roles', details: 'Finance Team, Treasury, Compliance Officers', controls: 'Executive approval required' },
        { aspect: 'Background Check', details: 'Full background + credit + financial history', controls: 'Pre-hire + semi-annual refresh' },
        { aspect: 'Monitoring Level', details: 'Continuous monitoring, session recording, strict DLP', controls: 'Weekly access review + audit' }
      ]
    },
    sxiUnderstandingMetric: {
      title: 'Security Understanding Metric - Detailed Analysis',
      data: [
        { question: 'I understand why security controls exist', score: '8.5/10', trend: '+0.3', measurement: 'Employee survey (quarterly)', businessImpact: 'Higher understanding = lower shadow IT incidents' },
        { question: 'Security training is relevant to my role', score: '8.2/10', trend: '+0.6', measurement: 'Training feedback + completion rates', businessImpact: 'Relevant training = better retention and application' },
        { question: 'I know where to find security policies', score: '7.8/10', trend: '+0.2', measurement: 'Survey + policy portal analytics', businessImpact: 'Easy policy access = compliance improvement' }
      ]
    },
    sxiSupportMetric: {
      title: 'Security Support Metric - Detailed Analysis',
      data: [
        { question: 'Security team is approachable and helpful', score: '8.3/10', trend: '+0.5', measurement: 'Employee survey + ticket resolution ratings', businessImpact: 'Approachable security = more proactive reporting' },
        { question: 'I know where to ask security questions', score: '8.1/10', trend: '+0.4', measurement: 'Survey + Slack channel engagement', businessImpact: 'Clear channels = faster issue resolution' },
        { question: 'Security doesn\'t slow down my work', score: '7.9/10', trend: '+0.1', measurement: 'Survey + friction incident reports', businessImpact: 'Low friction = less workaround behavior' }
      ]
    },
    sxiPsychSafetyMetric: {
      title: 'Psychological Safety Metric - Detailed Analysis',
      data: [
        { question: 'I feel safe reporting security mistakes', score: '8.4/10', trend: '+0.2', measurement: 'Anonymous survey + self-report rates', businessImpact: 'Safety to report = earlier incident detection' },
        { question: 'I won\'t be punished for security questions', score: '8.6/10', trend: '+0.3', measurement: 'Survey + question volume tracking', businessImpact: 'No-blame culture = more employee vigilance' },
        { question: 'Leaders encourage security discussions', score: '8.2/10', trend: '+0.4', measurement: 'Survey + manager feedback', businessImpact: 'Leadership support = cultural adoption' }
      ]
    },
    improvementWorkflowAnalysis: {
      title: 'Workflow Friction Analysis',
      data: [
        { workflow: 'VPN Connection for Remote Work', frictionScore: 3.2, complaints: 12, improvement: 'Deploy zero-trust architecture to eliminate VPN', timeline: 'Q2 2025', owner: 'IT Infrastructure' },
        { workflow: 'Multi-step approval for tool requests', frictionScore: 4.1, complaints: 23, improvement: 'Implement automated approval for pre-approved tools', timeline: 'Q1 2025', owner: 'IT Operations' },
        { workflow: 'Password reset process', frictionScore: 2.8, complaints: 8, improvement: 'Self-service password reset with MFA', timeline: 'Completed', owner: 'Identity Team' },
        { workflow: 'Access request turnaround time', frictionScore: 3.5, complaints: 15, improvement: 'Automated provisioning for standard roles', timeline: 'Q2 2025', owner: 'IAM Team' }
      ]
    },
    improvementTrainingOptimization: {
      title: 'Training Optimization Opportunities',
      data: [
        { area: 'Microlearning modules', currentState: 'Long annual trainings', opportunity: 'Break into 10-min monthly modules', impact: 'Higher retention', timeline: 'Q1 2025', owner: 'Security Awareness' },
        { area: 'Role-based content', currentState: 'Generic training for all', opportunity: 'Tailored content by risk tier', impact: 'More relevant', timeline: 'In progress', owner: 'Training Team' },
        { area: 'Gamification', currentState: 'Traditional quiz format', opportunity: 'Interactive scenarios and badges', impact: 'Better engagement', timeline: 'Q2 2025', owner: 'Training Team' },
        { area: 'Just-in-time training', currentState: 'Scheduled trainings', opportunity: 'Training at point of need (e.g., when granted new access)', impact: 'Contextual learning', timeline: 'Q3 2025', owner: 'IAM + Training' }
      ]
    },
    improvementToolIntegration: {
      title: 'Security Tool Integration Improvements',
      data: [
        { integration: 'Slack + Security Alerts', currentState: 'Email-only alerts', opportunity: 'Real-time Slack notifications', impact: 'Faster response', timeline: 'Q1 2025', owner: 'Security Engineering' },
        { integration: 'Jira + Security Tasks', currentState: 'Separate tracking', opportunity: 'Auto-create Jira tickets for security work', impact: 'Better workflow', timeline: 'Completed', owner: 'DevSecOps' },
        { integration: 'Okta + Rippling/JumpCloud', currentState: 'Dual SSO systems', opportunity: 'Unified SSO via Okta', impact: 'Simplified access', timeline: 'Q2 2025', owner: 'IAM Team' },
        { integration: 'GitHub + Security Scanning', currentState: 'Manual security reviews', opportunity: 'Automated SAST/DAST in CI/CD', impact: 'Shift-left security', timeline: 'In progress', owner: 'AppSec Team' }
      ]
    },
    phishingByDepartment: {
      title: 'Phishing Simulation - Click Rate by Department',
      data: [
        { department: 'Engineering', employees: 180, clicked: 12, clickRate: '6.7%', trend: 'Improving', lastTest: '11 days ago' },
        { department: 'Sales', employees: 44, clicked: 6, clickRate: '13.6%', trend: 'Needs focus', lastTest: '11 days ago' },
        { department: 'Customer Success', employees: 34, clicked: 2, clickRate: '5.9%', trend: 'Excellent', lastTest: '11 days ago' },
        { department: 'Operations', employees: 100, clicked: 9, clickRate: '9.0%', trend: 'Improving', lastTest: '11 days ago' },
        { department: 'Product', employees: 52, clicked: 3, clickRate: '5.8%', trend: 'Excellent', lastTest: '11 days ago' },
        { department: 'Finance', employees: 21, clicked: 1, clickRate: '4.8%', trend: 'Excellent', lastTest: '11 days ago' },
        { department: 'Legal & Compliance', employees: 13, clicked: 0, clickRate: '0.0%', trend: 'Excellent', lastTest: '11 days ago' },
        { department: 'HR', employees: 6, clicked: 0, clickRate: '0.0%', trend: 'Excellent', lastTest: '11 days ago' }
      ]
    },
    phishingByRole: {
      title: 'Phishing Simulation - Report Rate by Role Level',
      data: [
        { roleLevel: 'Executive Leadership', employees: 8, reported: 7, reportRate: '87.5%', notReported: 1, training: 'Quarterly executive briefings' },
        { roleLevel: 'Senior Management', employees: 24, reported: 20, reportRate: '83.3%', notReported: 4, training: 'Manager security workshops' },
        { roleLevel: 'Team Leads', employees: 52, reported: 42, reportRate: '80.8%', notReported: 10, training: 'Leadership security training' },
        { roleLevel: 'Senior Individual Contributors', employees: 98, reported: 76, reportRate: '77.6%', notReported: 22, training: 'Role-based security awareness' },
        { roleLevel: 'Mid-level Staff', employees: 156, reported: 116, reportRate: '74.4%', notReported: 40, training: 'Standard security training' },
        { roleLevel: 'Junior Staff', employees: 112, reported: 79, reportRate: '70.5%', notReported: 33, training: 'Onboarding + quarterly updates' }
      ]
    },
    securityChampionsByDept: {
      title: 'Security Champions Program - By Department',
      data: [
        { department: 'Engineering', champions: 8, employees: 180, coverage: '4.4%', issuesDetected: 7, lastActive: '2 days ago', lead: 'Sarah Chen (Staff Engineer)' },
        { department: 'Operations', champions: 5, employees: 100, coverage: '5.0%', issuesDetected: 3, lastActive: '1 day ago', lead: 'Michael Torres (Ops Manager)' },
        { department: 'Product', champions: 3, employees: 52, coverage: '5.8%', issuesDetected: 1, lastActive: '5 days ago', lead: 'Emily Watson (Sr PM)' },
        { department: 'Customer Success', champions: 2, employees: 34, coverage: '5.9%', issuesDetected: 0, lastActive: '3 days ago', lead: 'James Rodriguez (CS Lead)' },
        { department: 'Sales', champions: 2, employees: 44, coverage: '4.5%', issuesDetected: 1, lastActive: '7 days ago', lead: 'Alex Kim (Sales Director)' },
        { department: 'Finance', champions: 2, employees: 21, coverage: '9.5%', issuesDetected: 0, lastActive: '1 day ago', lead: 'Rachel Green (Controller)' },
        { department: 'Legal & Compliance', champions: 1, employees: 13, coverage: '7.7%', issuesDetected: 0, lastActive: '4 days ago', lead: 'David Park (Compliance Manager)' }
      ]
    },
    integrationMilestonesDetailed: {
      title: 'Identity Integration Phases - Detailed Timeline',
      data: [
        { phase: 'Phase 1: Assessment', timeline: 'Completed (Q3 2024)', team: 'IAM, IT Ops', activities: 'Current state mapping, stakeholder interviews, gap analysis', deliverables: 'Integration roadmap, risk assessment', status: 'Done' },
        { phase: 'Phase 2: Okta Deployment', timeline: 'In Progress (Q4 2024 - Q1 2025)', team: 'IAM, Engineering', activities: 'Okta tenant setup, app integrations, SSO configuration', deliverables: 'Working Okta instance, 20+ apps integrated', status: '65% complete' },
        { phase: 'Phase 3: Rippling Migration', timeline: 'Q1-Q2 2025', team: 'HR, IAM, IT Ops', activities: 'User migration, SCIM provisioning, HR workflow integration', deliverables: 'Rippling users moved to Okta', status: 'Not started' },
        { phase: 'Phase 4: JumpCloud Migration', timeline: 'Q2 2025', team: 'IAM, Engineering', activities: 'Device management migration, LDAP cutover, policy updates', deliverables: 'JumpCloud users moved to Okta', status: 'Not started' },
        { phase: 'Phase 5: Optimization', timeline: 'Q2-Q3 2025', team: 'IAM, Security', activities: 'Automated provisioning, advanced MFA, risk-based access', deliverables: 'Streamlined IAM operations', status: 'Not started' },
        { phase: 'Phase 6: Decommission', timeline: 'Q3 2025', team: 'IAM, Finance', activities: 'Legacy system shutdown, contract termination, documentation', deliverables: 'Single SSO platform (Okta)', status: 'Not started' }
      ]
    },
    privilegedAccountsFramework: {
      title: 'Privileged Accounts - Framework Mapping',
      data: [
        { account: 'Production DB Admin', users: 8, framework: 'SOC 2 CC6.1, PCI-DSS 7.1', lastReview: '14 days ago', complianceStatus: 'Compliant', notes: 'Quarterly review required' },
        { account: 'AWS Root Access', users: 3, framework: 'SOC 2 CC6.2, CIS AWS 1.1', lastReview: '7 days ago', complianceStatus: 'Compliant', notes: 'MFA enforced, hardware tokens' },
        { account: 'Domain Admin', users: 5, framework: 'SOC 2 CC6.1, NIST AC-6', lastReview: '21 days ago', complianceStatus: 'Compliant', notes: 'Least privilege principle applied' },
        { account: 'Production Deploy', users: 12, framework: 'SOC 2 CC7.2, PCI-DSS 7.1', lastReview: '10 days ago', complianceStatus: 'Compliant', notes: 'Change management integrated' },
        { account: 'Security Admin', users: 6, framework: 'SOC 2 CC6.3, NIST AC-2', lastReview: '5 days ago', complianceStatus: 'Compliant', notes: 'Segregation of duties enforced' },
        { account: 'Customer Data Access', users: 9, framework: 'SOC 2 CC6.6, Privacy Shield', lastReview: '12 days ago', complianceStatus: 'Compliant', notes: 'Access logging and monitoring active' }
      ]
    },
    orphanedAccountsProcess: {
      title: 'Orphaned Accounts - Remediation Process',
      data: [
        { account: 'jdoe@vestwell.com', status: 'Contractor ended', daysOrphaned: 5, dataAccess: 'CRM, Slack', risk: 'Medium', nextStep: 'Disable immediately', owner: 'IT Ops', offboardingStep: '1. Disable account' },
        { account: 'temp_consultant_2023', status: 'Project completed', daysOrphaned: 12, dataAccess: 'Document repository', risk: 'Low', nextStep: 'Archive and disable', owner: 'IT Ops', offboardingStep: '2. Archive data, 3. Disable' },
        { offboardingProcess: 'Standard Process', step: '1', action: 'HR triggers offboarding in HRIS', timing: 'Last day or earlier', responsible: 'HR', automation: 'Automated workflow' },
        { offboardingProcess: 'Standard Process', step: '2', action: 'Disable all accounts (AD, SSO, email)', timing: 'Within 2 hours', responsible: 'IT Ops', automation: 'SCIM deprovisioning' },
        { offboardingProcess: 'Standard Process', step: '3', action: 'Revoke application access', timing: 'Within 4 hours', responsible: 'IT Ops', automation: 'Automated via IAM' },
        { offboardingProcess: 'Standard Process', step: '4', action: 'Archive email, transfer files', timing: 'Within 1 day', responsible: 'IT Ops + Manager', automation: 'Semi-automated' },
        { offboardingProcess: 'Standard Process', step: '5', action: 'Remove physical access', timing: 'Same day', responsible: 'Facilities', automation: 'Badge system integration' },
        { offboardingProcess: 'Standard Process', step: '6', action: 'Final audit and sign-off', timing: 'Within 3 days', responsible: 'IT Manager', automation: 'Manual review' }
      ]
    },
    mfaDetails: {
      title: 'MFA Implementation - Coverage and Tools',
      data: [
        { system: 'Okta (SSO)', tool: 'Okta Verify', coverage: '100%', users: 450, exceptions: 0, methods: 'Push, TOTP, SMS backup', status: 'Complete' },
        { system: 'AWS Root Accounts', tool: 'Hardware tokens (YubiKey)', coverage: '100%', users: 3, exceptions: 0, methods: 'FIDO2, U2F', status: 'Complete' },
        { system: 'GitHub Enterprise', tool: 'GitHub 2FA', coverage: '100%', users: 180, exceptions: 0, methods: 'TOTP, security keys', status: 'Complete' },
        { system: 'VPN Access', tool: 'Okta Verify', coverage: '100%', users: 256, exceptions: 0, methods: 'Push notification', status: 'Complete' },
        { system: 'Production Database', tool: 'Okta Verify + Teleport', coverage: '100%', users: 8, exceptions: 0, methods: 'Push + per-session MFA', status: 'Complete' },
        { system: 'Remaining Coverage', tool: 'Various', coverage: '97.8%', users: 440, exceptions: 10, methods: 'Mixed', status: 'In progress - targeting 100%' }
      ]
    },
    reviewStatusDetails: {
      title: 'Access Review Status - Detailed Breakdown',
      data: [
        { reviewType: 'Privileged Access Review', frequency: 'Quarterly', lastCompleted: '14 days ago', nextDue: '76 days', completion: '100%', findings: 'None', status: 'On track' },
        { reviewType: 'User Access Recertification', frequency: 'Semi-annual', lastCompleted: '42 days ago', nextDue: '138 days', completion: '100%', findings: '3 accounts adjusted', status: 'On track' },
        { reviewType: 'Role-Based Access Review', frequency: 'Annual', lastCompleted: '89 days ago', nextDue: '276 days', completion: '100%', findings: '5 roles refined', status: 'On track' },
        { reviewType: 'Contractor Access Review', frequency: 'Monthly', lastCompleted: '18 days ago', nextDue: '12 days', completion: '100%', findings: '2 accounts removed', status: 'On track' },
        { reviewType: 'Shared Account Review', frequency: 'Quarterly', lastCompleted: '8 days ago', nextDue: '82 days', completion: '100%', findings: 'None', status: 'On track' }
      ]
    },
    insiderRiskContractorAccess: {
      title: 'Insider Risk - Contractor Access Expiration',
      data: [
        { contractor: 'Contract Engineer #1', company: 'Tech Consulting LLC', accessExpires: '15 days', systems: 'GitHub, Jira, Slack', action: 'Renew or offboard', renewalOwner: 'Engineering Manager', status: 'Pending decision' },
        { contractor: 'Contract Engineer #2', company: 'Dev Services Inc', accessExpires: '23 days', systems: 'GitHub, AWS (read-only)', action: 'Renew or offboard', renewalOwner: 'Engineering Manager', status: 'Renewal approved' },
        { contractor: 'Finance Consultant', company: 'CFO Advisory', accessExpires: '8 days', systems: 'NetSuite, reporting tools', action: 'Renew or offboard', renewalOwner: 'Finance Director', status: 'Pending decision' },
        { contractor: 'Security Consultant', company: 'SecOps Partners', accessExpires: '45 days', systems: 'Security tools, logs', action: 'Renew or offboard', renewalOwner: 'CISO', status: 'Renewal in progress' },
        { renewalProcess: 'Process Step 1', description: 'System flags access expiring in 30 days', responsible: 'IAM automation', timing: '30 days before expiration' },
        { renewalProcess: 'Process Step 2', description: 'Notification to hiring manager and HR', responsible: 'IAM system', timing: '30, 14, 7 days before' },
        { renewalProcess: 'Process Step 3', description: 'Manager approves renewal or termination', responsible: 'Hiring Manager', timing: 'Within 7 days of notice' },
        { renewalProcess: 'Process Step 4', description: 'If renewal: extend access, update contract', responsible: 'HR + IAM', timing: 'Before expiration' },
        { renewalProcess: 'Process Step 5', description: 'If termination: disable access, offboard', responsible: 'IAM + IT', timing: 'On expiration date' }
      ]
    },
    insiderRiskFailedLogins: {
      title: 'Insider Risk - Multiple Failed Login Analysis',
      data: [
        { entity: 'user_eng_142@vestwell.com', entityType: 'User', failedAttempts: 8, timeframe: 'Last 24 hours', system: 'VPN', possibleCause: 'Password expired', action: 'User contacted, password reset', risk: 'Low' },
        { entity: 'service_account_reporting', entityType: 'Service Account', failedAttempts: 156, timeframe: 'Last hour', system: 'Database', possibleCause: 'Credential rotation needed', action: 'IT investigating', risk: 'Medium' },
        { entity: 'user_sales_089@vestwell.com', entityType: 'User', failedAttempts: 12, timeframe: 'Last 48 hours', system: 'Okta SSO', possibleCause: 'User traveling, typing errors', action: 'Monitoring, no action yet', risk: 'Low' },
        { entity: 'api_integration_crm', entityType: 'Application', failedAttempts: 43, timeframe: 'Last 6 hours', system: 'CRM API', possibleCause: 'Integration misconfiguration', action: 'Engineering team notified', risk: 'Medium' },
        { entity: 'Unknown', entityType: 'External', failedAttempts: 234, timeframe: 'Last 24 hours', system: 'Public login page', possibleCause: 'Brute force attempt', action: 'IP blocked, security monitoring', risk: 'High - blocked' }
      ]
    },
    continuousMonitoring: {
      title: 'Continuous Monitoring - Active Controls',
      data: [
        { control: 'Anomalous Login Detection', tool: 'Okta ThreatInsight + SIEM', coverage: 'All users', alerts: '12 this month', falsePositives: '2', effectiveness: '92%' },
        { control: 'After-hours Access Monitoring', tool: 'SIEM + UEBA', coverage: 'Privileged accounts', alerts: '8 this month', falsePositives: '1', effectiveness: '95%' },
        { control: 'Data Exfiltration Detection', tool: 'DLP + CASB', coverage: 'All endpoints + cloud', alerts: '3 this month', falsePositives: '0', effectiveness: '98%' },
        { control: 'Privileged Command Monitoring', tool: 'Teleport + Splunk', coverage: 'Production systems', alerts: '5 this month', falsePositives: '0', effectiveness: '100%' },
        { control: 'Failed Authentication Tracking', tool: 'SIEM aggregation', coverage: 'All systems', alerts: '23 this month', falsePositives: '18', effectiveness: '68% (tuning needed)' },
        { control: 'Insider Threat Scoring', tool: 'UEBA platform', coverage: 'All employees', alerts: '4 medium risk this month', falsePositives: '1', effectiveness: '89%' }
      ]
    },
    controlEffectivenessDetails: {
      title: 'Control Effectiveness - SOC 2 & PCI-DSS',
      data: [
        { control: 'Access Control (CC6.1)', framework: 'SOC 2', testing: 'Quarterly sample testing', lastTest: '30 days ago', result: 'Effective', evidence: 'Access logs, provisioning records', deficiencies: 'None' },
        { control: 'Logical Access (CC6.2)', framework: 'SOC 2', testing: 'Monthly automated scans', lastTest: '5 days ago', result: 'Effective', evidence: 'MFA reports, access reviews', deficiencies: 'None' },
        { control: 'Change Management (CC8.1)', framework: 'SOC 2', testing: 'Quarterly sample testing', lastTest: '45 days ago', result: 'Effective', evidence: 'Jira tickets, GitHub logs', deficiencies: 'None' },
        { control: 'Restrict Access (7.1)', framework: 'PCI-DSS v4', testing: 'Quarterly review', lastTest: '21 days ago', result: 'Effective', evidence: 'Access matrix, least privilege', deficiencies: 'None' },
        { control: 'Unique ID (8.2)', framework: 'PCI-DSS v4', testing: 'Monthly automated', lastTest: '8 days ago', result: 'Effective', evidence: 'No shared accounts', deficiencies: 'None' },
        { control: 'MFA for CDE (8.4)', framework: 'PCI-DSS v4', testing: 'Continuous monitoring', lastTest: 'Real-time', result: 'Effective', evidence: 'MFA logs, 100% coverage', deficiencies: 'None' }
      ]
    },
    gapAnalysisFrameworks: {
      title: 'Gap Analysis - Frameworks & Audit Readiness',
      data: [
        { framework: 'SOC 2 Type II', auditReady: 'Yes', gaps: 'None critical', minorGaps: '3 documentation updates needed', compliance: '98%', lastAudit: 'Q1 2024', nextAudit: 'Q1 2026', auditor: 'Deloitte' },
        { framework: 'PCI-DSS v4.0.1', auditReady: 'Yes', gaps: 'None', minorGaps: 'None', compliance: '100%', lastAudit: 'Q3 2024', nextAudit: 'Q2 2025', auditor: 'TrustArc' },
        { framework: 'SEC Investment Advisor', auditReady: 'Yes', gaps: 'None', minorGaps: '1 policy update', compliance: '99%', lastAudit: 'Q2 2024', nextAudit: 'Annual', auditor: 'Internal Audit' },
        { framework: 'FINRA Rule 3110', auditReady: 'Yes', gaps: 'None', minorGaps: 'None', compliance: '100%', lastAudit: 'Ongoing', nextAudit: 'Ongoing', auditor: 'Compliance Team' },
        { framework: 'State Privacy Laws (CCPA/CPRA)', auditReady: 'Yes', gaps: 'None', minorGaps: '2 process enhancements', compliance: '97%', lastAudit: 'Q3 2024', nextAudit: 'Q4 2025', auditor: 'Privacy Team' },
        { framework: 'NIST Cybersecurity Framework', auditReady: 'Partial', gaps: '4 maturity improvements', minorGaps: '8 enhancements identified', compliance: '85%', lastAudit: 'Q4 2024', nextAudit: 'Internal use', auditor: 'Self-assessment' }
      ]
    },
    upcomingReviewsDetailed: {
      title: 'Upcoming Reviews - Timeline & Outstanding Items',
      data: [
        { review: 'SOC 2 Type II', timeline: 'Q1 2026 (Fieldwork: Jan 20-31)', status: 'Preparation phase', outstandingItems: '3 documentation updates', gapsFromPrevious: 'None - clean opinion', auditorNotes: 'Strong controls, good documentation' },
        { review: 'PCI-DSS Annual', timeline: 'Q2 2025 (April 2025)', status: 'Scheduled', outstandingItems: 'None', gapsFromPrevious: 'None - fully compliant', auditorNotes: 'Mature PCI program' },
        { review: 'Internal Security Assessment', timeline: 'Q1 2025 (Monthly)', status: 'Ongoing', outstandingItems: '5 medium findings remediation', gapsFromPrevious: '2 findings from Dec (in progress)', auditorNotes: 'Continuous improvement process' },
        { review: 'SEC Compliance Review', timeline: 'Q3 2025', status: 'Not started', outstandingItems: 'TBD', gapsFromPrevious: '1 policy update from 2024', auditorNotes: 'Annual review, good track record' },
        { review: 'Access Review Audit', timeline: 'Monthly', status: 'On track', outstandingItems: 'None', gapsFromPrevious: 'None', auditorNotes: 'Automated process working well' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                People Risk & Compliance Dashboard
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Vestwell • Security-People Partnership • Updated: Dec 15, 2024, 08:00 EST
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Organization Health</p>
                <p className="text-2xl font-bold text-emerald-600">{dashboardData.overview.securityScore}/100</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'hrem', label: 'Risk Exposure Model', icon: <Layers className="w-4 h-4" /> },
              { id: 'sxi', label: 'Security Experience', icon: <Heart className="w-4 h-4" /> },
              { id: 'lifecycle', label: 'Employee Journey', icon: <MapPin className="w-4 h-4" /> },
              { id: 'culture', label: 'Security Culture', icon: <Users className="w-4 h-4" /> },
              { id: 'access', label: 'Identity & Access', icon: <Lock className="w-4 h-4" /> },
              { id: 'risk', label: 'Insider Risk', icon: <Eye className="w-4 h-4" /> },
              { id: 'compliance', label: 'Compliance', icon: <Award className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Key Metrics */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Key Performance Indicators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <MetricCard
                  title="Total Employees"
                  value={dashboardData.overview.totalEmployees}
                  icon={<Users className="w-6 h-6 text-slate-600" />}
                  status="good"
                />
                <MetricCard
                  title="Security Score"
                  value={dashboardData.overview.securityScore}
                  change="+3 pts"
                  trend="up"
                  icon={<Shield className="w-6 h-6 text-emerald-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.securityScoreTimeline)}
                />
                <MetricCard
                  title="Compliance Rate"
                  value={dashboardData.overview.complianceStatus}
                  change="+1.2%"
                  trend="up"
                  icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.complianceRateTimeline)}
                />
                <MetricCard
                  title="Critical Alerts"
                  value={dashboardData.overview.criticalAlerts}
                  change="-2 vs last week"
                  trend="down"
                  icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
                  status="warning"
                  onClick={() => setDrillDownData(drillDownDetails.criticalAlertsDetail)}
                />
                <MetricCard
                  title="Training Complete"
                  value={dashboardData.overview.trainingCompletion}
                  change="+2.1%"
                  trend="up"
                  icon={<BookOpen className="w-6 h-6 text-emerald-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.trainingMandatoryRoleBased)}
                />
                <MetricCard
                  title="IR Readiness"
                  value={dashboardData.overview.incidentResponseReady}
                  icon={<Activity className="w-6 h-6 text-emerald-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.irReadinessDetails)}
                />
              </div>
            </section>

            {/* Quick Insights */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Quick Insights & Actions Required
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Strong Improvement</h3>
                      <p className="text-sm text-slate-600">
                        Phishing click rate decreased 5.1% QoQ. Report rate up to 76.4%.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-white rounded-xl p-6 border border-amber-200 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.actionRequiredDetails)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Action Required</h3>
                      <p className="text-sm text-slate-600">
                        5 access reviews overdue. 8 background checks expiring in 30 days.
                      </p>
                      <p className="text-xs text-blue-600 mt-2">Click for details →</p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.upcomingAuditDetails)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Upcoming Audit</h3>
                      <p className="text-sm text-slate-600">
                        SOC 2 Type II audit scheduled Q1 2026 with Deloitte.
                      </p>
                      <p className="text-xs text-blue-600 mt-2">Click for details →</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Security Awareness & Training</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Phishing Simulation */}
                <FlipCard
                  front={
                    <div className="h-full bg-white rounded-xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">Phishing Simulation</h3>
                        <Bell className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600">Click Rate</span>
                            <span className="text-sm font-semibold text-emerald-600">
                              {dashboardData.securityCulture.phishingSimulation.clickRate}
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '8.3%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600">Report Rate</span>
                            <span className="text-sm font-semibold text-blue-600">
                              {dashboardData.securityCulture.phishingSimulation.reportRate}
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '76.4%' }}></div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-4">
                          Last test: {dashboardData.securityCulture.phishingSimulation.lastTest}
                        </p>
                      </div>
                      <p className="text-xs text-center text-slate-400 mt-4">Click for historical data</p>
                    </div>
                  }
                  back={
                    <div className="h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                      <h3 className="font-semibold mb-4">6-Month Trend</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>July 2024:</span>
                          <span>16.2% clicks</span>
                        </div>
                        <div className="flex justify-between">
                          <span>August:</span>
                          <span>14.8% clicks</span>
                        </div>
                        <div className="flex justify-between">
                          <span>September:</span>
                          <span>13.2% clicks</span>
                        </div>
                        <div className="flex justify-between">
                          <span>October:</span>
                          <span>11.7% clicks</span>
                        </div>
                        <div className="flex justify-between">
                          <span>November:</span>
                          <span>9.1% clicks</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>December:</span>
                          <span>8.3% clicks ⬇️</span>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDrillDownData(drillDownDetails.phishingByDepartment);
                          }}
                          className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 text-sm font-medium transition-colors"
                        >
                          View Click Rate by Department
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDrillDownData(drillDownDetails.phishingByRole);
                          }}
                          className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 text-sm font-medium transition-colors"
                        >
                          View Report Rate by Role
                        </button>
                      </div>
                    </div>
                  }
                />

                {/* Training Completion */}
                <div 
                  className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.training)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Training Completion</h3>
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">Annual Security Training</span>
                        <span className="text-sm font-semibold">368/390</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '94.4%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">Financial Services Compliance</span>
                        <span className="text-sm font-semibold">382/390</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '97.9%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">PCI Fundamentals</span>
                        <span className="text-sm font-semibold">375/390</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">Incident Response</span>
                        <span className="text-sm font-semibold">351/390</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '90.0%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-slate-500">
                    <ChevronRight className="w-4 h-4" />
                    Click to view by department
                  </div>
                </div>

                {/* Security Champions */}
                <FlipCard
                  front={
                    <div className="h-full bg-white rounded-xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">Security Champions Program</h3>
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600">
                            {dashboardData.securityCulture.securityChampions.active}
                          </p>
                          <p className="text-xs text-slate-600 mt-1">Active Champions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-emerald-600">
                            {dashboardData.securityCulture.securityChampions.departments}
                          </p>
                          <p className="text-xs text-slate-600 mt-1">Departments</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-indigo-600">
                            {dashboardData.securityCulture.securityChampions.incidents}
                          </p>
                          <p className="text-xs text-slate-600 mt-1">Issues Detected</p>
                        </div>
                      </div>
                      <p className="text-xs text-center text-slate-400 mt-6">Click for program details</p>
                    </div>
                  }
                  back={
                    <div className="h-full bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
                      <h3 className="font-semibold mb-4">Program Impact</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>12 security incidents identified and resolved early</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>8 departments with active representation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Monthly knowledge sharing sessions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Direct channel to security team</span>
                        </li>
                      </ul>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrillDownData(drillDownDetails.securityChampionsByDept);
                        }}
                        className="mt-4 w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 text-sm font-medium transition-colors"
                      >
                        View Champions by Department
                      </button>
                    </div>
                  }
                />

                {/* Cultural Health */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Cultural Health Indicators</h3>
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Security Questions (30d)</span>
                      <span className="text-sm font-semibold text-blue-600">147</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Anonymous Reports</span>
                      <span className="text-sm font-semibold text-emerald-600">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Policy Acknowledgments</span>
                      <span className="text-sm font-semibold text-emerald-600">100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Engagement Score</span>
                      <span className="text-sm font-semibold text-blue-600">8.7/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'access' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Dual SSO Integration Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <GitBranch className="w-6 h-6" />
                    Dual SSO Integration Project
                  </h2>
                  <p className="text-indigo-100 mb-3">
                    Merging Rippling + JumpCloud for unified identity management and granular provisioning
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      Status: {dashboardData.dualSSO.mergeStatus}
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      Target: {dashboardData.dualSSO.targetDate}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500 rounded-full text-sm font-bold">
                      {dashboardData.dualSSO.conflicts} Conflicts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dual SSO Overview */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-600" />
                Current SSO Architecture
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Rippling */}
                <div className="bg-white rounded-xl p-6 border-2 border-blue-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">Rippling</h3>
                        <p className="text-sm text-slate-600">HR-Driven Provisioning</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {dashboardData.dualSSO.rippling.coverage}
                    </span>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-slate-700">Active Users</span>
                      <span className="text-sm font-bold text-blue-600">{dashboardData.dualSSO.rippling.users}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm text-slate-700">Sync Status</span>
                      <span className="text-sm font-bold text-emerald-600">{dashboardData.dualSSO.rippling.syncStatus}</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Primary Use Cases</p>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li>✓ HR-driven onboarding/offboarding</li>
                      <li>✓ Google Workspace provisioning</li>
                      <li>✓ Okta integration</li>
                      <li>✓ SaaS app management (Slack, Zoom)</li>
                    </ul>
                  </div>
                </div>

                {/* JumpCloud */}
                <div className="bg-white rounded-xl p-6 border-2 border-purple-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <Lock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">JumpCloud</h3>
                        <p className="text-sm text-slate-600">Technical Infrastructure</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                      {dashboardData.dualSSO.jumpcloud.coverage}
                    </span>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm text-slate-700">Active Users</span>
                      <span className="text-sm font-bold text-purple-600">{dashboardData.dualSSO.jumpcloud.users}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm text-slate-700">Sync Status</span>
                      <span className="text-sm font-bold text-emerald-600">{dashboardData.dualSSO.jumpcloud.syncStatus}</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Primary Use Cases</p>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li>✓ Engineering workstation access</li>
                      <li>✓ VPN authentication</li>
                      <li>✓ Linux/Mac device management</li>
                      <li>✓ SSH key management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Merge Strategy */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Unified SSO Vision (Target State)
              </h2>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Single Source of Truth</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Rippling becomes the authoritative HR system. All user provisioning flows from hire date.
                    </p>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <p className="text-xs text-slate-500 mb-1">Data Flow</p>
                      <p className="text-sm font-semibold text-slate-900">Rippling → JumpCloud → All Apps</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Granular Provisioning</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      JumpCloud manages technical access based on role, department, and HREM tier.
                    </p>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <p className="text-xs text-slate-500 mb-1">Access Logic</p>
                      <p className="text-sm font-semibold text-slate-900">Role + HREM Tier = Permissions</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Onboarding/Offboarding</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Automated workflows: HR updates status in Rippling, access changes propagate instantly.
                    </p>
                    <div className="bg-white rounded-lg p-3 border border-emerald-200">
                      <p className="text-xs text-slate-500 mb-1">Target Speed</p>
                      <p className="text-sm font-semibold text-slate-900">Provision: &lt;1hr | Deprovision: &lt;15min</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-300">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">CPO Benefit: Unified Employee Experience</p>
                      <p className="text-sm text-slate-600">
                        Employees get provisioned on day 1 with zero IT tickets. HR sees real-time access status.
                        Offboarding is instant and complete - no orphaned accounts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Progress Tracker */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Integration Milestones
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-emerald-300">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Phase 1: Discovery</h4>
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">User inventory & app mapping</p>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">COMPLETE</span>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-emerald-300">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Phase 2: API Setup</h4>
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Rippling ↔ JumpCloud sync</p>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">COMPLETE</span>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-blue-300">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Phase 3: Pilot</h4>
                    <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Testing with 25 users (IT/Security)</p>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">IN PROGRESS</span>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Phase 4: Rollout</h4>
                    <Clock className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Full deployment to 450 employees</p>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">Q2 2025</span>
                </div>
              </div>
              <button
                onClick={() => setDrillDownData(drillDownDetails.integrationMilestonesDetailed)}
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                View Detailed Integration Plan
                <ChevronRight className="w-4 h-4" />
              </button>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Identity & Access Governance</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <MetricCard
                  title="Privileged Accounts"
                  value={dashboardData.identityAccess.privilegedAccounts}
                  icon={<Lock className="w-6 h-6 text-blue-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.privilegedAccess)}
                />
                <MetricCard
                  title="Orphaned Accounts"
                  value={dashboardData.identityAccess.orphanedAccounts}
                  change="-3 vs last month"
                  trend="down"
                  icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
                  status="warning"
                  onClick={() => setDrillDownData(drillDownDetails.orphanedAccountsProcess)}
                />
                <MetricCard
                  title="MFA Adoption"
                  value={dashboardData.identityAccess.mfaAdoption}
                  change="+0.5%"
                  trend="up"
                  icon={<Shield className="w-6 h-6 text-emerald-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.mfaDetails)}
                />
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setDrillDownData(drillDownDetails.reviewStatusDetails)}
              >
                <h3 className="font-semibold text-slate-900 mb-4">Access Review Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Reviews Overdue</p>
                      <p className="text-sm text-slate-600">Requires immediate attention</p>
                    </div>
                    <span className="text-2xl font-bold text-amber-600">
                      {dashboardData.identityAccess.accessReviewsOverdue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Avg Deprovision Time</p>
                      <p className="text-sm text-slate-600">Target: &lt; 4 hours</p>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">
                      {dashboardData.identityAccess.avgDeprovisionTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">SoD Violations</p>
                      <p className="text-sm text-slate-600">Segregation of Duties</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">
                      {dashboardData.identityAccess.sodViolations}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                  Click for detailed review status
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Lifecycle Management</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Onboarding (Avg Time to Access)</span>
                      <span className="text-sm font-semibold text-emerald-600">1.8 hours</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Target: &lt; 4 hours</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Offboarding (Avg Time to Deprovisio n)</span>
                      <span className="text-sm font-semibold text-emerald-600">2.3 hours</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Target: &lt; 4 hours</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Role Changes (Avg Processing)</span>
                      <span className="text-sm font-semibold text-blue-600">5.2 hours</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Target: &lt; 8 hours</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Insider Risk Monitoring</h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="High Risk Users"
                  value={dashboardData.insiderRisk.highRiskUsers}
                  icon={<Eye className="w-6 h-6 text-amber-600" />}
                  status="warning"
                  onClick={() => setDrillDownData(drillDownDetails.insiderRisk)}
                />
                <MetricCard
                  title="Anomalous Access"
                  value={dashboardData.insiderRisk.anomalousAccess}
                  icon={<Activity className="w-6 h-6 text-blue-600" />}
                  status="good"
                />
                <MetricCard
                  title="Data Exfiltration"
                  value={dashboardData.insiderRisk.dataExfiltration}
                  icon={<AlertTriangle className="w-6 h-6 text-rose-600" />}
                  status="critical"
                />
                <MetricCard
                  title="Offboarding Pending"
                  value={dashboardData.insiderRisk.offboardingPending}
                  icon={<Clock className="w-6 h-6 text-amber-600" />}
                  status="warning"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Risk Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">After-hours access patterns</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      2 users
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => setDrillDownData(drillDownDetails.insiderRiskFailedLogins)}
                  >
                    <span className="text-sm text-slate-700">Multiple failed login attempts</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      Details →
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">Unusual data downloads</span>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded-full">
                      1 user
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => setDrillDownData(drillDownDetails.insiderRiskContractorAccess)}
                  >
                    <span className="text-sm text-slate-700">Contractor access expiring</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      18 users - Details →
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Monitoring Coverage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Production Data Access</span>
                      <span className="text-sm font-semibold text-emerald-600">100%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Financial Data Monitoring</span>
                      <span className="text-sm font-semibold text-emerald-600">100%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Privileged User Activity</span>
                      <span className="text-sm font-semibold text-emerald-600">100%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Endpoint Detection</span>
                      <span className="text-sm font-semibold text-blue-600">97.4%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '97.4%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Continuous Monitoring Section */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Continuous Monitoring
              </h2>
              <div
                className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setDrillDownData(drillDownDetails.continuousMonitoring)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">Anomalous Login Detection</h4>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Okta ThreatInsight + SIEM</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Effectiveness</span>
                      <span className="text-sm font-bold text-emerald-600">92%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">After-hours Access Monitoring</h4>
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-2">SIEM + UEBA</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Effectiveness</span>
                      <span className="text-sm font-bold text-blue-600">95%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">Data Exfiltration Detection</h4>
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-2">DLP + CASB</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Effectiveness</span>
                      <span className="text-sm font-bold text-purple-600">98%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">Privileged Command Monitoring</h4>
                      <Lock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Teleport + Splunk</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Effectiveness</span>
                      <span className="text-sm font-bold text-indigo-600">100%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">Failed Authentication Tracking</h4>
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-2">SIEM aggregation</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Effectiveness</span>
                      <span className="text-sm font-bold text-amber-600">68% (tuning)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">Insider Threat Scoring</h4>
                      <Eye className="w-5 h-5 text-cyan-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-2">UEBA platform</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Effectiveness</span>
                      <span className="text-sm font-bold text-cyan-600">89%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center text-sm text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                  Click for detailed control metrics and alert volumes
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'hrem' && (
          <div className="space-y-8 animate-fadeIn">
            {/* HREM Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-3">Human Risk Exposure Model (HREM)</h2>
                  <p className="text-blue-100 text-lg max-w-3xl">
                    Role-based risk classification that ensures security controls are proportional, fair, and effective.
                    Training and controls scale with actual data access and business criticality.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm mb-1">Overall Risk Score</p>
                  <p className="text-5xl font-bold">{dashboardData.hrem.riskScore}</p>
                  <p className="text-blue-100 text-sm mt-1">Training ROI: {dashboardData.hrem.trainingROI}</p>
                </div>
              </div>
            </div>

            {/* Exposure Tiers */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                Risk Exposure Tiers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Critical Exposure */}
                <div
                  className="bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-300 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.riskExposureCriticalDetails)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-rose-900">Critical Exposure</h3>
                    <AlertTriangle className="w-6 h-6 text-rose-600" />
                  </div>
                  <p className="text-4xl font-bold text-rose-700 mb-2">{dashboardData.hrem.criticalExposure.count}</p>
                  <p className="text-sm text-rose-700 mb-4">{dashboardData.hrem.criticalExposure.percentage}% of workforce</p>
                  <div className="space-y-2 text-sm text-rose-800">
                    <p className="font-semibold">Access:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• SSN & Financial Data</li>
                      <li>• Money Movement</li>
                      <li>• Contribution Logic</li>
                    </ul>
                    <p className="font-semibold mt-3">Training: {dashboardData.hrem.criticalExposure.avgTrainingHours} hrs/year</p>
                    <p className="text-xs text-rose-600 mt-2">Click for details →</p>
                  </div>
                </div>

                {/* High Exposure */}
                <div
                  className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.riskExposureHighDetails)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-amber-900">High Exposure</h3>
                    <Eye className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className="text-4xl font-bold text-amber-700 mb-2">{dashboardData.hrem.highExposure.count}</p>
                  <p className="text-sm text-amber-700 mb-4">{dashboardData.hrem.highExposure.percentage}% of workforce</p>
                  <div className="space-y-2 text-sm text-amber-800">
                    <p className="font-semibold">Access:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Customer PII</li>
                      <li>• Production Systems</li>
                      <li>• Account Details</li>
                    </ul>
                    <p className="font-semibold mt-3">Training: {dashboardData.hrem.highExposure.avgTrainingHours} hrs/year</p>
                    <p className="text-xs text-amber-600 mt-2">Click for details →</p>
                  </div>
                </div>

                {/* Moderate Exposure */}
                <div
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.riskExposureModerateDetails)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-blue-900">Moderate Exposure</h3>
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-4xl font-bold text-blue-700 mb-2">{dashboardData.hrem.moderateExposure.count}</p>
                  <p className="text-sm text-blue-700 mb-4">{dashboardData.hrem.moderateExposure.percentage}% of workforce</p>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p className="font-semibold">Access:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Operational Data</li>
                      <li>• Analytics & Metrics</li>
                      <li>• Internal Tools</li>
                    </ul>
                    <p className="font-semibold mt-3">Training: {dashboardData.hrem.moderateExposure.avgTrainingHours} hrs/year</p>
                    <p className="text-xs text-blue-600 mt-2">Click for details →</p>
                  </div>
                </div>

                {/* Low Exposure */}
                <div
                  className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.riskExposureLowDetails)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-emerald-900">Low Exposure</h3>
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-4xl font-bold text-emerald-700 mb-2">{dashboardData.hrem.lowExposure.count}</p>
                  <p className="text-sm text-emerald-700 mb-4">{dashboardData.hrem.lowExposure.percentage}% of workforce</p>
                  <div className="space-y-2 text-sm text-emerald-800">
                    <p className="font-semibold">Access:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Public Information</li>
                      <li>• Limited Data Access</li>
                      <li>• Non-Critical Systems</li>
                    </ul>
                    <p className="font-semibold mt-3">Training: {dashboardData.hrem.lowExposure.avgTrainingHours} hrs/year</p>
                    <p className="text-xs text-emerald-600 mt-2">Click for details →</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CPO Value Proposition */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-blue-600" />
                  Key Benefits
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Reduces Training Burnout</p>
                      <p className="text-sm text-slate-600">Low-risk roles get 4 hrs/year vs 24 hrs for critical roles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Fair & Proportional</p>
                      <p className="text-sm text-slate-600">Controls match actual business risk, not job titles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Scales Intelligently</p>
                      <p className="text-sm text-slate-600">Hiring and onboarding adapt to role exposure level</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Improves Retention</p>
                      <p className="text-sm text-slate-600">Employees feel respected, not over-controlled</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setDrillDownData(drillDownDetails.hremRoles)}
              >
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  Role-Based Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-rose-50 border border-rose-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Finance Team</p>
                      <p className="text-xs text-slate-600">SSN, ACH, Contributions</p>
                    </div>
                    <span className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-full">CRITICAL</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Engineering</p>
                      <p className="text-xs text-slate-600">Production DB, Customer Data</p>
                    </div>
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">HIGH</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Product & Sales</p>
                      <p className="text-xs text-slate-600">Analytics, CRM</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">MODERATE</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Marketing & Admin</p>
                      <p className="text-xs text-slate-600">Public Content, Limited Access</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">LOW</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                  Click for full role breakdown
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'sxi' && (
          <div className="space-y-8 animate-fadeIn">
            {/* SXI Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-3">Security Experience Index (SXI)</h2>
                  <p className="text-emerald-100 text-lg max-w-3xl">
                    Measuring how security <em>feels</em> to employees, not just how effective it is.
                    Security that causes fear or confusion creates shadow IT and disengagement.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-100 text-sm mb-1">Overall SXI Score</p>
                  <p className="text-5xl font-bold">{dashboardData.sxi.overallScore}/10</p>
                  <p className="text-emerald-100 text-sm mt-1">Target: &gt; 8.0</p>
                </div>
              </div>
            </div>

            {/* SXI Metrics */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-600" />
                Experience Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                  title="Understanding Score"
                  value={`${dashboardData.sxi.understandingScore}/10`}
                  change="+0.4"
                  trend="up"
                  icon={<BookOpen className="w-6 h-6 text-blue-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.sxiUnderstandingMetric)}
                />
                <MetricCard
                  title="Support Score"
                  value={`${dashboardData.sxi.supportScore}/10`}
                  change="+0.3"
                  trend="up"
                  icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.sxiSupportMetric)}
                />
                <MetricCard
                  title="Psychological Safety"
                  value={`${dashboardData.sxi.psychologicalSafety}/10`}
                  change="+0.2"
                  trend="up"
                  icon={<Shield className="w-6 h-6 text-emerald-600" />}
                  status="good"
                  onClick={() => setDrillDownData(drillDownDetails.sxiPsychSafetyMetric)}
                />
                <MetricCard
                  title="Reporting Comfort"
                  value={`${dashboardData.sxi.reportingComfort}/10`}
                  change="+0.5"
                  trend="up"
                  icon={<Bell className="w-6 h-6 text-emerald-600" />}
                  status="good"
                />
                <MetricCard
                  title="Frustration Index"
                  value={`${dashboardData.sxi.frustrationIndex}/10`}
                  change="-0.4"
                  trend="down"
                  icon={<TrendingDown className="w-6 h-6 text-emerald-600" />}
                  status="good"
                />
                <MetricCard
                  title="NPS Score"
                  value={dashboardData.sxi.npsScore}
                  change="+8"
                  trend="up"
                  icon={<ThumbsUp className="w-6 h-6 text-blue-600" />}
                  status="good"
                />
              </div>
            </section>

            {/* Survey Insights */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setDrillDownData(drillDownDetails.sxiSurvey)}
              >
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Smile className="w-5 h-5 text-blue-600" />
                  Employee Feedback
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-900">I understand why controls exist</p>
                      <span className="text-sm font-bold text-emerald-600">8.5/10</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-900">Security team is approachable</p>
                      <span className="text-sm font-bold text-emerald-600">8.3/10</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-900">Safe to report mistakes</p>
                      <span className="text-sm font-bold text-emerald-600">8.4/10</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-900">Security doesn&apos;t block work</p>
                      <span className="text-sm font-bold text-blue-600">7.9/10</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '79%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                  Click for detailed survey results
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Why This Matters
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-slate-900 mb-2">Reduces Shadow IT</p>
                    <p className="text-sm text-slate-600">
                      When employees feel frustrated or confused by security, they find workarounds.
                      High SXI scores mean employees work <em>with</em> security, not around it.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                    <p className="font-semibold text-slate-900 mb-2">Psychological Safety</p>
                    <p className="text-sm text-slate-600">
                      Measuring whether employees feel safe admitting mistakes is a leading indicator
                      of culture health - a core CPO metric.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                    <p className="font-semibold text-slate-900 mb-2">Engagement & Retention</p>
                    <p className="text-sm text-slate-600">
                      Security perceived as punitive drives disengagement. High SXI correlates with
                      overall employee satisfaction scores.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Items */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Improvement Opportunities</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.improvementWorkflowAnalysis)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Lower Friction</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    7.9/10 on &ldquo;security doesn&apos;t block work&rdquo; - lowest score.
                    Review approval workflows for delays.
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View workflow analysis →
                  </button>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.improvementToolIntegration)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Increase Visibility</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Continue monthly &ldquo;Ask Security Anything&rdquo; sessions.
                    147 questions in 30 days shows high engagement.
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View tool integrations →
                  </button>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.improvementTrainingOptimization)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Role-Based Training</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    8.2/10 on relevance. Pair with HREM to make training even more targeted to actual risk.
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View training matrix →
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'lifecycle' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Lifecycle Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <div>
                <h2 className="text-3xl font-bold mb-3">Security Enablement Lifecycle</h2>
                <p className="text-indigo-100 text-lg max-w-4xl">
                  Security mapped to the employee journey. Controls evolve with roles - from hiring through exit -
                  making security feel integrated, not bolted on.
                </p>
              </div>
            </div>

            {/* Journey Stages */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Employee Security Journey
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Hiring */}
                <div className="bg-white rounded-xl border-2 border-blue-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-6 h-6" />
                        <h3 className="text-xl font-bold">1. Hiring & Pre-Boarding</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Before Day 1
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Focus</p>
                        <p className="font-semibold text-slate-900">Role Clarity & Intent</p>
                        <p className="text-sm text-slate-600 mt-1">Define what access this role needs and why</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Security Actions</p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          <li>✓ Background check completion: {dashboardData.lifecycle.hiring.clarity}</li>
                          <li>✓ Access requirements documented</li>
                          <li>✓ HREM tier assigned to role</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Metrics</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                            <span className="text-sm text-slate-700">BG Checks Completed</span>
                            <span className="text-sm font-bold text-emerald-600">{dashboardData.lifecycle.hiring.backgroundChecks}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Onboarding */}
                <div className="bg-white rounded-xl border-2 border-emerald-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6" />
                        <h3 className="text-xl font-bold">2. Onboarding</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Days 1-30
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Focus</p>
                        <p className="font-semibold text-slate-900">Expectations & Habits</p>
                        <p className="text-sm text-slate-600 mt-1">Set security expectations early, build good habits</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Security Actions</p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          <li>✓ Role-based security training</li>
                          <li>✓ Account provisioning (avg: 1.8 hrs)</li>
                          <li>✓ MFA setup & password manager</li>
                          <li>✓ Data classification overview</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Metrics</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                            <span className="text-sm text-slate-700">Training Complete</span>
                            <span className="text-sm font-bold text-emerald-600">{dashboardData.lifecycle.onboarding.completionRate}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                            <span className="text-sm text-slate-700">Avg Time to Access</span>
                            <span className="text-sm font-bold text-blue-600">{dashboardData.lifecycle.onboarding.avgDays} days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth */}
                <div className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6" />
                        <h3 className="text-xl font-bold">3. Growth & Tenure</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Ongoing
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Focus</p>
                        <p className="font-semibold text-slate-900">Privilege Evolution</p>
                        <p className="text-sm text-slate-600 mt-1">Access grows with responsibility, reviewed regularly</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Security Actions</p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          <li>✓ Annual access reviews</li>
                          <li>✓ Privilege escalation monitoring</li>
                          <li>✓ Continuous training (HREM-based)</li>
                          <li>✓ Security champion opportunities</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Metrics</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                            <span className="text-sm text-slate-700">Privilege Reviews</span>
                            <span className="text-sm font-bold text-purple-600">{dashboardData.lifecycle.growth.privilegeReviews}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
                            <span className="text-sm text-slate-700">Role Changes (YTD)</span>
                            <span className="text-sm font-bold text-indigo-600">{dashboardData.lifecycle.growth.roleChanges}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role Change */}
                <div className="bg-white rounded-xl border-2 border-amber-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-6 h-6" />
                        <h3 className="text-xl font-bold">4. Role Change / Transfer</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        As Needed
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Focus</p>
                        <p className="font-semibold text-slate-900">Access Recalibration</p>
                        <p className="text-sm text-slate-600 mt-1">Remove old access, grant new - prevent accumulation</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Security Actions</p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          <li>✓ Old role access removal</li>
                          <li>✓ New role access provisioning</li>
                          <li>✓ HREM tier reassessment</li>
                          <li>✓ Updated training requirements</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Metrics</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-amber-50 rounded">
                            <span className="text-sm text-slate-700">Avg Processing</span>
                            <span className="text-sm font-bold text-amber-600">{dashboardData.lifecycle.roleChange.avgProcessingDays} days</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                            <span className="text-sm text-slate-700">Access Reviews</span>
                            <span className="text-sm font-bold text-emerald-600">{dashboardData.lifecycle.roleChange.accessReviews}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exit */}
                <div className="bg-white rounded-xl border-2 border-rose-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="w-6 h-6" />
                        <h3 className="text-xl font-bold">5. Exit / Offboarding</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Final Day
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Focus</p>
                        <p className="font-semibold text-slate-900">Clean Separation</p>
                        <p className="text-sm text-slate-600 mt-1">Complete deprovisioning, no lingering access</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Security Actions</p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          <li>✓ All account deactivation</li>
                          <li>✓ Physical access revocation</li>
                          <li>✓ Data return verification</li>
                          <li>✓ Exit interview (security topics)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Metrics</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-rose-50 rounded">
                            <span className="text-sm text-slate-700">Avg Deprovision</span>
                            <span className="text-sm font-bold text-rose-600">{dashboardData.lifecycle.exit.avgOffboardingHours} hrs</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                            <span className="text-sm text-slate-700">Clean Exits</span>
                            <span className="text-sm font-bold text-emerald-600">{dashboardData.lifecycle.exit.cleanExits}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Lifecycle Benefits & Metrics */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setDrillDownData(drillDownDetails.lifecycleMetrics)}
              >
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Lifecycle Performance Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm text-slate-700">Onboarding Training Completion</span>
                    <span className="text-sm font-bold text-emerald-600">98.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm text-slate-700">Avg Time to Provision Access</span>
                    <span className="text-sm font-bold text-emerald-600">1.8 hrs</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm text-slate-700">Role Change Processing</span>
                    <span className="text-sm font-bold text-emerald-600">1.2 days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm text-slate-700">Clean Exit Rate</span>
                    <span className="text-sm font-bold text-emerald-600">99.1%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                  Click for detailed lifecycle metrics
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-blue-600" />
                  Business Value
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Integrated, Not Bolted On</p>
                      <p className="text-sm text-slate-600">Security becomes part of the employee journey, not separate compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Smoother Onboarding</p>
                      <p className="text-sm text-slate-600">HR knows exactly what security needs at each stage - no surprises</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Reduces Access Creep</p>
                      <p className="text-sm text-slate-600">Role changes trigger access reviews automatically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">HR Controls Risk</p>
                      <p className="text-sm text-slate-600">People Ops drives the lifecycle, security supports it</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Regulatory Compliance Status</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div 
                  className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.compliance)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Compliance Frameworks</h3>
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">SOC 2 Type II</p>
                        <p className="text-xs text-slate-600">{dashboardData.compliance.soc2Status}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">PCI DSS v4.0.1</p>
                        <p className="text-xs text-slate-600">Compliant - {dashboardData.compliance.pciCompliance}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">FINRA Rule 3110</p>
                        <p className="text-xs text-slate-600">Training - {dashboardData.compliance.finraTraining}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">SEC Investment Advisor</p>
                        <p className="text-xs text-slate-600">Status - {dashboardData.compliance.secCompliance}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-slate-500">
                    <ChevronRight className="w-4 h-4" />
                    Click for detailed audit status
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Background Checks</h3>
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <p className="text-4xl font-bold text-emerald-600">
                        {dashboardData.compliance.backgroundChecks.completed}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">Completed & Current</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-2xl font-bold text-amber-600">
                          {dashboardData.compliance.backgroundChecks.pending}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">Pending</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {dashboardData.compliance.backgroundChecks.expiring}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">Expiring 30d</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Audit Readiness</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div
                  className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.controlEffectivenessDetails)}
                >
                  <h3 className="font-semibold text-slate-900 mb-4">Control Effectiveness</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Access Controls</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                        Effective
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Change Management</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                        Effective
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Data Protection</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                        Effective
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Incident Response</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                        Effective
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-slate-500">
                    <ChevronRight className="w-4 h-4" />
                    Click for detailed control testing results
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4">Evidence Collection</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Policy Documentation</span>
                      <span className="text-sm font-semibold text-emerald-600">100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Control Testing</span>
                      <span className="text-sm font-semibold text-emerald-600">98.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Risk Assessments</span>
                      <span className="text-sm font-semibold text-blue-600">Current</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Vendor Assessments</span>
                      <span className="text-sm font-semibold text-emerald-600">96.7%</span>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setDrillDownData(drillDownDetails.upcomingReviewsDetailed)}
                >
                  <h3 className="font-semibold text-slate-900 mb-4">Upcoming Reviews</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-medium text-slate-900 text-sm">SOC 2 Type II</p>
                      <p className="text-xs text-slate-600 mt-1">Q1 2026 - Deloitte</p>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <p className="font-medium text-slate-900 text-sm">PCI DSS QSA</p>
                      <p className="text-xs text-slate-600 mt-1">Q2 2025 - TrustArc</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="font-medium text-slate-900 text-sm">Internal Audit</p>
                      <p className="text-xs text-slate-600 mt-1">Quarterly - Ongoing</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-slate-500">
                    <ChevronRight className="w-4 h-4" />
                    Click for detailed timelines and auditor notes
                  </div>
                </div>
              </div>
            </section>

            {/* Gap Analysis Section */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Gap Analysis & Framework Compliance
              </h2>
              <div
                className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setDrillDownData(drillDownDetails.gapAnalysisFrameworks)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">SOC 2 Type II</h4>
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Audit Ready</span>
                        <span className="text-xs font-bold text-blue-600">Yes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Compliance</span>
                        <span className="text-xs font-bold text-blue-600">98%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Next Audit</span>
                        <span className="text-xs font-bold text-slate-700">Q1 2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">PCI-DSS v4.0.1</h4>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Audit Ready</span>
                        <span className="text-xs font-bold text-emerald-600">Yes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Compliance</span>
                        <span className="text-xs font-bold text-emerald-600">100%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Next Audit</span>
                        <span className="text-xs font-bold text-slate-700">Q2 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">SEC/FINRA</h4>
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Audit Ready</span>
                        <span className="text-xs font-bold text-purple-600">Yes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Compliance</span>
                        <span className="text-xs font-bold text-purple-600">100%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Next Review</span>
                        <span className="text-xs font-bold text-slate-700">Q3 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">Privacy Laws (CCPA/CPRA)</h4>
                      <CheckCircle className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Audit Ready</span>
                        <span className="text-xs font-bold text-indigo-600">Yes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Compliance</span>
                        <span className="text-xs font-bold text-indigo-600">97%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Next Review</span>
                        <span className="text-xs font-bold text-slate-700">Q4 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">NIST CSF</h4>
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Audit Ready</span>
                        <span className="text-xs font-bold text-amber-600">Partial</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Compliance</span>
                        <span className="text-xs font-bold text-amber-600">85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Next Review</span>
                        <span className="text-xs font-bold text-slate-700">Internal</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">Overall Status</h4>
                      <Shield className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Frameworks</span>
                        <span className="text-xs font-bold text-cyan-600">6 Total</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Avg Compliance</span>
                        <span className="text-xs font-bold text-cyan-600">96.3%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Critical Gaps</span>
                        <span className="text-xs font-bold text-emerald-600">None</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center text-sm text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                  Click for detailed gap analysis and remediation plans
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>
                This dashboard represents a partnership between Information Security and People Operations
              </span>
            </div>
            <div>
              <span>For questions, contact: security@vestwell.com</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Drill-down Modal */}
      {drillDownData && (
        <DrillDownModal 
          data={drillDownData}
          onClose={() => setDrillDownData(null)}
        />
      )}

      <style jsx>{`
        .metric-card {
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-2px);
        }

        .flip-card-container {
          perspective: 1000px;
          height: 100%;
          min-height: 280px;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
