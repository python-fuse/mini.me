import { URL } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import { BiBarChart, BiCalendar, BiCopy, BiShare } from "react-icons/bi";
import { format } from "date-fns";
import ActionButton from "@/src/components/ActionButton";
import { FiShare } from "react-icons/fi";
import { useModal } from "@/src/contexts/ModalContext";
import ShareModal from "@/src/components/modals/ShareModal";
import { getFaviconUrl } from "../utils/newLinkUtils";

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
            src={getFaviconUrl(link.original_url)}
            alt={link.original_url}
            className="bg-cover h-10 w-10 bg-center"
          />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden gap-y-1 ">
          <Link href={`/dashboard/links/${link.id}  `}>
            <h2 className="text-xl font-semibold truncate hover:text-tertiary-400 duration-300 ">
              {link.title}
            </h2>
          </Link>
          <Link
            className="text-xs hover:underline text-accent-300 font-semibold  truncate"
            href={link.short_url}
            target="_blank"
            rel=" noopener "
          >
            {link.short_url.replace("http://", "")}
          </Link>

          <Link
            className="text-sm  truncate hover:underline"
            href={link.original_url}
            target="_blank"
            rel=" noopener "
          >
            {link.original_url}
          </Link>

          <div className="flex gap-x-2 mt-3 items-center  ">
            <div className="flex gap-x-1 text-sm" title="Clicks">
              <BiBarChart className="" size={20} />
              {link.clicks}
            </div>

            <div className="flex gap-x-1 text-sm" title="Date created">
              <BiCalendar className="" size={20} />
              {format(new Date(link.createdAt), "MMM dd, yyyy")}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-10 flex justify-end space-x-2">
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
