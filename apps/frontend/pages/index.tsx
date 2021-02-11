import { Layout } from "../components/Layout/Layout";
import { MainSection } from "../components/MainSection/MainSection";
import { Recommended } from "../components/Recommended/Recommended";
import { Footer } from "../components/Footer/Footer";
import { MainInfo } from "../components/MainInfo/MainInfo";
import { GetStaticProps, GetStaticPaths } from "next";
import type { OffersResults } from "../../../types";
import { fetcher } from "../lib/utils/fetcher";

const Home = () => {
  return (
    <Layout>
      <MainSection />
      <Recommended />
      <MainInfo />
      <Footer />
    </Layout>
  );
};

/*

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await fetcher(
      "http://localhost:3080/api/offers/recommended",
      "GET"
    );
    return { props: { offers: data } };
  } catch {
    return {
      notFound: true as const,
    };
  }
};

/*
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: offers } = await fetcher(
      "http://localhost:3080/api/offers/recommended",
      "GET"
    );
    return {
      paths: offers.results.map(({ id }: { id: number }) => ({
        params: { id },
      })),
      fallback: "blocking" as const,
    };
  } catch (err) {
    throw err;
  }
};
*/
export default Home;
