import { Layout } from "../../components/Layout/Layout";
import { DashboardStart } from "../../components/DashboardStart/DashboardStart";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";

const Dashboard = () => {
  return (
    <AuthChecker>
      <Layout>
        <DashboardStart />
      </Layout>
    </AuthChecker>
  );
};

export default Dashboard;
