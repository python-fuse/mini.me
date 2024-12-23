import { getUserTotalCLicks, getUserTotalLinks } from '@/src/actions/actions';
import MyButton from '@/src/components/global/Button';
import DashboardAnalyticCard from '@/src/components/dashboard/DashboardAnalyticCard';
import RecentLinks from '@/src/components/dashboard/RecentLinks';
import Welcome from '@/src/components/dashboard/Welcome';
import { Divider } from '@mui/material';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { BiLink, BiPointer, BiQr } from 'react-icons/bi';
import DashboardAnalyticSkeleton from '@/src/components/dashboard/DashboardAnalyticSkeleton';

const page = async () => {
  const session = await getServerSession();

  if (!session) {
    return;
  }

  const totalUserLinks = await getUserTotalLinks(session?.user.id);
  const totalUserClicks = await getUserTotalCLicks(session?.user.id);

  return (
    <div className="px-4 md:px-20 py-4 md:py-10 flex flex-col gap-y-4 overflow-y-scroll">
      <Welcome />
      <div className="flex gap-x-2">
        {!session ? (
          <>
            <DashboardAnalyticSkeleton />
            <DashboardAnalyticSkeleton />
            <DashboardAnalyticSkeleton />
          </>
        ) : (
          <>
            <DashboardAnalyticCard
              icon={<BiLink size={22} />}
              title="Links created"
              value={totalUserLinks ?? 0}
            />
            <DashboardAnalyticCard
              icon={<BiQr size={22} />}
              title="QR codes created"
              value={totalUserLinks ?? 0}
            />
            <DashboardAnalyticCard
              icon={<BiPointer size={22} />}
              title="Total clicks"
              value={totalUserClicks ?? 0}
            />
          </>
        )}
      </div>

      <Divider className="bg-tertiary-500" />

      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Recent links</h1>
        <Link href="/dashboard/links">
          <MyButton>View all</MyButton>
        </Link>
      </div>

      <RecentLinks />
    </div>
  );
};
export default page;
