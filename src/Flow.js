import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

function Flow() {
    return (
        <div style={{ height: '100%'}}>
            <ReactFlow>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;
