import ProductDetail from "components/ProductDetail";
import qs from "qs";

async function fetchProduct(slug) {
  const query = qs.stringify({
    populate: [
      "categories",
      "images",
      "cct",
      "colors",
      "cri",
      "beamAngle",
      "drivers",
      "dimensions",
      "illumination",
      "cutoutDimensions",
    ],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });
  const response = await fetch(
    `https://deess.dmcworks.in/api/products?${query}`
  );
  return response.json();
}

export async function getServerSideProps(context) {
  const products = await fetchProduct(context.params.slug);
  if (products.data.length === 0)
    return {
      notFound: true,
    };
  return {
    props: {
      product: products.data[0].attributes,
    },
  };
}

export default function ProductPage({ product }) {
  return <ProductDetail product={product} />;
}
