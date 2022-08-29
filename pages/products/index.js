import Products from "components/Products";
import Layout from "components/shared/Layout";
import Head from "next/head";
import qs from "qs";

async function fetchCategories() {
  const response = await fetch("https://deess.dmcworks.in/api/categories");
  return response.json();
}

async function fetchProducts() {
  const query = qs.stringify({
    populate: ["categories", "images"],
  });
  const response = await fetch(
    `https://deess.dmcworks.in/api/products?${query}`
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
  return (
    <Layout>
      <Head>
        <title>Products - déess</title>
      </Head>
      <Products categories={categories} products={products} />
    </Layout>
  );
}