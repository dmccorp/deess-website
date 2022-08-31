import ProductDetail from "components/ProductDetail";
import Products from "components/Products";
import qs from "qs";

async function fetchProduct(slug, category) {
  const filters = {};
  if (category)
    filters.categories = {
      id: category.id,
    };
  else {
    filters.slug = {
      $eq: slug,
    };
  }
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
    filters,
  });
  const response = await fetch(
    `https://deess.dmcworks.in/api/products?${query}`
  );
  return response.json();
}

async function fetchCategories() {
  const response = await fetch(`https://deess.dmcworks.in/api/categories`);
  return response.json();
}

export async function getServerSideProps(context) {
  const categories = await fetchCategories();
  const category = categories.data.find(
    (category) => category.attributes.slug === context.params.slug
  );
  const products = await fetchProduct(context.params.slug, category);
  if (category) {
    return {
      props: {
        products: products.data,
        categories: categories.data,
        category: category.attributes,
      },
    };
  }
  if (products.data.length > 0) {
    return {
      props: {
        product: products.data[0].attributes,
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
