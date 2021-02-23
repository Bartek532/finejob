import { Layout } from "../../components/Layout/Layout";
import { Results } from "../../views/Results/Results";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";

import { GetStaticProps } from "next";
import type { Offer } from "../../types";
import { fetcher } from "../../lib/utils/fetcher";
import { BASIC_API_URL } from "../../lib/utils/consts";

const Saved = ({ offers }: { offers: Offer[] }) => {
  return (
    <AuthChecker>
      <Layout>
        <Results offers={offers} />
      </Layout>
    </AuthChecker>
  );
};

export default Saved;

export const getServerSideProps: GetStaticProps = async () => {
  try {
    const { data }: { data: Offer[] } = await fetcher(
      `${BASIC_API_URL}/api/users/offers/6d3faac0-ea88-4041-9b4d-ce3e65f4ecc6`,
      "GET"
    );
    console.log(data);

    return { props: { offers: data } };
  } catch (err) {
    console.log(err.message);
  }

  return { props: { offers: [] } };
};
