import { ProductRequest } from "../type/product";

// Fetch product list from the API and return the product data
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchListProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products/`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const products = await response.json();
  return products;
}

// Insert a new product to the database by sending a POST request to the API
export async function insertProduct(product:  ProductRequest) {
  const data = await fetch(`${BASE_URL}/api/v1/products/`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const insertedProduct = await data.json();
  return insertedProduct;
}


