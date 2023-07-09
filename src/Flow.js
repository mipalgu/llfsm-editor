import { useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MarkerType,
    MiniMap,
    Panel,
    Position,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useEdgesState,
    useNodesState,
    useReactFlow,
    useUpdateNodeInternals,
} from 'reactflow';
import 'reactflow/dist/style.css';
import * as uuid from 'uuid';

import LLFSMEdge from './LLFSMEdge';
import State from './State';
import Settings from './Settings';

const initialNodes = (() => {
    const sourceHandle = {
        id: `${uuid.v4()}`,
        type: 'source',
        position: Position.Bottom
    }

    const targetHandle = {
        id: `${uuid.v4()}`,
        type: 'target',
        position: Position.Top
    }
    let temp = [
        {
            id: `${uuid.v4()}`,
            position: { x: 0, y: 0 },
            data: {
                name: 'Hello',
                handles: {},
            },
            type: 'state'
        },
        {
            id: `${uuid.v4()}`,
            position: { x: 100, y: 100},
            data: {
                name: 'World',
                handles: {}
            },
            type: 'state'
        },
        {
            id: `${uuid.v4()}`,
            position: { x: -100, y: -100},
            data: {
                name: '!',
                handles: {}
            },
            type: 'state'
        },
    ]
    temp[0].data.handles[sourceHandle.id] = sourceHandle;
    temp[1].data.handles[targetHandle.id] = targetHandle;
    return temp
})();

console.log(initialNodes)

const initialEdges = [
    {
        id: `${uuid.v4()}`,
        source: initialNodes[0].id,
        target: initialNodes[1].id,
        sourceHandle: Object.keys(initialNodes[0].data.handles)[0],
        targetHandle: Object.keys(initialNodes[1].data.handles)[0],
        markerEnd: MarkerType.ArrowClosed,
        type: 'llfsm',
        data: {
            priority: 0,
            condition: 'true'
        },
    }
];

console.log(initialEdges);

const nodeTypes = {
    state: State
}

const edgeTypes = {
    llfsm: LLFSMEdge
}

function Flow() {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    const reactFlow = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();

    const onConnectStart = (_, { nodeId, handleType }) =>
        console.log('on connect start', { nodeId, handleType });
    const onConnectEnd = (event) => console.log('on connect end', event);

    const onNodesChange = useCallback(
        (changes) => {
            console.log("nodes change.")
            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [setNodes]
    );

    const addNode = useCallback(
        () => {
            const newNode = {
                id: `${uuid.v4()}`,
                position: { x: 0, y: 0 },
                data: { name: '<State>' },
                type: 'state',
                width: 100,
                height: 100
            };
            reactFlow.addNodes(newNode);
        },
        [reactFlow]
    );

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
                const sourceNode = nodes.find((node) => node.id === edge.source);
                const targetNode = nodes.find((node) => node.id === edge.target);
                if (sourceNode) {
                    delete sourceNode.data.handles[edge.sourceHandle];
                }
                if (targetNode) {
                    delete targetNode.data.handles[edge.targetHandle];
                }
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
        [nodes, edges, setEdges]
    );

    const onConnect = useCallback(
        (params) => {
            console.log('on connect', { params });
            const sourceNode = nodes.find((node) => node.id === params.source);
            const targetNode = nodes.find((node) => node.id === params.target);
            if (!sourceNode || !targetNode) { return; }
            const sourceHandle = {
                id: `${uuid.v4()}`,
                type: 'source',
                position: Position.Bottom
            }
        
            const targetHandle = {
                id: `${uuid.v4()}`,
                type: 'target',
                position: Position.Top
            }
            sourceNode.data.handles[sourceHandle.id] = sourceHandle;
            targetNode.data.handles[targetHandle.id] = targetHandle;
            updateNodeInternals(sourceNode.id);
            updateNodeInternals(targetNode.id);
            setEdges((eds) => addEdge(
                {
                    ...params,
                    id: `${uuid.v4()}`,
                    type: 'llfsm',
                    markerEnd: { type: MarkerType.ArrowClosed },
                    "sourceHandle": sourceHandle.id,
                    "targetHandle": targetHandle.id,
                    data: {
                        priority: (eds ?? []).filter((elem) => elem.source === params.source).length,
                        condition: 'true'
                    }
                },
                eds
            ))
        },
        [setEdges, nodes, updateNodeInternals]
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
                <Panel position="top-left"><button onClick={addNode}>Add Node</button></Panel>
                <Background variant='lines' gap='60' lineWidth='0.7' />
                <Controls />
                <MiniMap pannable='true' />
                <Panel position="top-right"><Settings /></Panel>
            </ReactFlow>
        </div>
    );
}

export default Flow;
