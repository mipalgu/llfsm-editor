import { useCallback, useState } from "react";

function Row(initialExternal) {
    const [external, setExternal] = useState(initialExternal);
    
    const onChangeName = useCallback((evt) => {
        setExternal({ ...external, name: evt.target.value });
    });
    const onChangeType = useCallback((evt) => {
        setExternal({ ...external, type: evt.target.value });
    });
    const onChangeMode = useCallback((evt) => {
        setExternal({ ...external, mode: evt.target.value });
    });
    const onChangeValue = useCallback((evt) => {
        setExternal({ ...external, defaultValue: evt.target.value });
    });
    
    return (
        <tr>
            <td><input type="text" onChange={onChangeName} value={external.name} /></td>
            <td><input type="text" onChange={onChangeType} value={external.type} /></td>
            <td><input type="text" onChange={onChangeMode} value={external.mode} /></td>
            <td><input type="text" onChange={onChangeValue} value={external.defaultValue} /></td>
        </tr>
    );
}

function Settings(machine) {
    const [externals, setExternals] = useState(machine.externalVariables ?? []);

    return (
        <div>
            <div>
                <label>Settings</label>
            </div>
            <section>
                <div>
                    <label>External Variables</label>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr><th>Name</th><th>Type</th><th>Mode</th><th>Default Value</th></tr>
                        </thead>
                        <tbody>
                            {externals.map((external) => Row(external))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Settings;
