"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const examples = [
    {
      icon: "💬",
      title: "AI Guidance",
      subtitle: "Minor symptoms",
      text: "amar halka jor ar sordi hoyeche",
    },
    {
      icon: "🩺",
      title: "Specialist Match",
      subtitle: "Serious symptoms",
      text: "amar buke betha hocche ar shash nite kosto hoy",
    },
    {
      icon: "🚨",
      title: "Crisis Support",
      subtitle: "Emotional distress",
      text: "ami bhalo nei, kichui bhalo lagche na",
    },
  ];

  const useExample = (text) => {
    setMessage(text);
    setResponse(null);
    setError("");
  };

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
    return "bg-emerald-50 border-emerald-500";
  };

  const getCardTitle = (type) => {
    if (type === "emergency") return "Emergency Support";
    if (type === "specialist") return "Specialist Advice";
    return "Primary Guidance";
  };

  const getCardIcon = (type) => {
    if (type === "emergency") return "🚨";
    if (type === "specialist") return "🩺";
    return "💚";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-3xl shadow-lg mb-4">
            🩺
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent">
            MediBondhu
          </h1>
          <p className="text-gray-600 mt-3 text-sm sm:text-base px-4">
            AI-Driven Healthcare Guidance Platform for Bangladesh
          </p>
        </header>

        <section className="mb-8">
          <p className="text-center text-xs text-gray-500 mb-3">
            Tap an example to try it out
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {examples.map((ex) => (
              <button
                key={ex.title}
                onClick={() => useExample(ex.text)}
                className="bg-white/80 backdrop-blur rounded-xl p-4 text-center border border-gray-200 shadow-sm hover:shadow-md hover:border-teal-400 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                <div className="text-2xl mb-1">{ex.icon}</div>
                <p className="text-sm font-semibold text-gray-800">{ex.title}</p>
                <p className="text-xs text-gray-500 mt-1">{ex.subtitle}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-7">
          <label className="block text-lg font-bold text-gray-900 mb-1">
            Describe your health problem
          </label>
          <p className="text-xs text-gray-500 mb-4">
            Write in Bengali, Banglish, or English. AI replies in your language.
          </p>

          <textarea
            className="w-full border-2 border-gray-200 rounded-xl p-4 h-32 resize-none focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-gray-800 transition"
            placeholder="Example: amar 3 din dhore jor ar matha betha..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
          >
            {loading ? "Analyzing your symptoms..." : "Get Guidance"}
          </button>
        </section>

        {loading && (
          <div className="flex justify-center mt-8">
            <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-xl p-4 text-red-800 shadow-sm">
            {error}
          </div>
        )}

        {response && (
          <section
            className={`mt-6 border-l-4 rounded-2xl p-5 sm:p-7 shadow-lg ${getCardStyle(
              response.type
            )}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{getCardIcon(response.type)}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {getCardTitle(response.type)}
              </h2>
            </div>

            <p className="text-gray-800 leading-loose whitespace-pre-line text-base">
              {response.message}
            </p>

            {response.specialist && (
              <div className="mt-5 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Recommended Specialist
                </p>
                <p className="text-xl font-bold text-blue-700">
                  {response.specialist}
                </p>
              </div>
            )}

            {response.type === "emergency" && (
              <button
                onClick={callHelpline}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] text-lg"
              >
                📞 Call Emergency Helpline 1222
              </button>
            )}
          </section>
        )}

        <footer className="mt-10 text-center">
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
            MediBondhu provides preliminary guidance only. It is not a
            substitute for professional medical diagnosis or treatment. In an
            emergency, contact a doctor immediately.
          </p>
        </footer>
      </div>
    </main>
  );
}