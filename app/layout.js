import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Competitive Programming Topics',
  description: 'A simple app to manage competitive programming topics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="icon.webp" />
        <link rel="icon" type="image/webp" href="icon.webp" sizes="32x32" />
        <link rel="apple-touch-icon" href="icon.webp" sizes="180x180" />
      </head>
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
