import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Layout } from "../../components/Layout/Layout";
import { Modal } from "../../components/Modal/Modal";

const Login = () => {
  return (
    <Layout>
      <Modal />
      <LoginForm />
    </Layout>
  );
};

export default Login;
