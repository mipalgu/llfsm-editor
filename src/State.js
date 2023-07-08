import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

function State({ data, isConnectable }) {
    const [name, setName] = useState(data.name);
    const [onEntry, setOnEntry] = useState('');

    const onChange = useCallback((evt) => {
        setOnEntry(evt.target.value);
    }, []);

    return (
        <div className="state-node">
            <Handle id="t" type="target" position={Position.Top} isConnectable={isConnectable} />
            <Handle id="t2" type="target" position={Position.Left} isConnectable={isConnectable} />
            <div>
                <label className="title">{name}</label>
                <label htmlFor="text" className="action">OnEntry:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag implementation" value={onEntry} />
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                isConnectable={isConnectable}
            />
        </div>
    );
}

export default State;
