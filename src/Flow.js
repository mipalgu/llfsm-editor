import { useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MarkerType,
    MiniMap,
    addEdge,
    applyEdgeChanges,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import * as uuid from 'uuid';

import LLFSMEdge from './LLFSMEdge';
import State from './State';

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello' },
        type: 'state'
    },
    {
        id: '2',
        position: { x: 100, y: 100},
        data: { label: 'World' },
        type: 'state'
    },
    {
        id: '3',
        position: { x: -100, y: -100},
        data: { label: '!' },
        type: 'state'
    },
];

const initialEdges = [
    {
        id: `${uuid.v4()}`,
        source: '1',
        target: '2',
        data: {
            priority: 0,
            condition: 'true'
        }
    }
];

const nodeTypes = {
    state: State
}

const edgeTypes = {
    llfsm: LLFSMEdge
}

function Flow() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);

    const onConnectStart = (_, { nodeId, handleType }) =>
        console.log('on connect start', { nodeId, handleType });
    const onConnectEnd = (event) => console.log('on connect end', event);

    const onEdgesChange = useCallback(
        (changes) => {
            console.log(changes)
            let localEdges = edges ?? [];
            console.log(localEdges);
            changes.forEach((change) => {
                if (change.type !== 'remove') {
                    return;
                }
                const edgeIndex = localEdges.findIndex((elem) => elem.id === change.id);
                if (edgeIndex < 0) {
                    return;
                }
                const edge = localEdges[edgeIndex];
                localEdges.forEach((elem) => {
                    if (elem.source !== edge.source
                            || elem.data.priority < edge.data.priority
                            || elem.id === edge.id
                    ) {
                        return
                    }
                    elem.data.priority = elem.data.priority - 1;
                });
            });
            setEdges(applyEdgeChanges(changes, localEdges));
        },
        [edges, setEdges]
    );

    const onConnect = useCallback(
        (params) => {
            console.log('on connect', { params });
            setEdges((eds) => addEdge(
                {
                    ...params,
                    id: `${uuid.v4()}`,
                    type: 'llfsm',
                    markerEnd: { type: MarkerType.ArrowClosed },
                    data: {
                        priority: (eds ?? []).length,
                        condition: 'true'
                    }
                },
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
                nodeTypes={nodeTypes}
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
