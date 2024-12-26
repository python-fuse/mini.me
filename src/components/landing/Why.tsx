import { BiLink, BiRightArrow, BiSolidRightArrow } from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa';
import CTAButton from './CTAButton';
import FeatureCard from './FeatureCard';

const Why = () => {
  return (
    <section className="gap-y-4 py-10">
      <p className="text-2xl uppercase text-gray-500">
        Great connections are just a click away
      </p>
      <h2 className="font-semibold text-5xl text-primary-300">
        The Mini.me connections solution
      </h2>
      <p className="text-2xl w-3/4 text-center">
        All the products you need to reach your dream audience, create short
        URLs, QR codes, <br />
        Click analytics and so much more. <br /> All in one place{' '}
      </p>

      <div className="flex max-w-fit mt-10">
        <CTAButton className="anim-btn">
          Get started for free
          <FaArrowRight />
        </CTAButton>
      </div>
    </section>
  );
};
export default Why;
