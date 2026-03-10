import "./globals.css";
import { Assistant } from "next/font/google";

const assistant = Assistant({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Prime E-Store",
  description: "Developed by Md. Mubtasim Fuad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${assistant.className} antialiased`}>{children}</body>
    </html>
  );
}
