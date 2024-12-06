import { Divider } from "@mui/material";
import LinksTitleRow from "./_components/LinksTitleRow";
import AllLinks from "./_components/AllLinks";

const page = async () => {
  return (
    <div className="px-4 md:px-20 py-4 md:py-10 flex flex-col gap-y-2 overflow-y-scroll">
      {/* LinkPage Title row  */}
      <LinksTitleRow />

      <Divider />

      {/* All links Grid */}
      <AllLinks />
    </div>
  );
};
export default page;
