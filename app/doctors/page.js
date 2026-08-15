"use client";

import { Phone, Building2, MapPin, Star, UserRound } from "lucide-react";
import { doctors } from "../data/doctors";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DoctorsPage() {
  const callNumber = (number) => {
    window.location.href = "tel:" + number;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <header className="text-center mb-10 animate-fade-up">
          <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
            Find a Doctor
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Browse our directory of specialists and call directly.
          </p>
        </header>

        <section className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">All Doctors</h3>
              <p className="text-xs text-teal-50 mt-0.5">
                {doctors.length} doctors available
              </p>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctors.map((doc, i) => (
                <div
                  key={doc.id}
                  className="border border-gray-200 dark:border-slate-700 rounded-xl p-4 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/60 animate-fade-up"
                  style={{ animationDelay: `${i * 0.04}s` }}
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

        <Footer />
      </main>
    </div>
  );
}