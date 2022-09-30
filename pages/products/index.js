import Products from "components/Products";
import { assetHost } from "lib/constants";
import { fetchProducts } from "lib/utils";

async function fetchCategories() {
  const response = await fetch(`${assetHost}/api/categories`);
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
