import React, { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';

function EdgeLabel({ transform, label }) {
    return (
      <div
        style={{
          position: 'absolute',
          background: 'transparent',
          padding: 10,
          fontSize: 12,
          transform,
        }}
        className="nodrag nopan"
      >
        {label}
      </div>
    );
  }

export default function LLFSMEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data
  }) {
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    const [startLabel, setStartLabel] = useState(data ? data.startLabel ?? 'start' : 'start');
    const [condition, setCondition] = useState(data ? data.condition ?? 'true' : 'true');

    console.log(markerEnd)
  
    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
            <EdgeLabel
                transform={`translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`}
                label={startLabel}
            />
            <EdgeLabel
                transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
                label={condition}
            />
        </EdgeLabelRenderer>
      </>
    );
  }
