import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target,
  Activity,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/charts/MetricCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { getOverviewMetrics, timeSeriesData, projectMetrics } from "@/data/mockData";

export default function Overview() {
  const metrics = getOverviewMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Collaborative Impact Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Measuring the ROI of collaboration across teams and projects
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Average ROI"
          value={`${metrics.avgROI}%`}
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          description="Return on collaborative investment"
        />
        <MetricCard
          title="Collaboration Score"
          value={metrics.avgCollaboration}
          change="+8.3%"
          changeType="positive"
          icon={Users}
          description="Average team collaboration index"
        />
        <MetricCard
          title="Total Projects"
          value={metrics.totalProjects}
          change="+2"
          changeType="positive"
          icon={Target}
          description="Projects analyzed this quarter"
        />
        <MetricCard
          title="Net Benefit"
          value={`$${(metrics.netBenefit / 1000000).toFixed(1)}M`}
          change="+18.7%"
          changeType="positive"
          icon={Award}
          description="Revenue minus collaboration costs"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Collaboration Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="collaboration" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Collaboration Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="success" 
                  stroke="hsl(var(--analytics-success))" 
                  strokeWidth={2}
                  name="Success Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Project ROI Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="projectName" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar 
                  dataKey="roi" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Team</th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">Collaboration</th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">Success</th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">ROI</th>
                </tr>
              </thead>
              <tbody>
                {projectMetrics.map((project) => (
                  <tr key={project.projectId} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{project.projectName}</td>
                    <td className="py-3 px-4 text-muted-foreground">{project.team}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {project.collaborationIndex}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-analytics-success/10 text-analytics-success">
                        {project.successScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {project.roi.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}