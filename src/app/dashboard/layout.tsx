import Header from '@/src/components/global/Header';
import SidebarWrapper from '@/src/components/SidebarWrapper';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="flex overflow-y-hidden h-screen">
      <SidebarWrapper />

      <div className="flex-1 w-5/6 overflow-y-hidden">
        <Header />
        <div className="overflow-y-auto h-[calc(100dvh-80px)]">{children}</div>
      </div>
    </main>
  );
};
export default layout;
