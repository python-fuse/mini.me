'use client';

import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DashboardAnalyticCard from './DashboardAnalyticCard';
import { BiLink, BiPointer, BiQr } from 'react-icons/bi';
import DashboardAnalyticSkeleton from '@/src/components/dashboard/DashboardAnalyticSkeleton';
import { getUserTotalCLicks, getUserTotalLinks } from '@/src/actions/actions';

const DashboardAnalytics = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [totalUserLinks, setTotalUserLinks] = useState<number | null>(null);
  const [totalUserClicks, setTotalUserClicks] = useState<number | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchUserLinks = async () => {
        const [userTotalLinks, userTotalClicks] = await Promise.all([
          getUserTotalLinks(session.user.id),
          getUserTotalCLicks(session.user.id),
        ]);
        setTotalUserLinks(userTotalLinks);
        setTotalUserClicks(userTotalClicks);
      };
      fetchUserLinks();
    }
  }, [session]);

  return (
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
  );
};
export default DashboardAnalytics;
