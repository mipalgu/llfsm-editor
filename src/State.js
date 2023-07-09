import { useCallback, useState } from "react";
import { Handle, NodeResizer, Position, useKeyPress, useStore } from "reactflow";

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const sourceStyle = { zIndex: 1 };

function State({ id, data, isConnectable, selected }) {
    const [name, setName] = useState(data.name);
    const [onEntry, setOnEntry] = useState('');
    const ctrlPressed = useKeyPress('Control');
    const connectionNodeId = useStore(connectionNodeIdSelector);

    const onChange = useCallback((evt) => {
        setOnEntry(evt.target.value);
    }, []);

    const isConnecting = !!connectionNodeId;

    const handleElements = Object.keys(data.handles ?? {}).map((key) => {
        const handle = data.handles[key];
        return <Handle key={key} id={handle.id} type={handle.type} position={handle.position} isConnectable={false} style={{visibility: 'hidden'}} />
    });
    return (
        <div className="state-node">
            <NodeResizer isVisible={selected} minWidth={100} minHeight={30} />
            {!isConnecting && ctrlPressed && (
                <Handle
                    className="customHandle"
                    position={Position.Right}
                    type="source"
                    style={sourceStyle}
                />
            )}
            {ctrlPressed && (
                <Handle className="customHandle" position={Position.Left} type="target" />
            )}
            {handleElements}
            <div>
                <label className="title">{name}</label>
                <label htmlFor="text" className="action">OnEntry:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag implementation" value={onEntry} />
            </div>
        </div>
    );
}

export default State;
