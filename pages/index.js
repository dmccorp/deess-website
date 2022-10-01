import { assetHost } from "lib/constants";
import qs from "qs";
import Homepage from "../components/Homepage";

const fetchProducts = async (query) => {
  const rsp = await fetch(`${assetHost}/api/products?${query}`);
  return rsp.json();
};

export async function getServerSideProps() {
  const products = await fetchProducts(
    qs.stringify({ populate: ["displayImages"] })
  );
  const newProducts = await fetchProducts(
    qs.stringify({
      filters: { isNew: { $eq: true } },
      pagination: { pageSize: 6 },
      populate: ["images"],
    })
  );
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
