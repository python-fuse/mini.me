"use client";

import Spinner from "@/src/components/Spinner";
import { fetchLink } from "@/src/data/linkQueries";
import useFetch from "@/src/hooks/useFetch";
import { URL as TURL } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { urlID } = useParams();
  const [linkData, setLinkData] = useState<TURL | null>();
  const linkFetch = useFetch({ loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLink(urlID as string);
        setLinkData(data);
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
      {linkFetch.loading && <Spinner />}
      {linkData && (
        <div>
          <h1>{linkData.title}</h1>
          <p>{linkData.original_url}</p>
        </div>
      )}
    </>
  );
};
export default page;
