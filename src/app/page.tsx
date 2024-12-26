import Features from '../components/landing/Features';
import Footer from '../components/landing/Footer';
import LandingHeader from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Why from '../components/landing/Why';

const page = () => {
  return (
    <div className="flex flex-col gap-y-20 max-w-screen mx-auto overflow-x-hidden">
      <LandingHeader signedIn={true} />
      <Hero />
      <Why />
      <Footer />
    </div>
  );
};
export default page;
