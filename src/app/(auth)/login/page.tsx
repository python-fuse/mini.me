import logo from '@/src/assets/logo.png';
import AuthButons from '@/src/components/global/AuthButons';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  const providers = await getProviders();

  return (
    <div className="flex w-screen">
      <div className="w-full md:w-3/5 bg-white h-screen overflow-y-auto pb-10 flex flex-col gap-y-4">
        <Image src={logo} alt="Mini.me" />

        {/* Login text and signup */}
        <div className="px-28 flex flex-col gap-y-3">
          <div className="space-y-1">
            <p className="text-3xl font-bold">Login to continue</p>
            <p className="text-black/80">
              Don&apos;t have an account?{' '}
              <Link
                href={'/signup'}
                className="text-primary-300 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Auth providers */}
          <AuthButons providers={providers} />
        </div>
      </div>

      <div className="hidden md:block flex-1 h-screen bg-tertiary"></div>
    </div>
  );
};
export default page;
