// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "My App",
  description: "A sample store and user management app built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = "";
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/users", label: "Users" },
  ];

  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-blue-600">My App</h1>

            <nav>
              <ul className="flex gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`font-medium transition-colors ${
                        pathname === link.href
                          ? "text-blue-600 underline"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          {children}
        </main>

        <footer className="bg-white border-t mt-auto p-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
