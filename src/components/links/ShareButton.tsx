import { FiShare } from "react-icons/fi";
import ActionButton from "./ActionButton";

const ShareButton = ({ openModal }: { openModal: () => void }) => {
  return (
    <ActionButton
      onClick={() => {
        // Implement share functionality
        openModal();
      }}
    >
      <FiShare size={16} />
      <p className="text-sm">Share</p>
    </ActionButton>
  );
};
export default ShareButton;
