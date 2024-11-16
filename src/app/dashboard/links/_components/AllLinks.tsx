"use client";

import LinkCard from "@/src/components/LinkCard";
import { ModalProvider } from "@/src/contexts/ModalContext";
import { fetchAllLinks } from "@/src/data/linkQueries";
import useFetch from "@/src/hooks/useFetch";
import { Skeleton } from "@mui/material";
import { URL } from "@prisma/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AllLinks = () => {
  const [links, setLinks] = useState<URL[] | undefined>(undefined);
  const [session, setSession] = useState<Session | null>(null);

  const linksFetch = useFetch({ loading: true });

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchLinks = async (userId: string) => {
      try {
        const res = await fetchAllLinks(userId);
        setLinks(res);
      } catch (error) {
        console.error(error);
      } finally {
        linksFetch.setLoading(false);
      }
    };
    if (session) {
      fetchLinks(session.user.id);
    }
  }, [session]);

  return (
    <>
      {linksFetch.loading ? (
        <div className="flex flex-col space-y-4">
          {[...Array(3)].map((item, idx) => {
            return (
              <Skeleton
                key={idx}
                variant="rectangular"
                height={156}
                width="100%"
                className="rounded-md flex flex-col space-y-2 w-full"
              >
                <div className="flex">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex flex-col space-y-2 flex-1">
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                  </div>
                </div>
              </Skeleton>
            );
          })}
        </div>
      ) : links!.length > 0 ? (
        <ModalProvider>
          <div className="flex flex-col space-y-4">
            {links?.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
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
