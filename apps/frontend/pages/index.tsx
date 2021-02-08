import { Layout } from "../components/Layout/Layout";
import { MainSection } from "../components/MainSection/MainSection";
import { Recommended } from "../components/Recommended/Recommended";

const Home = () => {
  return (
    <Layout>
      <MainSection />
      <Recommended />
    </Layout>
  );
};

export default Home;
