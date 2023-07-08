import logo from './logo.svg';
import './App.css';
import Flow from './Flow.js'
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
