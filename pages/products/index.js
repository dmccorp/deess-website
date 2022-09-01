import Products from "components/Products";
import { assetHost } from "lib/constants";
import qs from "qs";

async function fetchCategories() {
  const response = await fetch(`${assetHost}/api/categories`);
  return response.json();
}

async function fetchProducts() {
  const query = qs.stringify({
    populate: ["categories", "images"],
  });
  const response = await fetch(
    `${assetHost}/api/products?${query}`
  );
  return response.json();
}

export async function getServerSideProps() {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  return {
    props: {
      categories: categories.data,
      products: products.data,
    },
  };
}

export default function ProductsPage({ categories, products }) {
  return <Products categories={categories} products={products} />;
}
