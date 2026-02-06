import { DevBubble } from '@/components/DevBubble/DevBubble.tsx';

function App() {
  return (
    <div className="app">
      <div className="hero">
        <h1>Dev Bubble</h1>
        <p>Runtime-First, Contract-Driven Coding Assistant</p>
        <div className="features">
          <div className="feature">
            <span className="icon">🔄</span>
            <h3>Live Edit</h3>
            <p>See changes instantly with HMR</p>
          </div>
          <div className="feature">
            <span className="icon">🎯</span>
            <h3>Contract-Driven</h3>
            <p>AI is forced to be correct</p>
          </div>
          <div className="feature">
            <span className="icon">⏪</span>
            <h3>Reversible</h3>
            <p>Every change is logged and revertible</p>
          </div>
        </div>
      </div>
      <DevBubble />
    </div>
  );
}

export default App;
