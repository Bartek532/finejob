import { Layout } from "../../components/Layout/Layout";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";
import { OfferForm } from "../../components/OfferForm/OfferForm";

const Offer = () => {
  return (
    <AuthChecker>
      <Layout title="Add an offer" headerTitle="Add an offer">
        <ActionButton icon="back" corner />
        <OfferForm type="add" />
      </Layout>
    </AuthChecker>
  );
};

export default Offer;
