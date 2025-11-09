import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { projectMetrics, timeSeriesData } from "@/data/mockData";
import { TrendingUp, BarChart3, GitBranch, Award } from "lucide-react";
import MetricCard from "@/components/charts/MetricCard";

export default function CollaborationAnalysis() {
  const collaborationSuccessCorrelation = 0.847; // Mock correlation coefficient
  const highCollabProjects = projectMetrics.filter(p => p.collaborationIndex > 80).length;
  const avgSuccessHighCollab = projectMetrics
    .filter(p => p.collaborationIndex > 80)
    .reduce((sum, p) => sum + p.successScore, 0) / highCollabProjects;
  const avgSuccessLowCollab = projectMetrics
    .filter(p => p.collaborationIndex <= 80)
    .reduce((sum, p) => sum + p.successScore, 0) / (projectMetrics.length - highCollabProjects);

  const scatterData = projectMetrics.map(p => ({
    collaboration: p.collaborationIndex,
    success: p.successScore,
    name: p.projectName,
    roi: p.roi
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Collaboration Impact Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Measuring how collaboration drives project success and outcomes
        </p>
      </div>

      {/* Impact Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Correlation Coefficient"
          value={collaborationSuccessCorrelation.toFixed(3)}
          change="+0.12"
          changeType="positive"
          icon={GitBranch}
          description="Collaboration ↔ Success"
        />
        <MetricCard
          title="High-Collab Projects"
          value={highCollabProjects}
          icon={Award}
          description="Projects with >80 collaboration score"
        />
        <MetricCard
          title="Success Rate (High)"
          value={`${avgSuccessHighCollab.toFixed(0)}%`}
          icon={TrendingUp}
          description="Average success for high-collaboration"
        />
        <MetricCard
          title="Success Rate (Low)"
          value={`${avgSuccessLowCollab.toFixed(0)}%`}
          icon={BarChart3}
          description="Average success for low-collaboration"
        />
      </div>

      {/* Analysis Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Collaboration vs Success Correlation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="collaboration" 
                  stroke="hsl(var(--muted-foreground))"
                  name="Collaboration Score"
                  domain={[40, 100]}
                />
                <YAxis 
                  dataKey="success"
                  stroke="hsl(var(--muted-foreground))"
                  name="Success Score"
                  domain={[60, 100]}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Collaboration: {data.collaboration}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Success: {data.success}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ROI: {data.roi.toFixed(1)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  dataKey="success" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Collaboration Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar 
                  dataKey="collaboration" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  name="Collaboration Score"
                />
                <Bar 
                  dataKey="success" 
                  fill="hsl(var(--analytics-success))"
                  radius={[4, 4, 0, 0]}
                  name="Success Rate"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Statistical Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Statistical Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-analytics-success/10 border border-analytics-success/20">
              <h4 className="font-medium text-analytics-success mb-2">Strong Positive Correlation</h4>
              <p className="text-sm text-muted-foreground">
                R = 0.847 indicates strong positive relationship between collaboration and success rates.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-analytics-info/10 border border-analytics-info/20">
              <h4 className="font-medium text-analytics-info mb-2">Performance Gap</h4>
              <p className="text-sm text-muted-foreground">
                High-collaboration projects show {(avgSuccessHighCollab - avgSuccessLowCollab).toFixed(1)}% higher success rates on average.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-analytics-warning/10 border border-analytics-warning/20">
              <h4 className="font-medium text-analytics-warning mb-2">Improvement Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                {projectMetrics.length - highCollabProjects} projects could benefit from increased collaboration.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}