import { useState, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello' },
        type: 'input'
    },
    {
        id: '2',
        position: { x: 100, y: 100},
        data: { label: 'World' }
    },
];

const initialEdges = [
    {
        id: '1-2',
        source: '1',
        target: '2',
        label: 'to the',
        type: 'step'
    }
];

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    return (
        <div style={{ height: '100%'}}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;
