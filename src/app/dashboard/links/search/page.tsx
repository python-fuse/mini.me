"use client";

import { searchUrl } from "@/src/app/actions";
import LinkCard from "@/src/components/LinkCard";
import Spinner from "@/src/components/Spinner";
import useFetch from "@/src/hooks/useFetch";
import { URL } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

const page = () => {
  const [results, setResults] = useState<{
    urls: URL[];
    total: number;
    hasMore: boolean;
  }>();
  const params = useSearchParams();
  const q = params.get("q");
  const router = useRouter();

  const searchFetch = useFetch({ loading: true });

  useEffect(() => {
    const search = async () => {
      try {
        const res: any = await searchUrl({ query: q as string });
        console.log(res);
        setResults(res);
      } catch (e) {
        console.error(e);
      } finally {
        searchFetch.setLoading(false);
      }
    };
    search();
  }, [q]);

  return (
    <div className="px-20 py-10 flex flex-col gap-y-4 overflow-y-scroll">
      <div
        className="flex space-x-2 items-center hover:underline cursor-pointer"
        onClick={() => router.push("/dashboard/links")}
      >
        <BiChevronLeft size={18} />
        Back
      </div>
      {searchFetch.loading ? (
        <div className="grid h-full w-full place-content-center">
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Search results for "{q}"</h1>
          <div className="flex flex-col gap-y-4">
            {results?.urls.map((url) => (
              <LinkCard key={url.id} link={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default page;
