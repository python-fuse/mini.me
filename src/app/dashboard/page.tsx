'use client';

import { useState, useEffect } from 'react';
import { getUserTotalCLicks, getUserTotalLinks } from '@/src/actions/actions';
import MyButton from '@/src/components/global/Button';
import DashboardAnalyticCard from '@/src/components/dashboard/DashboardAnalyticCard';
import RecentLinks from '@/src/components/dashboard/RecentLinks';
import Welcome from '@/src/components/dashboard/Welcome';
import { Divider } from '@mui/material';
import { BiLink, BiPointer, BiQr } from 'react-icons/bi';
import DashboardAnalyticSkeleton from '@/src/components/dashboard/DashboardAnalyticSkeleton';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

const Page = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalUserLinks, setTotalUserLinks] = useState(0);
  const [totalUserClicks, setTotalUserClicks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const session = await getSession();
      setSession(session);

      if (session?.user?.id) {
        const [links, clicks] = await Promise.all([
          getUserTotalLinks(session.user.id),
          getUserTotalCLicks(session.user.id),
        ]);
        setTotalUserLinks(links ?? 0);
        setTotalUserClicks(clicks ?? 0);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="px-4 md:px-20 py-4 md:py-10 flex flex-col gap-y-4 overflow-y-scroll">
        <Welcome session={session} />
        <div className="flex w-full  gap-x-2 ">
          <DashboardAnalyticSkeleton />
          <DashboardAnalyticSkeleton />
          <DashboardAnalyticSkeleton />
        </div>
        <Divider className="bg-tertiary-500" />
        <RecentLinks />
      </div>
    );
  }

  if (!session) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="px-4 md:px-20 py-4 md:py-10 flex flex-col gap-y-4 overflow-y-scroll">
      <Welcome session={session} />
      <div className="flex gap-x-2">
        <DashboardAnalyticCard
          icon={<BiLink size={22} />}
          title="Links created"
          value={totalUserLinks}
        />
        <DashboardAnalyticCard
          icon={<BiQr size={22} />}
          title="QR codes created"
          value={totalUserLinks}
        />
        <DashboardAnalyticCard
          icon={<BiPointer size={22} />}
          title="Total clicks"
          value={totalUserClicks}
        />
      </div>

      <Divider className="bg-tertiary-500" />

      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Recent links</h1>
        <MyButton>View all</MyButton>
      </div>

      <RecentLinks />
    </div>
  );
};

export default Page;
