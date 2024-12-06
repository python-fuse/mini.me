import MyButton from "@/src/components/Button";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

const LinksTitleRow = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h2 className="text-black/80 font-bold text-2xl md:text-4xl">Links</h2>
      </div>

      <Link href="/dashboard/links/new">
        <MyButton className="font-semibold text-sm md:text-lg">
          <BiPlus size={20} />
          <p>Create link</p>
        </MyButton>
      </Link>
    </div>
  );
};
export default LinksTitleRow;
