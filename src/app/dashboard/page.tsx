import MyButton from '@/src/components/global/Button';
import RecentLinks from '@/src/components/dashboard/RecentLinks';
import Welcome from '@/src/components/dashboard/Welcome';
import { Divider } from '@mui/material';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import DashboardAnalytics from '@/src/components/dashboard/DashboardAnalytics';

const page = async () => {
  const session = await getServerSession();

  if (!session) {
    return;
  }

  return (
    <div className="px-4 md:px-20 py-4 md:py-10 flex flex-col gap-y-4 overflow-y-scroll">
      <Welcome />
      <DashboardAnalytics />

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
