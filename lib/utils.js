import qs from "qs";
import { assetHost } from "./constants";

export async function fetchProducts(page = 1, category) {
  const filters = {
    populate: ["categories", "images", "displayImages"],
    pagination: { page },
  };
  if (category) {
    filters.categories = {
      id: category,
    };
  }
  const query = qs.stringify(filters);
  const response = await fetch(`${assetHost}/api/products?${query}`);
  return response.json();
}
