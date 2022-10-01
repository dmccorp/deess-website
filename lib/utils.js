import qs from "qs";
import { assetHost } from "./constants";

export async function fetchProducts(
  page = 1,
  category,
  search,
  populate = ["categories", "images", "displayImages"]
) {
  const params = {
    populate,
    pagination: { page },
  };
  if (category) {
    params.categories = {
      id: category,
    };
  }
  if (search) {
    params.filters = {
      name: {
        $containsi: search,
      },
    };
  }
  const query = qs.stringify(params);
  const response = await fetch(`${assetHost}/api/products?${query}`);
  return response.json();
}
