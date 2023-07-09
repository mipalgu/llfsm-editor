import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

function State({ data, isConnectable }) {
    const [name, setName] = useState(data.name);
    const [onEntry, setOnEntry] = useState('');

    const onChange = useCallback((evt) => {
        setOnEntry(evt.target.value);
    }, []);
    const handleElements = Object.keys(data.handles ?? {}).map((key) => {
        const handle = data.handles[key];
        return <Handle key={key} id={handle.id} type={handle.type} position={handle.position} isConnectable={false} style={{visibility: 'hidden'}} />
    });
    return (
        <div className="state-node">
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
