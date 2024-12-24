import { BiCopy } from "react-icons/bi";
import ActionButton from "./ActionButton";

const CopyButton = ({ data }: { data: string }) => {
  return (
    <ActionButton
      onClick={() => {
        navigator.clipboard.writeText(data);
      }}
    >
      <BiCopy size={16} />
      <p className="text-sm">Copy</p>
    </ActionButton>
  );
};
export default CopyButton;
