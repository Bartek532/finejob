import { Layout } from "../components/Layout/Layout";
import { MainSection } from "../views/MainSection/MainSection";
import { Recommended } from "../views/Recommended/Recommended";
import { Footer } from "../components/Footer/Footer";
import { MainInfo } from "../views/MainInfo/MainInfo";
import { GetStaticProps } from "next";
import type { Offer } from "../../types";
import { fetcher } from "../lib/utils/fetcher";

const Home = ({ results }: { results: Offer[] }) => {
  return (
    <Layout>
      <MainSection />
      <Recommended offers={results} />
      <MainInfo />
      <Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data }: { data: Offer[] } = await fetcher(
      `${process.env.API_URL}/api/offers/recommended`,
      "GET",
    );

    return { props: { results: data }, revalidate: 1 };
  } catch {
    return {
      notFound: true as const,
    };
  }
};

export default Home;
