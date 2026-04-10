import type { Product } from "@/types";
import articlesData from "@/data/articles.json";

const SIMULATED_DELAY = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts(): Promise<Product[]> {
  await delay(SIMULATED_DELAY);
  return articlesData as Product[];
}

export async function getProductById(
  id: number
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
