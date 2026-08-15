import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bangla-friendly font — renders Bengali script much more cleanly
// than the default system font. Falls back to Geist for Latin text.
const banglaFont = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "MediBondhu — AI Healthcare Guidance",
  description: "AI-driven healthcare guidance platform for Bangladesh. Get instant health advice, specialist recommendations, and emergency support in Bengali or English.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning: the theme script below sets the
      // `dark` class before paint, which can differ from the
      // server-rendered markup for a split second — this is expected.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${banglaFont.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before paint so there's no light-mode flash for users whose saved theme is dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem("medibondhu-theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (saved === "dark" || (!saved && prefersDark)) {
                  document.documentElement.classList.add("dark");
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}