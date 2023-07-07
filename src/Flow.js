import { useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    useEdgesState,
    useNodesState,
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
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
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
                <Background variant='lines' gap='40' lineWidth='0.7' />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;
