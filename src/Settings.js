import { useCallback, useState } from "react";

function Row(initialExternal) {
    const [external, setExternal] = useState(initialExternal);
    
    const onChangeName = useCallback((evt) => {
        setExternal({ ...external, name: evt.target.value });
    }, [external, setExternal]);
    const onChangeType = useCallback((evt) => {
        setExternal({ ...external, type: evt.target.value });
    }, [external, setExternal]);
    const onChangeMode = useCallback((evt) => {
        setExternal({ ...external, mode: evt.target.value });
    }, [external, setExternal]);
    const onChangeValue = useCallback((evt) => {
        setExternal({ ...external, defaultValue: evt.target.value });
    }, [external, setExternal]);
    
    return (
        <tr>
            <td><input type="text" onChange={onChangeName} value={external.name} /></td>
            <td><input type="text" onChange={onChangeType} value={external.type} /></td>
            <td><input type="text" onChange={onChangeMode} value={external.mode} /></td>
            <td><input type="text" onChange={onChangeValue} value={external.defaultValue} /></td>
            <td></td>
        </tr>
    );
}

function Settings(machine) {
    const [externals, setExternals] = useState(machine.externalVariables ?? []);
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState('');
    const [newMode, setNewMode] = useState('');
    const [newValue, setNewValue] = useState('');

    const onSubmit = useCallback((evt) => {
        evt.preventDefault();
        setExternals(externals.concat({
            name: newName, type: newType, mode: newMode, defaultValue: newValue
        }));
        setNewName('');
        setNewType('');
        setNewMode('');
        setNewValue('');
    },
        [
            externals, setExternals, newName, setNewName, newType, setNewType, newMode, setNewMode, newValue,
            setNewValue
        ]
    );
    const onChangeName = useCallback((evt) => {
        setNewName(evt.target.value);
    }, [setNewName]);
    const onChangeType = useCallback((evt) => {
        setNewType(evt.target.value);
    }, [setNewType]);
    const onChangeMode = useCallback((evt) => {
        setNewMode(evt.target.value);
    }, [setNewMode]);
    const onChangeValue = useCallback((evt) => {
        setNewValue(evt.target.value);
    }, [setNewValue]);

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
                            <tr><th>Name</th><th>Type</th><th>Mode</th><th>Default Value</th><th></th></tr>
                        </thead>
                        <tbody>
                            {externals.map((external) => Row(external))}
                        </tbody>
                    </table>
                    <form onSubmit={onSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><input type="text" onChange={onChangeName} value={newName} /></td>
                                    <td><input type="text" onChange={onChangeType} value={newType} /></td>
                                    <td><input type="text" onChange={onChangeMode} value={newMode} /></td>
                                    <td><input type="text" onChange={onChangeValue} value={newValue} /></td>
                                    <td><input type="submit" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Settings;
