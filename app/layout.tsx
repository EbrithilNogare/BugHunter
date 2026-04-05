import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BugHunter – GitHub PR Review Game",
  description: "Find all the bugs hidden in the code review!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%", overflow: "hidden" }}>{children}</body>
    </html>
  );
}
