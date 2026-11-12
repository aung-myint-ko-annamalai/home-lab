"use server";
import { NewProduct, Product } from "@/types/product";

export const getProducts = async () => {
  const API_URL = process.env.API_URL;
  const data = await fetch(`${API_URL}/api/products`);

  if (!data.ok) {
    throw new Error("Failed to fetch users");
  }

  return (await data.json()) as Product[];
};

export const createProduct = async (product: NewProduct) => {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create product");
  const data = await res.json();
  return (Array.isArray(data) ? data[0] : data) as Product;
};
