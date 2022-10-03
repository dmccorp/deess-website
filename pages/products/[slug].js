import ProductDetail from "components/ProductDetail";
import Products from "components/Products";
import { assetHost } from "lib/constants";
import { fetchProductsByCategory } from "lib/utils";
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
      "blueprint",
      "displayImages",
    ],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });
  const response = await fetch(`${assetHost}/api/products?${query}`);
  return response.json();
}

async function fetchCategories() {
  const response = await fetch(`${assetHost}/api/categories`);
  return response.json();
}

export async function getServerSideProps(context) {
  const categories = await fetchCategories();
  const category = categories.data.find(
    (category) => category.attributes.slug === context.params.slug
  );
  if (category) {
    const products = await fetchProductsByCategory(1, category.id);
    return {
      props: {
        products: products,
        categories: categories.data,
        category: category.attributes,
      },
    };
  }
  const product = await fetchProduct(context.params.slug);
  if (product.data.length > 0) {
    return {
      props: {
        product: product.data[0].attributes,
      },
    };
  }
  return {
    notFound: true,
  };
}

export default function ProductPage({
  product,
  products,
  category,
  categories,
}) {
  if (category)
    return (
      <Products
        products={products}
        category={category}
        categories={categories}
      />
    );
  return <ProductDetail product={product} />;
}
