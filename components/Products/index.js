import { Skeleton } from "@mui/material";
import Layout from "components/shared/Layout";
import Tags from "components/shared/Tags";
import { siteName } from "lib/constants";
import { fetchProductsByCategory } from "lib/utils";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Product from "./Product";
import styles from "./styles.module.scss";

export default function Products({
  categories,
  products: initialProducts,
  category,
}) {
  const { total } = useMemo(
    () => initialProducts.meta.pagination,
    [initialProducts]
  );
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts.data);
  useEffect(() => {
    setProducts(initialProducts.data);
    setLoading(false);
  }, [initialProducts.data]);
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
  const loadMore = async () => {
    const page = parseInt(products.length / 25, 10) + 1;
    const rsp = await fetchProductsByCategory(page, category?.id);
    setProducts([...products, ...rsp.data]);
  };
  const categoryChanged = () => setLoading(true);
  return (
    <Layout>
      <Head>
        <title>Products - ${siteName}</title>
      </Head>
      <div className={styles.container}>
        <Tags
          list={transformedCategories}
          onChange={categoryChanged}
          current={category?.slug || ""}
        />
        <div>
          {loading ? (
            <div className={styles.products}>
              {[...Array(5).keys()].map((index) => (
                <Skeleton key={index} variant="rectangular" height={350} />
              ))}
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                <div className={styles.empty}>
                  <h1>No products found</h1>
                </div>
              ) : (
                <InfiniteScroll
                  loadMore={loadMore}
                  hasMore={products.length < total}
                >
                  <div className={styles.products}>
                    {products.map((product) => (
                      <Product key={product.id} product={product.attributes} />
                    ))}
                  </div>
                </InfiniteScroll>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
