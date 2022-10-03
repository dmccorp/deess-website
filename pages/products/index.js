import Products from "components/Products";
import { fetchCategories, fetchProductsByCategory } from "lib/utils";

export async function getServerSideProps() {
  const categories = await fetchCategories();
  const products = await fetchProductsByCategory();
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
