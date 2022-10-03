import { fetchProducts, fetchProductsWithDisplayImages } from "lib/utils";
import Homepage from "../components/Homepage";

export async function getServerSideProps() {
  const products = await fetchProductsWithDisplayImages();
  const newProducts = await fetchProducts({
    filters: { isNew: { $eq: true } },
    pagination: { pageSize: 6 },
    populate: ["images"],
  });
  return {
    props: {
      products: products.data,
      newProducts: newProducts.data,
    },
  };
}

export default function Home({ products, newProducts }) {
  return <Homepage products={products} newProducts={newProducts} />;
}
