import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CollaborationNode, CollaborationEdge } from "@/data/mockData";

interface NetworkGraphProps {
  nodes: CollaborationNode[];
  edges: CollaborationEdge[];
}

export default function NetworkGraph({ nodes, edges }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Clear existing content
    svg.innerHTML = '';

    // Create positions for nodes in a circular layout
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;

    const nodePositions = nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    // Draw edges
    const edgeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    edges.forEach(edge => {
      const sourceNode = nodePositions.find(n => n.id === edge.source);
      const targetNode = nodePositions.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", sourceNode.x.toString());
        line.setAttribute("y1", sourceNode.y.toString());
        line.setAttribute("x2", targetNode.x.toString());
        line.setAttribute("y2", targetNode.y.toString());
        line.setAttribute("stroke", "hsl(var(--border))");
        line.setAttribute("stroke-width", (edge.weight / 5).toString());
        line.setAttribute("opacity", "0.6");
        edgeGroup.appendChild(line);
      }
    });
    svg.appendChild(edgeGroup);

    // Draw nodes
    const nodeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    nodePositions.forEach(node => {
      // Node circle
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x.toString());
      circle.setAttribute("cy", node.y.toString());
      circle.setAttribute("r", (8 + node.centrality * 12).toString());
      circle.setAttribute("fill", `hsl(var(--primary))`);
      circle.setAttribute("opacity", "0.8");
      circle.setAttribute("stroke", "hsl(var(--background))");
      circle.setAttribute("stroke-width", "2");
      
      // Node label
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", node.x.toString());
      text.setAttribute("y", (node.y + 25).toString());
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "hsl(var(--foreground))");
      text.setAttribute("font-size", "10");
      text.setAttribute("font-weight", "500");
      text.textContent = node.name.split(' ')[0];
      
      nodeGroup.appendChild(circle);
      nodeGroup.appendChild(text);
    });
    svg.appendChild(nodeGroup);

  }, [nodes, edges]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Collaboration Network
          <div className="flex space-x-2">
            <Badge variant="outline" className="text-xs">
              GitHub
            </Badge>
            <Badge variant="outline" className="text-xs">
              Slack
            </Badge>
            <Badge variant="outline" className="text-xs">
              Jira
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          ref={svgRef}
          width="100%"
          height="400"
          className="border border-border rounded-lg bg-card/50"
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Node size represents centrality score. Edge thickness shows collaboration intensity.
        </div>
      </CardContent>
    </Card>
  );
}