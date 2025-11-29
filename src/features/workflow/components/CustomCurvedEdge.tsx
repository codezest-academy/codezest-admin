import { BaseEdge, EdgeProps } from "reactflow";

export default function CustomCurvedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  // Calculate control points for WIDE S-curve that flows AROUND the cards
  const deltaX = targetX - sourceX;
  const deltaY = targetY - sourceY;

  // Determine if going left-to-right or right-to-left
  const direction = deltaX > 0 ? 1 : -1;

  // Create WIDE S-curve with cubic bezier that flows outward around cards
  // The key is to extend FAR outward to avoid the cards

  // First control point - extends DOWN and FAR OUT (away from cards)
  const controlPoint1X = sourceX + direction * 250; // Extend FAR outward (250px)
  const controlPoint1Y = sourceY + deltaY * 0.5; // Halfway down

  // Second control point - comes from FAR OUT on the other side
  const controlPoint2X = targetX + direction * 300; // Even further out (300px)
  const controlPoint2Y = targetY - deltaY * 0.2; // Near the target

  // Create SVG path with cubic Bezier curve
  const edgePath = `M ${sourceX},${sourceY} C ${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${targetX},${targetY}`;

  return <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />;
}
