import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Settings, TrendingUp, Calculator, Zap, RefreshCw } from "lucide-react";
import MetricCard from "@/components/charts/MetricCard";

export default function WhatIfScenarios() {
  const [collaborationIncrease, setCollaborationIncrease] = useState([20]);
  const [toolsInvestment, setToolsInvestment] = useState([50000]);
  const [trainingInvestment, setTrainingInvestment] = useState([25000]);

  // Base metrics
  const baseMetrics = {
    avgCollaboration: 79,
    avgSuccess: 84,
    avgROI: 892,
    totalRevenue: 9500000,
    totalCosts: 995000
  };

  // Calculate scenario impacts
  const scenarioCollaboration = Math.min(baseMetrics.avgCollaboration + collaborationIncrease[0], 100);
  const scenarioSuccess = Math.min(baseMetrics.avgSuccess + (collaborationIncrease[0] * 0.6), 100);
  const scenarioROI = baseMetrics.avgROI + (collaborationIncrease[0] * 15);
  const additionalRevenue = (scenarioROI - baseMetrics.avgROI) * baseMetrics.totalCosts / 100;
  const totalInvestment = toolsInvestment[0] + trainingInvestment[0];
  const netBenefit = additionalRevenue - totalInvestment;

  const scenarioData = [
    { metric: "Collaboration Score", base: baseMetrics.avgCollaboration, scenario: scenarioCollaboration },
    { metric: "Success Rate", base: baseMetrics.avgSuccess, scenario: scenarioSuccess },
    { metric: "ROI %", base: baseMetrics.avgROI / 10, scenario: scenarioROI / 10 },
  ];

  const timelineData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const progressFactor = Math.min(month / 6, 1); // 6-month ramp-up
    const currentImprovement = collaborationIncrease[0] * progressFactor;
    
    return {
      month: `M${month}`,
      baseline: baseMetrics.avgROI / 10,
      projected: (baseMetrics.avgROI + currentImprovement * 15) / 10,
      investment: totalInvestment / 12 / 1000 // Monthly investment in k$
    };
  });

  const resetScenario = () => {
    setCollaborationIncrease([20]);
    setToolsInvestment([50000]);
    setTrainingInvestment([25000]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">What-If Scenarios</h1>
          <p className="text-muted-foreground mt-2">
            Model the impact of collaboration improvements on business outcomes
          </p>
        </div>
        <Button onClick={resetScenario} variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Reset</span>
        </Button>
      </div>

      {/* Scenario Controls */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Collaboration Boost</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Increase by</span>
                <Badge variant="outline">{collaborationIncrease[0]}%</Badge>
              </div>
              <Slider
                value={collaborationIncrease}
                onValueChange={setCollaborationIncrease}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Simulate improved cross-team communication and knowledge sharing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Tools Investment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Investment</span>
                <Badge variant="outline">${(toolsInvestment[0] / 1000).toFixed(0)}k</Badge>
              </div>
              <Slider
                value={toolsInvestment}
                onValueChange={setToolsInvestment}
                max={200000}
                min={10000}
                step={10000}
                className="w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Investment in collaboration platforms, analytics tools, and integrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Training Investment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Investment</span>
                <Badge variant="outline">${(trainingInvestment[0] / 1000).toFixed(0)}k</Badge>
              </div>
              <Slider
                value={trainingInvestment}
                onValueChange={setTrainingInvestment}
                max={100000}
                min={5000}
                step={5000}
                className="w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Team training, workshops, and collaboration skill development
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Projected Collaboration"
          value={`${scenarioCollaboration.toFixed(0)}`}
          change={`+${(scenarioCollaboration - baseMetrics.avgCollaboration).toFixed(0)}`}
          changeType="positive"
          icon={TrendingUp}
          description="Expected collaboration score"
        />
        <MetricCard
          title="Projected Success Rate"
          value={`${scenarioSuccess.toFixed(0)}%`}
          change={`+${(scenarioSuccess - baseMetrics.avgSuccess).toFixed(1)}%`}
          changeType="positive"
          icon={Calculator}
          description="Expected project success rate"
        />
        <MetricCard
          title="Additional Revenue"
          value={`$${(additionalRevenue / 1000000).toFixed(1)}M`}
          change={`+${((additionalRevenue / baseMetrics.totalRevenue) * 100).toFixed(1)}%`}
          changeType="positive"
          icon={TrendingUp}
          description="Projected revenue increase"
        />
        <MetricCard
          title="Net Benefit"
          value={`$${(netBenefit / 1000000).toFixed(1)}M`}
          change={netBenefit > 0 ? "Positive ROI" : "Negative ROI"}
          changeType={netBenefit > 0 ? "positive" : "negative"}
          icon={Calculator}
          description="Revenue - Investment"
        />
      </div>

      {/* Scenario Visualization */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Baseline vs Scenario Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scenarioData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  dataKey="metric" 
                  type="category" 
                  stroke="hsl(var(--muted-foreground))"
                  width={120}
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
                  dataKey="base" 
                  fill="hsl(var(--muted))"
                  name="Baseline"
                  radius={[0, 4, 4, 0]}
                />
                <Bar 
                  dataKey="scenario" 
                  fill="hsl(var(--primary))"
                  name="Scenario"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12-Month Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'ROI %', angle: -90, position: 'insideLeft' }}
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
                  dataKey="baseline" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Baseline ROI"
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Projected ROI"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Investment Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Breakdown & Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-4">Investment Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm">Collaboration Tools</span>
                  <span className="font-medium">${(toolsInvestment[0] / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm">Training & Development</span>
                  <span className="font-medium">${(trainingInvestment[0] / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-sm font-medium">Total Investment</span>
                  <span className="font-bold text-primary">${(totalInvestment / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Expected Timeline</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Months 1-2:</span>
                  <span>Tool setup & initial training</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Months 3-4:</span>
                  <span>Adoption & early improvements</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Months 5-6:</span>
                  <span>Full implementation</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Months 7-12:</span>
                  <span>ROI realization & optimization</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-analytics-success/10 border border-analytics-success/20">
              <h4 className="font-medium text-analytics-success mb-2">Recommended Actions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start with pilot team for collaboration tools</li>
                <li>• Implement metrics-driven training programs</li>
                <li>• Focus on cross-team project assignments</li>
                <li>• Establish collaboration KPIs and incentives</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-analytics-info/10 border border-analytics-info/20">
              <h4 className="font-medium text-analytics-info mb-2">Risk Mitigation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Phase investments over 6-month period</li>
                <li>• Track leading indicators early</li>
                <li>• Adjust strategy based on initial results</li>
                <li>• Maintain change management support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}