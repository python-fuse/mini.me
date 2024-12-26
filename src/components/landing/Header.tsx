import logo from '@/src/assets/normal.png';
import Image from 'next/image';

const LandingHeader = ({ signedIn = true }: { signedIn: boolean }) => {
  return (
    <nav className="land-header flex fixed shadow-md px-40 z-50 w-screen top-0 h-20  justify-between text-white  items-center p-4">
      <Image src={logo} alt="Mini.me" height={80} />

      <div className="flex space-x-3">
        {/* <button className="bg-primary-300 p-2 text-lg px-4 hover:bg-primary-500 duration-300 hover:text-black">
          Log in
        </button> */}

        <button className="rounded-md p-2 text-lg px-4 hover:bg-primary-500 duration-300 text-white hover:text-black">
          Create link
        </button>

        {signedIn && (
          <button className=" rounded-md bg-primary-300 p-2 text-lg px-4 hover:bg-primary-500 duration-300 hover:text-black">
            Dashboard
          </button>
        )}
      </div>
    </nav>
  );
};
export default LandingHeader;
