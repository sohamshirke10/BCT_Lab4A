import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

  const handleRequest = async (apiCall) => {
    setLoading(true);
    try {
      await apiCall();
    } catch (error) {
      console.error("API request failed:", error);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  const compileContract = () =>
    handleRequest(async () => {
      console.log(API_BASE);
      const res = await fetch(`${API_BASE}/compile`);
      const data = await res.json();
      alert(data.message);
    });

  const deployContract = () =>
    handleRequest(async () => {
      const res = await fetch(`${API_BASE}/deploy`);
      const data = await res.json();
      alert(`Contract Address: ${data.message}`);
    });

  const getMessage = () =>
    handleRequest(async () => {
      const res = await fetch(`${API_BASE}/get-message`);
      const data = await res.json();
      setMessage(data.message);
    });

  const setMessageOnChain = () =>
    handleRequest(async () => {
      const res = await fetch(`${API_BASE}/set-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newMessage }),
      });
      const data = await res.json();
      alert(data.message);
    });

  return (
    <div className="container">
      <h1>Ethereum DApp</h1>

      <div className="card">
        <button onClick={compileContract} disabled={loading}>
          Compile Contract
        </button>
        <button onClick={deployContract} disabled={loading}>
          Deploy Contract
        </button>
        <button onClick={getMessage} disabled={loading}>
          Get Message
        </button>
      </div>

      {message && (
        <p>
          <strong>Stored Message:</strong> {message}
        </p>
      )}

      <div className="card">
        <input
          type="text"
          placeholder="Enter new message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={loading}
        />
        <button onClick={setMessageOnChain} disabled={loading}>
          Set Message
        </button>
      </div>
    </div>
  );
}

export default App;
