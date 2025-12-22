import { IProductData, ALL_PRODUCTS } from "../constants";

export async function fetchProductDetails(
  productId: string
): Promise<IProductData | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const product = ALL_PRODUCTS.find((p) => p.id === productId);
  return product || null;
}

export async function fetchRelatedProducts(
  currentProductId: string
): Promise<IProductData[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return ALL_PRODUCTS.filter((p) => p.id !== currentProductId);
}
