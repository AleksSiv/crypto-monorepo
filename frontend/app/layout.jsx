import "./globals.css";

export const metadata = {
  title: "Crypto Dashboard",
  description: "Real-time crypto dashboard powered by Node.js backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
