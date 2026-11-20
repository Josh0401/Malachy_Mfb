import type { Metadata } from "next";
import "./globals.css";
import { MotionEffects } from "@/components/motion-effects";

export const metadata: Metadata = {
  title: {
    default: "Malachy Microfinance Bank | Save. Spend. Grow.",
    template: "%s | Malachy Microfinance Bank",
  },
  description:
    "Banking designed around your ambitions. Explore savings, business banking and financial solutions with Malachy Microfinance Bank.",
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><MotionEffects>{children}</MotionEffects></body>
    </html>
  );
}
