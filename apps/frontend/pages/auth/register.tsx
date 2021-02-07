import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { Layout } from "../../components/Layout/Layout";
import { ActionButton } from "../../components/ActionButton/ActionButton";

const register = () => {
  return (
    <Layout>
      <ActionButton icon="back" corner />
      <RegisterForm />
    </Layout>
  );
};

export default register;
