import { Layout } from "../components/Layout/Layout";
import { MainSection } from "../views/MainSection/MainSection";
import { Recommended } from "../views/Recommended/Recommended";
import { Footer } from "../components/Footer/Footer";
import { MainInfo } from "../views/MainInfo/MainInfo";
import { BASIC_API_URL } from "../lib/utils/consts";
import { GetStaticProps } from "next";
import type { OfferWithSalary } from "../../types";
import { fetcher } from "../lib/utils/fetcher";

const Home = ({ results }: { results: OfferWithSalary[] }) => {
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
    const { data }: { data: OfferWithSalary[] } = await fetcher(
      `${BASIC_API_URL}/api/offers/recommended`,
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
