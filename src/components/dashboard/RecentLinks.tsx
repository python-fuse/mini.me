'use client';

import LinkCard from '../links/LinkCard';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetchLinks from '@/src/hooks/useFetchLinks';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { ModalProvider } from '@/src/contexts/ModalContext';
import { URL } from '@prisma/client';
import LinkCardSkeleton from '../global/LinkCardSkeleton';

const RecentLinks = () => {
  const [session, setSession] = useState<Session | null>(null);
  const limit = 2;

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  const { links, loading }: { links: any; loading: boolean } = useFetchLinks(
    session?.user?.id!,
  );

  if (loading) {
    return <LinkCardSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-4">
      <ModalProvider>
        <div className="flex flex-col space-y-4">
          {links
            ?.slice(0, limit)
            .map((link: URL) => <LinkCard key={link.id} link={link} />)}
        </div>
      </ModalProvider>
      {!links.length && (
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">No links found</h1>
        </div>
      )}
    </div>
  );
};

export default RecentLinks;
