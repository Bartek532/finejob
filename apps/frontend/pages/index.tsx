import { Layout } from "../components/Layout/Layout";
import { MainSection } from "../components/MainSection/MainSection";
import { Recommended } from "../components/Recommended/Recommended";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { fetcher } from "../lib/utils/fetcher";

const Home = ({ offers }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <MainSection />
      <Recommended offers={offers} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: offers } = await fetcher(
      "http://localhost:3080/api/offers/recommended",
      "GET"
    );
    return { props: { offers } };
  } catch {
    return {
      notFound: true as const,
    };
  }
};

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

export default Home;
