import { URL } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import { BiBarChart, BiCalendar, BiCopy, BiShare } from "react-icons/bi";
import { format } from "date-fns";
import ActionButton from "@/src/components/ActionButton";
import { FiShare } from "react-icons/fi";
import { useModal } from "@/src/contexts/ModalContext";
import ShareModal from "@/src/components/modals/ShareModal";

interface LinkCardProps {
  link: URL;
}

const LinkCard: FC<LinkCardProps> = ({ link }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className="p-6 shadow-md rounded-md bg-white flex gap-x-2">
      <ShareModal link={link} isOpen={isModalOpen} onClose={closeModal} />

      <div className="w-3/4 flex space-x-4">
        <div className="h-10 grid place-content-center overflow-hidden shrink-0 w-10 rounded-full border border-accent-400">
          <img
            src={link.urlIcon ?? ""}
            alt={link.original_url}
            className="bg-cover h-10 w-10 bg-center"
          />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden gap-y-1 ">
          <h2 className="text-xl font-semibold truncate ">{link.title}</h2>
          <Link
            className="text-xs text-accent-300 font-semibold  truncate"
            href={link.short_url}
          >
            {link.short_url.replace("https://", "")}
          </Link>

          <Link className="text-sm  truncate" href={link.original_url}>
            {link.original_url}
          </Link>

          <div className="flex gap-x-2 mt-3 items-center  ">
            <div className="flex gap-x-1 text-sm" title="Clicks">
              <BiBarChart className="" size={20} />
              {link.clicks}
            </div>

            <div className="flex gap-x-1 text-sm" title="Clicks">
              <BiCalendar className="" size={20} />
              {format(new Date(link.createdAt), "MMM dd, yyyy")}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-10 flex space-x-2">
        <ActionButton
          onClick={() => {
            navigator.clipboard.writeText(link.short_url);
          }}
        >
          <BiCopy size={16} />
          <p className="text-sm">Copy</p>
        </ActionButton>

        <ActionButton
          onClick={() => {
            // Implement share functionality
            openModal();
          }}
        >
          <FiShare size={16} />
          <p className="text-sm">Share</p>
        </ActionButton>
      </div>
    </div>
  );
};
export default LinkCard;
