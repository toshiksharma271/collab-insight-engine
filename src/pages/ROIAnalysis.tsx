import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts";
import { roiData, projectMetrics } from "@/data/mockData";
import { DollarSign, TrendingUp, Calculator, PieChart } from "lucide-react";
import MetricCard from "@/components/charts/MetricCard";

export default function ROIAnalysis() {
  const totalInvestment = roiData.reduce((sum, d) => sum + d.costs, 0);
  const totalReturns = roiData.reduce((sum, d) => sum + d.benefits, 0);
  const avgROI = roiData.reduce((sum, d) => sum + d.roi, 0) / roiData.length;
  const bestPerformer = roiData.reduce((prev, current) => 
    prev.roi > current.roi ? prev : current
  );

  const scatterData = roiData.map(d => ({
    costs: d.costs / 1000, // Convert to thousands
    benefits: d.benefits / 1000,
    roi: d.roi,
    collaboration: d.collaborationScore,
    project: d.project,
    team: d.team
  }));

  const teamROI = projectMetrics.reduce((acc, project) => {
    if (!acc[project.team]) {
      acc[project.team] = { totalROI: 0, count: 0, projects: [] };
    }
    acc[project.team].totalROI += project.roi;
    acc[project.team].count += 1;
    acc[project.team].projects.push(project.projectName);
    return acc;
  }, {} as any);

  const teamROIData = Object.entries(teamROI).map(([team, data]: [string, any]) => ({
    team,
    avgROI: data.totalROI / data.count,
    projectCount: data.count
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ROI Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Return on investment analysis for collaborative projects
        </p>
      </div>

      {/* ROI Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Investment"
          value={`$${(totalInvestment / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          description="Collaboration costs"
        />
        <MetricCard
          title="Total Returns"
          value={`$${(totalReturns / 1000000).toFixed(1)}M`}
          change="+23.4%"
          changeType="positive"
          icon={TrendingUp}
          description="Revenue generated"
        />
        <MetricCard
          title="Average ROI"
          value={`${avgROI.toFixed(0)}%`}
          change="+15.2%"
          changeType="positive"
          icon={Calculator}
          description="Return on investment"
        />
        <MetricCard
          title="Best Performer"
          value={bestPerformer.project.split(' ')[0]}
          icon={PieChart}
          description={`${bestPerformer.roi.toFixed(0)}% ROI`}
        />
      </div>

      {/* ROI Analysis Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Costs vs Benefits Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="costs" 
                  stroke="hsl(var(--muted-foreground))"
                  name="Costs (k$)"
                  label={{ value: 'Costs (k$)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  dataKey="benefits"
                  stroke="hsl(var(--muted-foreground))"
                  name="Benefits (k$)"
                  label={{ value: 'Benefits (k$)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.project}</p>
                          <p className="text-sm text-muted-foreground">
                            Team: {data.team}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Costs: ${data.costs}k
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Benefits: ${data.benefits}k
                          </p>
                          <p className="text-sm font-medium text-primary">
                            ROI: {data.roi.toFixed(1)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  dataKey="benefits" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.7}
                />
                {/* Trend line approximation */}
                <Line
                  type="linear"
                  dataKey="benefits"
                  stroke="hsl(var(--analytics-success))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROI by Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={teamROIData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="team" 
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
                  formatter={(value, name) => [
                    `${typeof value === 'number' ? value.toFixed(1) : value}%`,
                    name === 'avgROI' ? 'Average ROI' : name
                  ]}
                />
                <Bar 
                  dataKey="avgROI" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  name="Average ROI"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ROI Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project ROI Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Team</th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">Investment</th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">Returns</th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">ROI</th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">Collaboration</th>
                </tr>
              </thead>
              <tbody>
                {roiData
                  .sort((a, b) => b.roi - a.roi)
                  .map((item, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">{item.project}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.team}</td>
                      <td className="py-3 px-4 text-right">${(item.costs / 1000).toFixed(0)}k</td>
                      <td className="py-3 px-4 text-right">${(item.benefits / 1000).toFixed(0)}k</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.roi > 1000 
                            ? 'bg-analytics-success/10 text-analytics-success'
                            : item.roi > 500
                            ? 'bg-analytics-warning/10 text-analytics-warning'
                            : 'bg-muted/50 text-muted-foreground'
                        }`}>
                          {item.roi.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {item.collaborationScore}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ROI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>ROI Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-analytics-success/10 border border-analytics-success/20">
              <h4 className="font-medium text-analytics-success mb-2">High Performance Drivers</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cross-functional teams show 40% higher ROI</li>
                <li>• Projects with collaboration score &gt;85 achieve 12x ROI</li>
                <li>• Early collaboration reduces time-to-market by 25%</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-analytics-warning/10 border border-analytics-warning/20">
              <h4 className="font-medium text-analytics-warning mb-2">Optimization Opportunities</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Increase collaboration tools usage by 30%</li>
                <li>• Focus on Engineering-Product alignment</li>
                <li>• Implement standardized collaboration metrics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}