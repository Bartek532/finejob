import { LoginForm } from "../../views/LoginForm/LoginForm";
import { Layout } from "../../components/Layout/Layout";
import { Modal } from "../../components/Modal/Modal";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
  }. []);

  return (
    <Layout title="Login">
      <Modal />
      <LoginForm />
    </Layout>
  );
};

export default Login;
