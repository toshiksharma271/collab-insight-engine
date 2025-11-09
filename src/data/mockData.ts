// Mock data for Big Data Analytics - Collaborative Impact

export interface CollaborationNode {
  id: string;
  name: string;
  team: string;
  role: string;
  collaborationScore: number;
  centrality: number;
}

export interface CollaborationEdge {
  source: string;
  target: string;
  weight: number;
  type: 'github' | 'slack' | 'jira';
}

export interface ProjectMetrics {
  projectId: string;
  projectName: string;
  collaborationIndex: number;
  successScore: number;
  completionTime: number;
  defects: number;
  revenue: number;
  cost: number;
  roi: number;
  team: string;
}

export interface ROIData {
  costs: number;
  benefits: number;
  roi: number;
  collaborationScore: number;
  project: string;
  team: string;
}

export const collaborationNodes: CollaborationNode[] = [
  { id: "alice", name: "Alice Johnson", team: "Engineering", role: "Senior Developer", collaborationScore: 85, centrality: 0.8 },
  { id: "bob", name: "Bob Smith", team: "Engineering", role: "Tech Lead", collaborationScore: 92, centrality: 0.9 },
  { id: "carol", name: "Carol Davis", team: "Product", role: "Product Manager", collaborationScore: 78, centrality: 0.7 },
  { id: "david", name: "David Wilson", team: "Design", role: "UX Designer", collaborationScore: 71, centrality: 0.6 },
  { id: "eve", name: "Eve Brown", team: "Engineering", role: "Developer", collaborationScore: 66, centrality: 0.5 },
  { id: "frank", name: "Frank Miller", team: "QA", role: "QA Engineer", collaborationScore: 73, centrality: 0.65 },
  { id: "grace", name: "Grace Lee", team: "Product", role: "Product Owner", collaborationScore: 81, centrality: 0.75 },
  { id: "henry", name: "Henry Chen", team: "Engineering", role: "DevOps", collaborationScore: 69, centrality: 0.55 },
];

export const collaborationEdges: CollaborationEdge[] = [
  { source: "alice", target: "bob", weight: 15, type: "github" },
  { source: "alice", target: "carol", weight: 8, type: "slack" },
  { source: "bob", target: "carol", weight: 12, type: "jira" },
  { source: "carol", target: "david", weight: 10, type: "slack" },
  { source: "alice", target: "eve", weight: 20, type: "github" },
  { source: "bob", target: "frank", weight: 6, type: "jira" },
  { source: "carol", target: "grace", weight: 14, type: "slack" },
  { source: "alice", target: "henry", weight: 7, type: "github" },
  { source: "eve", target: "frank", weight: 9, type: "jira" },
  { source: "david", target: "grace", weight: 11, type: "slack" },
];

export const projectMetrics: ProjectMetrics[] = [
  {
    projectId: "proj-001",
    projectName: "Mobile App Redesign",
    collaborationIndex: 85,
    successScore: 92,
    completionTime: 45,
    defects: 3,
    revenue: 2500000,
    cost: 180000,
    roi: 1288.89,
    team: "Cross-functional"
  },
  {
    projectId: "proj-002", 
    projectName: "API Gateway",
    collaborationIndex: 78,
    successScore: 88,
    completionTime: 38,
    defects: 5,
    revenue: 1800000,
    cost: 145000,
    roi: 1141.38,
    team: "Engineering"
  },
  {
    projectId: "proj-003",
    projectName: "Customer Portal",
    collaborationIndex: 65,
    successScore: 71,
    completionTime: 62,
    defects: 12,
    revenue: 1200000,
    cost: 220000,
    roi: 445.45,
    team: "Product"
  },
  {
    projectId: "proj-004",
    projectName: "Analytics Dashboard",
    collaborationIndex: 91,
    successScore: 95,
    completionTime: 32,
    defects: 1,
    revenue: 3200000,
    cost: 160000,
    roi: 1900.00,
    team: "Cross-functional"
  },
  {
    projectId: "proj-005",
    projectName: "Security Upgrade",
    collaborationIndex: 58,
    successScore: 66,
    completionTime: 78,
    defects: 18,
    revenue: 800000,
    cost: 290000,
    roi: 175.86,
    team: "Engineering"
  },
];

export const roiData: ROIData[] = projectMetrics.map(p => ({
  costs: p.cost,
  benefits: p.revenue,
  roi: p.roi,
  collaborationScore: p.collaborationIndex,
  project: p.projectName,
  team: p.team
}));

export const timeSeriesData = [
  { month: "Jan", collaboration: 65, success: 70, roi: 580 },
  { month: "Feb", collaboration: 68, success: 72, roi: 620 },
  { month: "Mar", collaboration: 72, success: 76, roi: 685 },
  { month: "Apr", collaboration: 75, success: 78, roi: 720 },
  { month: "May", collaboration: 78, success: 82, roi: 785 },
  { month: "Jun", collaboration: 82, success: 85, roi: 850 },
  { month: "Jul", collaboration: 85, success: 88, roi: 920 },
  { month: "Aug", collaboration: 87, success: 90, roi: 980 },
  { month: "Sep", collaboration: 89, success: 92, roi: 1050 },
  { month: "Oct", collaboration: 91, success: 94, roi: 1120 },
  { month: "Nov", collaboration: 93, success: 96, roi: 1200 },
  { month: "Dec", collaboration: 95, success: 98, roi: 1280 },
];

export const getOverviewMetrics = () => {
  const totalProjects = projectMetrics.length;
  const avgROI = projectMetrics.reduce((sum, p) => sum + p.roi, 0) / totalProjects;
  const avgCollaboration = projectMetrics.reduce((sum, p) => sum + p.collaborationIndex, 0) / totalProjects;
  const totalRevenue = projectMetrics.reduce((sum, p) => sum + p.revenue, 0);
  const totalCosts = projectMetrics.reduce((sum, p) => sum + p.cost, 0);
  
  return {
    totalProjects,
    avgROI: Math.round(avgROI * 100) / 100,
    avgCollaboration: Math.round(avgCollaboration),
    totalRevenue,
    totalCosts,
    netBenefit: totalRevenue - totalCosts
  };
};