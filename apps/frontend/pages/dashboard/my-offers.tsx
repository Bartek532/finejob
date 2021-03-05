import { Layout } from "../../components/Layout/Layout";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { Results } from "../../views/Results/Results";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";
import { useEffect } from "react";
import { UserAPI } from "../../lib/api/user";
import { useDispatch } from "react-redux";

const MyOffers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserAPI.getUserOffers("created"));
  }, []);
  return (
    <AuthChecker>
      <Layout title="My offers" headerTitle="my offers">
        <ActionButton icon="back" corner />
        <Results />
      </Layout>
    </AuthChecker>
  );
};

export default MyOffers;
