const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories() {
  if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const response = await fetch(`${BASE_URL}/api/v1/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch categories");

  const categories = await response.json();
  return categories;
}