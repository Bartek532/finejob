import { Layout } from "../../components/Layout/Layout";
import { DashboardStart } from "../../views/DashboardStart/DashboardStart";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";

const Dashboard = () => {
  return (
    <AuthChecker>
      <Layout title="Dashboard">
        <DashboardStart />
      </Layout>
    </AuthChecker>
  );
};

export default Dashboard;
