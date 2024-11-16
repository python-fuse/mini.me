import { Divider } from "@mui/material";
import LinksTitleRow from "./_components/LinksTitleRow";
import AllLinks from "./_components/AllLinks";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession();
  return (
    <div className="px-20 py-10 flex flex-col gap-y-2 overflow-y-scroll">
      {/* LinkPage Title row  */}
      <LinksTitleRow />

      <Divider />

      {/* All links Grid */}
      <AllLinks />
    </div>
  );
};
export default page;
