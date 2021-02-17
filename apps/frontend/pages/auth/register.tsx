import { RegisterForm } from "../../views/RegisterForm/RegisterForm";
import { Layout } from "../../components/Layout/Layout";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { Modal } from "../../components/Modal/Modal";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();

  const handleModalAccepted = () => {
    router.push("/auth/login");
  };
  return (
    <Layout>
      <Modal onAccept={handleModalAccepted} />
      <ActionButton icon="back" corner />
      <RegisterForm />
    </Layout>
  );
};

export default Register;
