'use client';

import LinkCardSkeleton from '@/src/components/global/LinkCardSkeleton';
import LinkCard from '@/src/components/LinkCard';
import { ModalProvider } from '@/src/contexts/ModalContext';
import { fetchAllLinks } from '@/src/data/linkQueries';
import useFetch from '@/src/hooks/useFetch';
import useFetchLinks from '@/src/hooks/useFetchLinks';
import { URL } from '@prisma/client';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AllLinks = () => {
  const [session, setSession] = useState<Session | null>(null);

  const linksFetch = useFetch({ loading: true });
  const { links, loading }: { links: any; loading: boolean } = useFetchLinks(
    session?.user?.id!,
  );

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  if (loading) {
    return <LinkCardSkeleton />;
  }

  return (
    <>
      {loading ? (
        <LinkCardSkeleton />
      ) : links!.length > 0 ? (
        <ModalProvider>
          <div className="flex flex-col space-y-4">
            {links?.map((link: URL) => <LinkCard key={link.id} link={link} />)}
          </div>
        </ModalProvider>
      ) : (
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">No links found</h1>
        </div>
      )}
    </>
  );
};
export default AllLinks;
