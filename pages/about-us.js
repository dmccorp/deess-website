import AboutUs from "components/Homepage/AboutUs";
import Layout from "components/shared/Layout";
import { siteName } from "lib/constants";
import Head from "next/head";

export default function AboutUsPage() {
  return (
    <Layout lightHead>
      <Head>
        <title>About Us - {siteName}</title>
      </Head>
      <AboutUs />
    </Layout>
  );
}
