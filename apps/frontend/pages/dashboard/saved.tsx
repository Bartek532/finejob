import { Layout } from "../../components/Layout/Layout";
import { Results } from "../../views/Results/Results";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";
import { useEffect } from "react";
import { UserAPI } from "../../lib/api/user";
import { useDispatch } from "react-redux";

const Saved = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserAPI.getSavedOffers());
  }, []);
  return (
    <AuthChecker>
      <Layout title="Saved" headerTitle="saved offers">
        <Results />
      </Layout>
    </AuthChecker>
  );
};

export default Saved;
