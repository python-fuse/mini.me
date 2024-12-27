import logo from '@/src/assets/normal.png';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

const LandingHeader = async () => {
  const session = await getServerSession();
  return (
    <nav className="land-header flex fixed shadow-md px-40 z-50 w-screen top-0 h-20  justify-between text-white  items-center p-4">
      <Image src={logo} alt="Mini.me" height={80} />

      <div className="flex space-x-3">
        {!session && (
          <Link
            href={'/login'}
            className="bg-primary-300 rounded p-2 text-lg px-4 hover:bg-primary-500 duration-300 hover:text-black"
          >
            Log in
          </Link>
        )}

        <Link
          href={'/dashboard/links/new'}
          className="rounded-md p-2 text-lg px-4  bg-primary-500 duration-300  text-primary-300 hover:ring-2 hover:ring-primary-500 ring-offset-2"
        >
          Create link
        </Link>

        {session && (
          <Link
            href={'/dashboard'}
            className=" rounded-md bg-primary-300 p-2 text-lg px-4 hover:bg-primary-500 duration-300 hover:text-black"
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
};
export default LandingHeader;
