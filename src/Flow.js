import { useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MarkerType,
    MiniMap,
    addEdge,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import LLFSMEdge from './LLFSMEdge';

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
        type: 'llfsm',
        markerEnd: { type: MarkerType.ArrowClosed }
    }
];

const edgeTypes = {
    llfsm: LLFSMEdge
}

function Flow() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnectStart = (_, { nodeId, handleType }) =>
        console.log('on connect start', { nodeId, handleType });
    const onConnectEnd = (event) => console.log('on connect end', event);

    const onConnect = useCallback(
        (params) => {
            console.log('on connect', { params });
            setEdges((eds) => addEdge(
                { ...params, type: 'llfsm', markerEnd: { type: MarkerType.ArrowClosed } },
                eds
            ))
        },
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
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                edgeTypes={edgeTypes}
                fitView
            >
                <Background variant='lines' gap='60' lineWidth='0.7' />
                <Controls />
                <MiniMap pannable='true' />
            </ReactFlow>
        </div>
    );
}

export default Flow;
