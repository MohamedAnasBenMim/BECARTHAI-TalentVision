import type { Metadata } from "next";
import localFont from "next/font/local";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import MissingEnvSetup from "@/components/MissingEnvSetup";
import { getMissingEnvVars } from "@/lib/env";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BECARTHAI TalentVision",
  description:
    "Interview management and video evaluation platform for BECARTH.AI Consulting.",
};
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const missingEnvVars = getMissingEnvVars();
  const isConfigured = missingEnvVars.length === 0;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {isConfigured ? (
            <ConvexClerkProvider>
              <>
                <SignedIn>
                  <div className="min-h-screen">
                    <Navbar />
                    <main className="px-4 sm:px-6 lg:px-8">{children}</main>
                  </div>
                </SignedIn>

                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            </ConvexClerkProvider>
          ) : (
            <MissingEnvSetup missingEnvVars={missingEnvVars} />
          )}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
