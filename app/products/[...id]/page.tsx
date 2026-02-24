import { ProductResponse } from "@/lib/type/product";

async function fetchProductById(id: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${BASE_URL}/api/v1/products/${id}/`);

  const product: ProductResponse = await response.json();
  return product;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // handle loading state and error state as needed
  const { id } = await params;

  // Fetch product details using the provided ID received from the URL parameters
  const product: ProductResponse = await fetchProductById(id);
  console.log(product);

  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-xl font-semibold mb-4">${product.price}</p>
      </section>
    </main>
  );
}
