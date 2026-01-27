import { ProductCard } from "@/components/ui/product-card";
import { ProductResponse } from "@/lib/type/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function loadProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products/`, {
    method: "GET",
    cache: "no-store", 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await response.json();
  return products;
}

export default async function ProductsPage() {
  const products = await loadProducts();

  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-gray-600 mb-6">
          Browse all our available products below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: ProductResponse) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              slug={product.slug}
              category={product.category}
              images={product.images}
              creationAt={product.creationAt}
              updatedAt={product.updatedAt}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
