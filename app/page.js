"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResponse(data);
      }
    } catch (err) {
      setError("Could not connect. Please check your internet and try again.");
    }

    setLoading(false);
  };

  const callHelpline = () => {
    window.location.href = "tel:1222";
  };

  const getCardStyle = (type) => {
    if (type === "emergency") return "bg-red-50 border-red-500";
    if (type === "specialist") return "bg-blue-50 border-blue-500";
    return "bg-green-50 border-green-500";
  };

  const getCardTitle = (type) => {
    if (type === "emergency") return "Emergency Support";
    if (type === "specialist") return "Specialist Advice";
    return "Primary Guidance";
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-teal-700">MediBondhu</h1>
        <p className="text-gray-600 mt-2">
          AI-Driven Healthcare Guidance Platform
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        <label className="block text-lg font-semibold text-gray-800 mb-3">
          Describe your health problem
        </label>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
          placeholder="Write in Bengali or English..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Please wait..." : "Get Guidance"}
        </button>
      </div>

      {error && (
        <div className="w-full max-w-2xl mt-6 bg-red-50 border-l-4 border-red-500 rounded-xl p-4 text-red-800">
          {error}
        </div>
      )}

      {response && (
        <div
          className={`w-full max-w-2xl mt-6 border-l-4 rounded-xl p-6 shadow-sm ${getCardStyle(
            response.type
          )}`}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            {getCardTitle(response.type)}
          </h2>

          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {response.message}
          </p>

          {response.specialist && (
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500">Recommended Specialist</p>
              <p className="text-lg font-semibold text-blue-700">
                {response.specialist}
              </p>
            </div>
          )}

          {response.type === "emergency" && (
            <button
              onClick={callHelpline}
              className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition"
            >
              Call Emergency Helpline 1222
            </button>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-8 text-center max-w-lg">
        MediBondhu provides preliminary guidance only. It is not a substitute
        for professional medical diagnosis or treatment.
      </p>
    </main>
  );
}