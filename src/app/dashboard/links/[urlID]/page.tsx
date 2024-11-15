"use client";

import { useParams } from "next/navigation";

const page = () => {
  const { urlID } = useParams();
  return <div>{urlID}</div>;
};
export default page;
