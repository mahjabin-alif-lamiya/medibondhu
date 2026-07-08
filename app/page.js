"use client";

import { useState } from "react";
import { doctors, findDoctors } from "./data/doctors";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    setResponse(null);
    setShowAll(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResponse(data);
    } catch (err) {
      setError("Could not connect. Please check your internet and try again.");
    }
    setLoading(false);
  };

  const callNumber = (number) => {
    window.location.href = "tel:" + number;
  };

  const scrollToDoctors = () => {
    setShowAll(true);
    setTimeout(() => {
      document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getCardStyle = (type) => {
    if (type === "emergency") return "bg-red-50 border-red-500";
    if (type === "specialist") return "bg-blue-50 border-blue-500";
    return "bg-emerald-50 border-emerald-500";
  };

  const getCardTitle = (type) => {
    if (type === "emergency") return "Emergency Support";
    if (type === "specialist") return "See a Specialist";
    return "Home Care Advice";
  };

  const getCardIcon = (type) => {
    if (type === "emergency") return "🚨";
    if (type === "specialist") return "🩺";
    return "💚";
  };

  const matched = response?.specialist ? findDoctors(response.specialist) : [];
  const shownDoctors = showAll ? doctors : matched;
  const showSection = shownDoctors.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-xl shadow-md">
              🩺
            </div>
            <div>
              <p className="font-extrabold text-gray-900 leading-tight text-lg">
                MediBondhu
              </p>
              <p className="text-[10px] text-gray-500 leading-tight">
                Health For Everyone
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scrollToDoctors}
              className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-900 px-3 py-2 rounded-lg hover:bg-teal-50 transition"
            >
              Find Doctor
            </button>

            <button
              onClick={() => callNumber("1222")}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2.5 rounded-full shadow-md transition active:scale-95 flex items-center gap-1.5"
            >
              <span>🚨</span>
              <span className="hidden sm:inline">Emergency</span>
              <span className="font-extrabold">1222</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent leading-tight">
            AI-Driven Healthcare Guidance
          </h1>
          <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tell us how you feel, in Bengali or English. Our AI will guide you,
            find the right doctor, or connect you to emergency help.
          </p>
        </header>

        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <label className="block text-xl font-bold text-gray-900 mb-1">
            How are you feeling?
          </label>
          <p className="text-sm text-gray-500 mb-5">
            Write in your own words. The AI answers in your language.
          </p>

          <textarea
            className="w-full border-2 border-gray-200 rounded-xl p-4 h-36 resize-none focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-50 text-gray-800 transition"
            placeholder="Example: amar 3 din dhore jor ar matha betha..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-5 w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-xl transition-all active:scale-[0.99] text-lg"
          >
            {loading ? "Checking your symptoms..." : "Get Help Now"}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Already know which doctor you need?{" "}
            <button
              onClick={scrollToDoctors}
              className="text-teal-700 font-semibold hover:underline"
            >
              Browse all doctors
            </button>
          </p>
        </section>

        {loading && (
          <div className="flex flex-col items-center py-10">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 mt-3">
              Our AI is reading your symptoms...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-xl p-4 text-red-800 shadow-sm">
            {error}
          </div>
        )}

        {response && (
          <section
            className={`mt-8 border-l-4 rounded-2xl p-6 sm:p-8 shadow-lg ${getCardStyle(
              response.type
            )}`}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{getCardIcon(response.type)}</span>
              <h2 className="text-2xl font-bold text-gray-900">
                {getCardTitle(response.type)}
              </h2>
            </div>

            <p className="text-gray-800 leading-loose whitespace-pre-line">
              {response.message}
            </p>

            {response.specialist && (
              <div className="mt-6 bg-white rounded-xl p-5 border-2 border-blue-100">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  You should see a
                </p>
                <p className="text-2xl font-extrabold text-blue-700">
                  {response.specialist}
                </p>
              </div>
            )}

            {response.type === "emergency" && (
              <button
                onClick={() => callNumber("1222")}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-md transition active:scale-[0.99] text-lg"
              >
                📞 Call Helpline 1222 Now
              </button>
            )}
          </section>
        )}

        {showSection && (
          <section id="doctors" className="mt-10">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {showAll ? "All Doctors" : "Doctors For You"}
                  </h3>
                  <p className="text-xs text-teal-50 mt-0.5">
                    {shownDoctors.length} doctors available
                  </p>
                </div>
                {matched.length > 0 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-2 rounded-lg transition whitespace-nowrap"
                  >
                    {showAll ? "Show Matched" : "Show All"}
                  </button>
                )}
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shownDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-teal-400 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center text-xl shrink-0">
                        👨‍⚕️
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm">
                          {doc.name}
                        </p>
                        <p className="text-xs text-blue-700 font-semibold">
                          {doc.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 text-[11px] text-gray-600">
                      <p>🏥 {doc.hospital}</p>
                      <p>📍 {doc.area}</p>
                      <p>⭐ {doc.experience} of experience</p>
                    </div>

                    <button
                      onClick={() => callNumber(doc.phone)}
                      className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-lg transition active:scale-[0.98]"
                    >
                      📞 Call {doc.phone}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <footer className="mt-14 text-center">
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
            MediBondhu gives first-step advice only. It is not a replacement for
            a real doctor. If you feel very sick, see a doctor right away.
          </p>
        </footer>
      </main>
    </div>
  );
}