import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8 bg-gray-50">
      <section className="text-center max-w-4xl mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-600">
          Welcome to MyStore!
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Manage and explore your products and users easily with Next.js and Tailwind CSS.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <Link
          href="/products"
          className="group rounded-xl border border-gray-200 bg-white shadow-sm p-6 transition-transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50"
        >
          <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between">
            Products
            <span className="ml-2 text-blue-500 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-gray-600 text-sm">
            Explore our wide range of products available for purchase.
          </p>
        </Link>

        {/* Users Card */}
        <Link
          href="/users"
          className="group rounded-xl border border-gray-200 bg-white shadow-sm p-6 transition-transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50"
        >
          <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between">
            Users
            <span className="ml-2 text-blue-500 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-gray-600 text-sm">
            View all registered users, manage roles, and see profiles.
          </p>
        </Link>

        <div className="group rounded-xl border border-gray-200 bg-white shadow-sm p-6 opacity-60 cursor-not-allowed">
          <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between">
            Coming Soon
          </h2>
          <p className="text-gray-600 text-sm">
            New features and sections will be added here.
          </p>
        </div>

        <div className="group rounded-xl border border-gray-200 bg-white shadow-sm p-6 opacity-60 cursor-not-allowed">
          <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between">
            Coming Soon
          </h2>
          <p className="text-gray-600 text-sm">
            Stay tuned for updates and improvements.
          </p>
        </div>
      </section>
    </main>
  );
}
