import { Layout } from "../../components/Layout/Layout";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";

const Create = () => {
  return (
    <AuthChecker>
      <Layout title="Create an offer" headerTitle="create an offer">
        <ActionButton icon="back" corner />
      </Layout>
    </AuthChecker>
  );
};

export default Create;
