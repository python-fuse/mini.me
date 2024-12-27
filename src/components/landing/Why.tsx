import { FaArrowRight } from 'react-icons/fa';
import CTAButton from './CTAButton';
import { features } from '@/src/utils/constants';

const Why = () => {
  return (
    <section className="gap-y-4 py-10">
      <p className="text-2xl uppercase text-gray-500">
        Great connections are just a click away
      </p>
      <h2 className="font-semibold text-5xl text-primary-300">
        The Mini.me connections solution
      </h2>
      <p className="text-xl w-3/4 text-center">
        All the products you need to reach your dream audience, create short
        URLs, QR codes, <br />
        Click analytics and so much more. <br /> All in one place{' '}
      </p>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-8 mt-4 ">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="p-6 rounded-2xl bg-primary-600 hover:shadow-lg ring-offset-2 hover:ring-2 duration-300 group hover:bg-primary-300 flex flex-col place-items-center hover:rotate-6 "
          >
            <feature.icon className="h-12 w-12 text-blue-500 mb-4 group-hover:text-white" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 group-hover:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

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
