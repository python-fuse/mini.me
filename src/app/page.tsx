import Features from '../components/landing/Features';
import LandingHeader from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Why from '../components/landing/Why';

const page = () => {
  return (
    <div className="flex flex-col max-w-screen mx-auto overflow-x-hidden">
      <LandingHeader signedIn={true} />
      <Hero />
      <Why />
      <Features />
    </div>
  );
};
export default page;
