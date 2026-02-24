import "./globals.css";
import { ReactNode, Suspense } from "react";
import Link from "next/link";
import ProductLoading from "./products/loading";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "My App",
  description: "A sample store and user management app built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/users", label: "Users" },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider enableSystem disableTransitionOnChange>
          
          {/* Navigation */}
          <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="max-w-7xl mx-auto flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-yellow-400 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
            <Suspense fallback={<ProductLoading />}>
              {children}
            </Suspense>
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
