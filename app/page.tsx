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

  // Realistic metrics based on Vestwell's ~390 employees
  const dashboardData = {
    overview: {
      totalEmployees: 390,
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
        annualCompliance: 368,
        financialServices: 382,
        pciFundamentals: 375,
        incidentResponse: 351
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
        completed: 387,
        pending: 3,
        expiring: 8
      }
    },
    hrem: {
      lowExposure: { count: 98, percentage: 25.1, avgTrainingHours: 4 },
      moderateExposure: { count: 156, percentage: 40.0, avgTrainingHours: 8 },
      highExposure: { count: 118, percentage: 30.3, avgTrainingHours: 16 },
      criticalExposure: { count: 18, percentage: 4.6, avgTrainingHours: 24 },
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
      hiring: { clarity: '94%', backgroundChecks: 387 },
      onboarding: { completionRate: '98.2%', avgDays: 3.2 },
      growth: { privilegeReviews: 47, roleChanges: 23 },
      roleChange: { avgProcessingDays: 1.2, accessReviews: 100 },
      exit: { avgOffboardingHours: 2.3, cleanExits: '99.1%' }
    },
    dualSSO: {
      rippling: { users: 234, coverage: '60%', syncStatus: 'Active' },
      jumpcloud: { users: 156, coverage: '40%', syncStatus: 'Active' },
      mergeStatus: 'In Progress',
      targetDate: 'Q2 2025',
      conflicts: 0
    }
  };

  const drillDownDetails = {
    phishing: {
      title: 'Phishing Simulation Results - Last 6 Months',
      data: [
        { date: 'Dec 2024', clicks: '8.3%', reports: '76.4%', improvement: '+5.2%', participants: 390 },
        { date: 'Nov 2024', clicks: '9.1%', reports: '72.1%', improvement: '+3.1%', participants: 388 },
        { date: 'Oct 2024', clicks: '11.7%', reports: '68.9%', improvement: '+1.8%', participants: 385 },
        { date: 'Sep 2024', clicks: '13.2%', reports: '64.3%', improvement: '+2.4%', participants: 382 },
        { date: 'Aug 2024', clicks: '14.8%', reports: '61.2%', improvement: '+4.1%', participants: 379 },
        { date: 'Jul 2024', clicks: '16.2%', reports: '58.7%', improvement: 'Baseline', participants: 375 }
      ]
    },
    training: {
      title: 'Compliance Training Status by Department',
      data: [
        { department: 'Engineering', employees: 156, completed: 148, percentage: '94.9%', avgScore: '92%' },
        { department: 'Operations', employees: 87, completed: 82, percentage: '94.3%', avgScore: '89%' },
        { department: 'Product', employees: 45, completed: 43, percentage: '95.6%', avgScore: '91%' },
        { department: 'Sales', employees: 38, completed: 35, percentage: '92.1%', avgScore: '88%' },
        { department: 'Customer Success', employees: 29, completed: 28, percentage: '96.6%', avgScore: '93%' },
        { department: 'Finance', employees: 18, completed: 18, percentage: '100%', avgScore: '95%' },
        { department: 'Legal & Compliance', employees: 12, completed: 12, percentage: '100%', avgScore: '97%' },
        { department: 'HR', employees: 5, completed: 5, percentage: '100%', avgScore: '94%' }
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
        { role: 'Finance Team', exposure: 'Critical', employees: 18, training: '24 hrs/yr', dataAccess: 'SSN, ACH, Contributions', lastReview: '7 days ago' },
        { role: 'Engineering', exposure: 'High', employees: 156, training: '16 hrs/yr', dataAccess: 'Production DB, Customer Data', lastReview: '14 days ago' },
        { role: 'Customer Success', exposure: 'High', employees: 29, training: '16 hrs/yr', dataAccess: 'PII, Account Details', lastReview: '10 days ago' },
        { role: 'Product Managers', exposure: 'Moderate', employees: 45, training: '8 hrs/yr', dataAccess: 'Analytics, Metadata', lastReview: '21 days ago' },
        { role: 'Sales', exposure: 'Moderate', employees: 38, training: '8 hrs/yr', dataAccess: 'CRM, Proposals', lastReview: '18 days ago' },
        { role: 'Operations', exposure: 'Moderate', employees: 73, training: '8 hrs/yr', dataAccess: 'Operational Systems', lastReview: '12 days ago' },
        { role: 'Marketing', exposure: 'Low', employees: 23, training: '4 hrs/yr', dataAccess: 'Public Content', lastReview: '30 days ago' },
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
        { stage: 'Growth', metric: 'Privilege Reviews (Annual)', value: '47', target: '47', avgDays: 'N/A' },
        { stage: 'Role Change', metric: 'Access Adjustment Time', value: '1.2 days', target: '< 2 days', avgDays: '1.2' },
        { stage: 'Exit', metric: 'Account Deprovisioning Time', value: '2.3 hrs', target: '< 4 hrs', avgDays: 'N/A' },
        { stage: 'Exit', metric: 'Clean Exit Rate', value: '99.1%', target: '> 98%', avgDays: 'N/A' }
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
                />
                <MetricCard
                  title="Compliance Rate"
                  value={dashboardData.overview.complianceStatus}
                  change="+1.2%"
                  trend="up"
                  icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                  status="good"
                />
                <MetricCard
                  title="Critical Alerts"
                  value={dashboardData.overview.criticalAlerts}
                  change="-2 vs last week"
                  trend="down"
                  icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
                  status="warning"
                />
                <MetricCard
                  title="Training Complete"
                  value={dashboardData.overview.trainingCompletion}
                  change="+2.1%"
                  trend="up"
                  icon={<BookOpen className="w-6 h-6 text-emerald-600" />}
                  status="good"
                />
                <MetricCard
                  title="IR Readiness"
                  value={dashboardData.overview.incidentResponseReady}
                  icon={<Activity className="w-6 h-6 text-emerald-600" />}
                  status="good"
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
                <div className="bg-white rounded-xl p-6 border border-amber-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Action Required</h3>
                      <p className="text-sm text-slate-600">
                        5 access reviews overdue. 8 background checks expiring in 30 days.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Upcoming Audit</h3>
                      <p className="text-sm text-slate-600">
                        SOC 2 Type II audit scheduled Q1 2026 with Deloitte.
                      </p>
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrillDownData(drillDownDetails.phishing);
                        }}
                        className="mt-4 w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 text-sm font-medium transition-colors"
                      >
                        View Detailed Report
                      </button>
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
                  <p className="text-sm text-slate-600 mb-2">Full deployment to 390 employees</p>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">Q2 2025</span>
                </div>
              </div>
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
                />
                <MetricCard
                  title="MFA Adoption"
                  value={dashboardData.identityAccess.mfaAdoption}
                  change="+0.5%"
                  trend="up"
                  icon={<Shield className="w-6 h-6 text-emerald-600" />}
                  status="good"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
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
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">Multiple failed login attempts</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      1 user
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">Unusual data downloads</span>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded-full">
                      1 user
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">Contractor access expiring</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      18 users
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
                <div className="bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-300 rounded-xl p-6">
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
                  </div>
                </div>

                {/* High Exposure */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-6">
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
                  </div>
                </div>

                {/* Moderate Exposure */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
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
                  </div>
                </div>

                {/* Low Exposure */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl p-6">
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
                  </div>
                </div>
              </div>
            </section>

            {/* CPO Value Proposition */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-blue-600" />
                  Why CPOs Love HREM
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
                />
                <MetricCard
                  title="Support Score"
                  value={`${dashboardData.sxi.supportScore}/10`}
                  change="+0.3"
                  trend="up"
                  icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
                  status="good"
                />
                <MetricCard
                  title="Psychological Safety"
                  value={`${dashboardData.sxi.psychologicalSafety}/10`}
                  change="+0.2"
                  trend="up"
                  icon={<Shield className="w-6 h-6 text-emerald-600" />}
                  status="good"
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
                      <p className="text-sm font-medium text-slate-900">Security doesn't block work</p>
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
                  Why This Matters to CPOs
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
                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Lower Friction</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    7.9/10 on "security doesn't block work" - lowest score.
                    Review approval workflows for delays.
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View workflow analysis →
                  </button>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Increase Visibility</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Continue monthly "Ask Security Anything" sessions.
                    147 questions in 30 days shows high engagement.
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View question trends →
                  </button>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
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
                  CPO Partnership Value
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
                <div className="bg-white rounded-xl p-6 border border-slate-200">
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

                <div className="bg-white rounded-xl p-6 border border-slate-200">
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
