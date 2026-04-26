import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from 'sonner';
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RideShield — Safety Operations Center",
  description: "Enterprise-grade real-time ride safety monitoring and emergency response platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${sourceCodePro.variable} antialiased`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        <AuthProvider>
          <ErrorBoundary>
            {children}
            <Toaster
              theme="dark"
              position="top-right"
              toastOptions={{
                style: {
                  background: 'oklch(0.135 0.018 264)',
                  border: '1px solid oklch(0.22 0.018 264)',
                  color: 'oklch(0.92 0.008 264)',
                },
              }}
            />
          </ErrorBoundary>
        </AuthProvider>

        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('unhandledrejection', (event) => {
              console.error('Unhandled Promise Rejection:', event.reason);
            });
            window.addEventListener('error', (event) => {
              console.error('Global Error Captured:', event.error || event.message);
            });
          `
        }} />
      </body>
    </html>
  );
}
