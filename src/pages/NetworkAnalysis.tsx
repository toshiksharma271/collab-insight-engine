import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NetworkGraph from "@/components/charts/NetworkGraph";
import { collaborationNodes, collaborationEdges } from "@/data/mockData";
import { Network, Users, Zap, Target } from "lucide-react";
import MetricCard from "@/components/charts/MetricCard";

export default function NetworkAnalysis() {
  const totalConnections = collaborationEdges.length;
  const avgCentrality = collaborationNodes.reduce((sum, node) => sum + node.centrality, 0) / collaborationNodes.length;
  const topCollaborator = collaborationNodes.reduce((prev, current) => 
    prev.collaborationScore > current.collaborationScore ? prev : current
  );
  const crossTeamConnections = collaborationEdges.filter(edge => {
    const sourceNode = collaborationNodes.find(n => n.id === edge.source);
    const targetNode = collaborationNodes.find(n => n.id === edge.target);
    return sourceNode && targetNode && sourceNode.team !== targetNode.team;
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Network Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Understanding collaboration patterns and network dynamics
        </p>
      </div>

      {/* Network Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Connections"
          value={totalConnections}
          icon={Network}
          description="Active collaboration links"
        />
        <MetricCard
          title="Avg Centrality"
          value={avgCentrality.toFixed(2)}
          icon={Target}
          description="Network influence score"
        />
        <MetricCard
          title="Top Collaborator"
          value={topCollaborator.name.split(' ')[0]}
          icon={Users}
          description={`Score: ${topCollaborator.collaborationScore}`}
        />
        <MetricCard
          title="Cross-Team Links"
          value={crossTeamConnections}
          icon={Zap}
          description="Inter-team collaborations"
        />
      </div>

      {/* Network Visualization */}
      <NetworkGraph nodes={collaborationNodes} edges={collaborationEdges} />

      {/* Network Analysis Tables */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Collaborators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {collaborationNodes
                .sort((a, b) => b.collaborationScore - a.collaborationScore)
                .slice(0, 5)
                .map((node, index) => (
                  <div key={node.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{node.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {node.role} • {node.team}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {node.collaborationScore}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-analytics-success/10 border border-analytics-success/20">
                <h4 className="font-medium text-analytics-success mb-2">Strong Cross-Team Collaboration</h4>
                <p className="text-sm text-muted-foreground">
                  {((crossTeamConnections / totalConnections) * 100).toFixed(1)}% of connections span across different teams, indicating healthy cross-functional collaboration.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-analytics-info/10 border border-analytics-info/20">
                <h4 className="font-medium text-analytics-info mb-2">Network Density</h4>
                <p className="text-sm text-muted-foreground">
                  High centrality scores suggest key influencers who facilitate knowledge sharing and coordination.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-analytics-warning/10 border border-analytics-warning/20">
                <h4 className="font-medium text-analytics-warning mb-2">Collaboration Channels</h4>
                <div className="mt-2 space-y-1">
                  {[
                    { type: "GitHub", count: collaborationEdges.filter(e => e.type === 'github').length },
                    { type: "Slack", count: collaborationEdges.filter(e => e.type === 'slack').length },
                    { type: "Jira", count: collaborationEdges.filter(e => e.type === 'jira').length }
                  ].map(channel => (
                    <div key={channel.type} className="flex justify-between text-sm">
                      <span>{channel.type}</span>
                      <span className="font-medium">{channel.count} connections</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}