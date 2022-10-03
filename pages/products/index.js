import Products from "components/Products";
import { assetHost } from "lib/constants";
import { fetchProducts } from "lib/utils";
import qs from "qs";

async function fetchCategories() {
  const query = qs.stringify({
    sort: ["order"],
  });
  const response = await fetch(`${assetHost}/api/categories?${query}`);
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
