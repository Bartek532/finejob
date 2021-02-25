import { GetStaticProps, GetStaticPaths } from "next";
import { Layout } from "../../components/Layout/Layout";
import { SingleOffer } from "../../views/SingleOffer/SingleOffer";

import type { OfferWithSalary } from "../../../types";
import { fetcher } from "../../lib/utils/fetcher";
import { BASIC_API_URL } from "../../lib/utils/consts";

const OfferPage = ({ offer }: { offer: OfferWithSalary }) => {
  return (
    <Layout>
      <SingleOffer offer={offer} />
    </Layout>
  );
};

export default OfferPage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data }: { data: OfferWithSalary } = await fetcher(
      `${BASIC_API_URL}/api/offers/${context.params!.id}`,
      "GET",
    );

    if (!data) {
      return {
        notFound: true as const,
      };
    }

    return { props: { offer: data } };
  } catch {
    return {
      notFound: true as const,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data }: { data: OfferWithSalary[] } = await fetcher(
      `${BASIC_API_URL}/api/offers/recommended`,
      "GET",
    );
    return {
      paths: data.map((item) => ({
        params: { id: item.id },
      })),
      fallback: "blocking" as const,
    };
  } catch (err) {
    throw err;
  }
};
