"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mic,
  Phone,
  TriangleAlert,
  Stethoscope,
  HeartPulse,
  Building2,
  MapPin,
  Star,
  UserRound,
  Loader2,
} from "lucide-react";
import { findDoctors } from "../data/doctors";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    setVoiceSupported(
      typeof window !== "undefined" &&
        ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    );
  }, []);

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "bn-BD";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.start();
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

  const getCardStyle = (type) => {
    if (type === "emergency")
      return "bg-red-50 border-red-500 dark:bg-red-950/40 dark:border-red-500";
    if (type === "specialist")
      return "bg-blue-50 border-blue-500 dark:bg-blue-950/40 dark:border-blue-500";
    return "bg-emerald-50 border-emerald-500 dark:bg-emerald-950/40 dark:border-emerald-500";
  };

  const getCardTitle = (type) => {
    if (type === "emergency") return "Emergency Support";
    if (type === "specialist") return "See a Specialist";
    return "Home Care Advice";
  };

  const CardIcon = ({ type }) => {
    if (type === "emergency")
      return <TriangleAlert className="text-red-600 dark:text-red-400" size={26} />;
    if (type === "specialist")
      return <Stethoscope className="text-blue-600 dark:text-blue-400" size={26} />;
    return <HeartPulse className="text-emerald-600 dark:text-emerald-400" size={26} />;
  };

  const matched = response?.specialist ? findDoctors(response.specialist) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <header className="text-center mb-10 animate-fade-up">
          <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
            AI Chat
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
           Tell us how you feel, in English, Bangla or Benglish. Our AI will guide you,
            find the right doctor, or connect you to emergency help — right away.
          </p>
          
        </header>

        <section
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-6 sm:p-8 animate-fade-up transition-colors duration-300"
          style={{ animationDelay: "0.1s" }}
        >
          <label className="block text-xl font-bold text-gray-900 dark:text-white mb-1">
            How are you feeling?
          </label>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
            Write in your own words, or tap the mic to speak. The AI answers
            in your language.
          </p>

          <div className="relative">
            <textarea
              className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 h-36 resize-none focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-50 dark:focus:ring-teal-500/20 text-gray-800 dark:text-slate-100 dark:bg-slate-800/50 transition"
              placeholder="Example: amar 3 din dhore jor ar matha betha..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {voiceSupported && (
              <button
                onClick={startVoiceInput}
                type="button"
                aria-label="Speak your symptoms"
                className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition active:scale-90 ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              >
                <Mic size={17} />
              </button>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-5 w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-xl transition-all active:scale-[0.99] text-lg flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Checking your symptoms..." : "Get Help Now"}
          </button>

          <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-4">
            Already know which doctor you need?{" "}
            <Link
              href="/doctors"
              className="text-teal-700 dark:text-teal-400 font-semibold hover:underline"
            >
              Browse all doctors
            </Link>
          </p>
        </section>

        {loading && (
          <div className="flex flex-col items-center py-10 animate-fade-up">
            <div className="w-12 h-12 border-4 border-teal-200 dark:border-teal-900 border-t-teal-600 rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-3">
              Our AI is reading your symptoms...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 dark:bg-red-950/40 border-l-4 border-red-500 rounded-xl p-4 text-red-800 dark:text-red-300 shadow-sm animate-fade-up">
            {error}
          </div>
        )}

        {response && (
          <section
            className={`mt-8 border-l-4 rounded-2xl p-6 sm:p-8 shadow-lg animate-pop-in ${getCardStyle(
              response.type
            )}`}
          >
            <div className="flex items-center gap-3 mb-5">
              <CardIcon type={response.type} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {getCardTitle(response.type)}
              </h2>
            </div>

            <p className="text-gray-800 dark:text-slate-200 leading-loose whitespace-pre-line">
              {response.message}
            </p>

            {response.specialist && (
              <div className="mt-6 bg-white dark:bg-slate-900 rounded-xl p-5 border-2 border-blue-100 dark:border-blue-900">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1">
                  You should see a
                </p>
                <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">
                  {response.specialist}
                </p>
              </div>
            )}

            {response.type === "emergency" && (
              <button
                onClick={() => callNumber("1222")}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-md transition active:scale-[0.99] text-lg flex items-center justify-center gap-2"
              >
                <Phone size={19} />
                Call Helpline 1222 Now
              </button>
            )}
          </section>
        )}

        {matched.length > 0 && (
          <section className="mt-10 animate-fade-up">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Doctors For You</h3>
                <p className="text-xs text-teal-50 mt-0.5">
                  {matched.length} doctors matched
                </p>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matched.map((doc, i) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 dark:border-slate-700 rounded-xl p-4 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/60 animate-fade-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 flex items-center justify-center shrink-0 text-teal-700 dark:text-teal-300">
                        <UserRound size={22} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">
                          {doc.name}
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold">
                          {doc.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5 text-[11px] text-gray-600 dark:text-slate-400">
                      <p className="flex items-center gap-1.5">
                        <Building2 size={12} /> {doc.hospital}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin size={12} /> {doc.area}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Star size={12} /> {doc.experience} of experience
                      </p>
                    </div>

                    <button
                      onClick={() => callNumber(doc.phone)}
                      className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-lg transition active:scale-[0.98] flex items-center justify-center gap-1.5"
                    >
                      <Phone size={13} /> Call {doc.phone}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </div>
  );
}