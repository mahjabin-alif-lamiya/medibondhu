import Link from "next/link";
import { MessageCircleMore, Bot, UserCheck, ArrowRight, Phone } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: MessageCircleMore,
    title: "Describe or Speak",
    text: "Type in Bengali or English, or just tap the mic and tell us what's wrong.",
  },
  {
    step: "2",
    icon: Bot,
    title: "AI Analyzes",
    text: "Our AI instantly reads your symptoms and figures out how serious it is.",
  },
  {
    step: "3",
    icon: UserCheck,
    title: "Get Advice & a Doctor",
    text: "Receive simple, easy-to-understand advice, and the right specialist if you need one.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-14 sm:py-20">
        <header className="text-center mb-14 animate-fade-up">
          <p className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-3 tracking-tight">
            MediBondhu
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            AI-Driven Healthcare
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
              Guidance for Everyone
            </span>
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-5 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us how you feel, in Bengali or English. Our AI will guide you,
            find the right doctor, or connect you to emergency help — instantly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/chat"
              className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-xl transition-all active:scale-[0.99] text-lg flex items-center justify-center gap-2"
            >
              Check My Symptoms
              <ArrowRight size={20} />
            </Link>
            <a
              href="tel:1222"
              className="w-full sm:w-auto bg-white dark:bg-slate-900 border-2 border-red-200 dark:border-red-900 hover:border-red-400 text-red-600 dark:text-red-400 font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] text-lg flex items-center justify-center gap-2"
            >
              <Phone size={19} />
              Emergency Call
            </a>
          </div>
        </header>

        <section className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
            How It Works
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-slate-400 mb-8">
            Get the right health guidance in just 3 steps
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, text }) => (
              <div
                key={step}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition text-center"
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                    <Icon size={30} strokeWidth={2} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-500 text-teal-600 dark:text-teal-400 text-xs font-extrabold flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold hover:underline"
            >
              Try it now <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}