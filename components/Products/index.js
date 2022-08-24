import Tags from "components/shared/Tags";
import { useMemo, useState } from "react";
import Product from "./Product";
import styles from "./styles.module.css";

export default function Products({ categories, products }) {
  const [category, setCategory] = useState("");
  const transformedCategories = useMemo(
    () => [
      { name: "All", value: "" },
      ...categories.map((category) => ({
        name: category.attributes.name,
        value: category.attributes.name,
      })),
    ],
    [categories]
  );
  return (
    <div className={styles.container}>
      <Tags
        list={transformedCategories}
        onChange={(category) => setCategory(category)}
        current={category}
      />
      <div className={styles.products}>
        {products.map((product) => (
          <Product key={product.id} product={product.attributes} />
        ))}
      </div>
    </div>
  );
}
