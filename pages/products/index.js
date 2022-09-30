import Products from "components/Products";
import { assetHost } from "lib/constants";
import qs from "qs";

async function fetchCategories() {
  const response = await fetch(`${assetHost}/api/categories`);
  return response.json();
}

export async function fetchProducts(page = 1) {
  const query = qs.stringify({
    populate: ["categories", "images", "displayImages"],
    pagination: { page },
  });
  const response = await fetch(`${assetHost}/api/products?${query}`);
  return response.json();
}


export async function getServerSideProps() {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  return {
    props: {
      categories: categories.data,
      products,
    },
  };
}

export default function ProductsPage({ categories, products }) {
  return <Products categories={categories} products={products} />;
}
