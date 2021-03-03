import { Layout } from "../../components/Layout/Layout";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";
import { AddOffer } from "../../views/AddOffer/AddOffer";

const Create = () => {
  return (
    <AuthChecker>
      <Layout title="Create an offer" headerTitle="create an offer">
        <ActionButton icon="back" corner />
        <AddOffer />
      </Layout>
    </AuthChecker>
  );
};

export default Create;
