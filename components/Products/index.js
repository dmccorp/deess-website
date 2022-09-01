import { Skeleton } from "@mui/material";
import Layout from "components/shared/Layout";
import Tags from "components/shared/Tags";
import { siteName } from "lib/constants";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import Product from "./Product";
import styles from "./styles.module.css";

export default function Products({ categories, products, category: cat }) {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (cat) {
      setCategory(cat.slug);
      setLoading(false);
    }
  }, [cat]);
  const transformedCategories = useMemo(
    () => [
      { name: "All", value: "" },
      ...categories.map((category) => ({
        name: category.attributes.name,
        value: category.attributes.slug,
      })),
    ],
    [categories]
  );
  return (
    <Layout>
      <Head>
        <title>Products - ${siteName}</title>
      </Head>
      <div className={styles.container}>
        <Tags
          list={transformedCategories}
          onChange={() => setLoading(true)}
          current={category}
        />
        <div>
          {loading ? (
            <div className={styles.products}>
              {[...Array(5).keys()].map((index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={230}
                  height={350}
                />
              ))}
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                <div className={styles.empty}>
                  <h1>No products found</h1>
                </div>
              ) : (
                <div className={styles.products}>
                  {products.map((product) => (
                    <Product key={product.id} product={product.attributes} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
