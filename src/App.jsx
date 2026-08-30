import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkBackend = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/health`);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      console.log("Connected To Backend ✅");
      setMessage(data.message || "Backend is connected successfully!");
    } catch (error) {
      console.error("Backend Connection failed:", error);
      setError(
        error.message || "Unable to connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
          
          {/* Header */}
          <div className="mb-8">
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <span className="text-2xl">🚀</span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              AKS Frontend
            </h1>

            <p className="mt-2 text-slate-400">
              Check your backend connection
            </p>
          </div>

          {/* Button */}
          <button
            onClick={checkBackend}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-5 transition-all duration-200 shadow-lg shadow-blue-600/20"
          >
            {loading ? "Connecting..." : "Check Backend"}
          </button>

          {/* Success Message */}
          {message && (
            <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-xl">✅</span>

                <div>
                  <p className="font-semibold text-green-400">
                    Backend Connected
                  </p>

                  <p className="mt-1 text-sm text-green-200">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-xl">❌</span>

                <div>
                  <p className="font-semibold text-red-400">
                    Connection Failed
                  </p>

                  <p className="mt-1 text-sm text-red-200">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* API URL */}
          <p className="mt-6 text-xs text-slate-500 break-all">
            API: {API_URL || "VITE_API_URL is not configured"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;