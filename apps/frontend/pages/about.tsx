import { Layout } from "../components/Layout/Layout";
import { AboutSection } from "../views/AboutSection/AboutSection";
import { Footer } from "../components/Footer/Footer";

const About = () => {
  return (
    <Layout title="How it works">
      <AboutSection />
      <Footer />
    </Layout>
  );
};

export default About;
