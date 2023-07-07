import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
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

const edges = [
    {
        id: '1-2',
        source: '1',
        target: '2',
        label: 'to the',
        type: 'step'
    }
];

function Flow() {
    return (
        <div style={{ height: '100%'}}>
            <ReactFlow nodes={nodes} edges={edges}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;
