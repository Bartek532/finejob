import { useDispatch } from "react-redux";
import { UserAPI } from "../../lib/api/user";
import { Layout } from "../../components/Layout/Layout";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";
import { Modal } from "../../components/Modal/Modal";
import { UserSettings } from "../../views/UserSettings/UserSettings";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ActionButton } from "../../components/ActionButton/ActionButton";

const Settings = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(UserAPI.getUserInfo());
  }, []);

  return (
    <AuthChecker>
      <Modal onAccept={() => router.push("/dashboard")} />
      <Layout title="Settings" headerTitle="My settings">
        <ActionButton icon="back" corner />
        <UserSettings />
      </Layout>
    </AuthChecker>
  );
};

export default Settings;
