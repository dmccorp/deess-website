import qs from "qs";
import { assetHost } from "./constants";

const defaultQuery = {
  populate: ["categories", "images", "displayImages"],
};

export async function searchProducts(search) {
  const params = {
    populate: ["categories", "images"],
  };
  if (search) {
    params.filters = {
      name: {
        $containsi: search,
      },
    };
  }
  return fetchProducts(params);
}

export async function fetchProductsByCategory(page, category) {
  const params = {
    populate: ["categories", "images", "displayImages"],
    page,
  };
  if (category) {
    params.categories = {
      id: category,
    };
  }
  return fetchProducts(params);
}

export async function fetchProductsWithDisplayImages() {
  const params = {
    populate: ["displayImages"],
  };
  return fetchProducts(params);
}

export async function fetchProducts(params = defaultQuery) {
  const query = qs.stringify(params);
  const response = await fetch(`${assetHost}/api/products?${query}`);
  return response.json();
}
