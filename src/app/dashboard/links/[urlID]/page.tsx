"use client";

import Spinner from "@/src/components/Spinner";
import { fetchLink } from "@/src/data/linkQueries";
import useFetch from "@/src/hooks/useFetch";
import { URL as TURL } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LinkDetail from "./_components/LinkDetail";
import { ModalProvider } from "@/src/contexts/ModalContext";

const Page = () => {
  const { urlID } = useParams();
  const [linkData, setLinkData] = useState<TURL | null>();
  const linkFetch = useFetch({ loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLink(urlID as string);
        setLinkData(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      } finally {
        linkFetch.setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {linkFetch.loading && (
        <div className="flex items-center place-content-center h-full">
          <Spinner />
        </div>
      )}
      {linkData ? (
        <ModalProvider>
          {" "}
          <LinkDetail link={linkData} />
        </ModalProvider>
      ) : (
        !linkFetch.loading && <p>Something went wrong</p>
      )}
    </>
  );
};
export default Page;
