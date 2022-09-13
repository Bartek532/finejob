import { GetStaticProps, GetStaticPaths } from "next";
import { Layout } from "../../components/Layout/Layout";
import { SingleOffer } from "../../views/SingleOffer/SingleOffer";

import type { Offer } from "@finejob/types";
import { fetcher } from "../../lib/utils/fetcher";

const OfferPage = ({ offer }: { offer: Offer }) => {
  return (
    <Layout>
      <SingleOffer offer={offer} />
    </Layout>
  );
};

export default OfferPage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data }: { data: Offer } = await fetcher(
      `${process.env.API_URL}/api/offers/${context.params!.id}`,
      "GET",
    );

    if (!data) {
      return {
        notFound: true as const,
      };
    }

    return { props: { offer: data }, revalidate: 3600 };
  } catch {
    return {
      notFound: true as const,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data }: { data: Offer[] } = await fetcher(
      `${process.env.API_URL}/api/offers/search`,
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
