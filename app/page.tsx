'use client';

import React, { useState } from 'react';
import { 
  Shield, Users, AlertTriangle, CheckCircle, TrendingUp, 
  Clock, FileText, Target, Activity, Lock, Eye, 
  BookOpen, Award, Bell, BarChart3, ArrowUpRight, 
  ArrowDownRight, Info, ChevronRight, X
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
  const [activeTab, setActiveTab] = useState<'overview' | 'culture' | 'access' | 'risk' | 'compliance'>('overview');

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
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
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
