'use client'

import { ProductResponse } from "@/lib/type/product";
import { use } from "react";
import { ProductCard } from "../ui/product-card";
import Link from "next/link";

export default function ProductListCardClient({fetchProducts}: {fetchProducts: Promise<ProductResponse[]>}) {

    // receive data from server and render it in the UI
    const products = use(fetchProducts)
    console.log(products);
    return (
        <main className="px-4 py-8 max-w-7xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-gray-600 mb-6">
          Browse all our available products below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description }
              price={product.price}
              slug={product.slug}
              category={product.category}
              images={product.images}
              creationAt={product.creationAt}
              updatedAt={product.updatedAt}
            />
            </Link>
          ))}
        </div>
      </section>
    </main>
    );
}
