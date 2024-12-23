'use client';

import ActionButton from '@/src/components/ActionButton';
import MyButton from '@/src/components/Button';
import CopyButton from '@/src/components/CopyButton';
import ShareModal from '@/src/components/modals/ShareModal';
import ShareButton from '@/src/components/ShareButton';
import { useModal } from '@/src/contexts/ModalContext';
import { deleteURL } from '@/src/data/linkQueries';
import { getFaviconUrl } from '@/src/utils/newLinkUtils';
import { Divider } from '@mui/material';
import { URL } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiBarChart, BiCalendar, BiChevronLeft } from 'react-icons/bi';
import { FaPen, FaTrash } from 'react-icons/fa';
import Engagements from './Engagements';
import Locations from './Locations';

interface LinkDetailProps {
  link: URL;
}

const LinkDetail: React.FC<LinkDetailProps> = ({ link }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  return (
    <div className="px-20 py-10 flex flex-col gap-y-4 ">
      <ShareModal link={link} isOpen={isModalOpen} onClose={closeModal} />
      {/* Back */}
      <div
        className="flex space-x-2 items-center hover:underline cursor-pointer"
        onClick={() => router.push('/dashboard/links')}
      >
        <BiChevronLeft size={18} />
        Back
      </div>

      {/* Link detail card */}
      <div className="flex flex-col rounded-md p-6 gap-y-2 bg-white">
        {/* Title + actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black/80">{link.title}</h2>

          <div className="w-1/4 h-10 flex justify-end space-x-2">
            <CopyButton data={link.short_url} />

            <ShareButton openModal={openModal} />
            <ActionButton
              onClick={() => router.push(`/dashboard/links/edit/${link.id}`)}
            >
              <FaPen size={16} />
            </ActionButton>
            <ActionButton
              onClick={async () => {
                if (confirm('Are you sure you want to delete this link?')) {
                  try {
                    await deleteURL(link.id);
                    router.back();
                  } catch (e) {
                    console.error('Error deleting link:', e);
                  }
                }
              }}
            >
              <FaTrash size={16} />
            </ActionButton>
          </div>
        </div>

        {/* FAvicon + links */}
        <div className="flex gap-x-4">
          {/* favicon */}
          <div className="h-14 grid place-content-center overflow-hidden shrink-0 w-14 rounded-full border border-accent-400">
            <img
              src={getFaviconUrl(link.original_url) || ''}
              alt={link.title[0].toUpperCase()}
              className="bg-cover h-full w-full bg-center"
            />
          </div>

          {/* links */}
          <div className="flex flex-col space-y-2">
            <Link
              className="text-sm hover:underline text-accent-300 font-semibold  truncate"
              href={link.short_url}
              target="_blank"
              rel=" noopener "
            >
              {link.short_url.replace('http://', '')}
            </Link>

            <Link
              className="text-sm  truncate hover:underline"
              href={link.original_url}
              target="_blank"
              rel=" noopener "
            >
              {link.original_url}
            </Link>
          </div>
        </div>

        <Divider />

        {/* Clicks + Date-complete*/}
        <div className="flex gap-x-6 mt-3 items-center">
          <div className="flex gap-x-1 text-sm" title="Clicks">
            <BiBarChart className="" size={20} />
            {link.clicks}
          </div>

          <div className="flex gap-x-1 text-sm" title="Date created">
            <BiCalendar className="" size={20} />
            {format(new Date(link.createdAt), 'iii MMMM dd, yyyy HH:mm a')}
          </div>
        </div>
      </div>

      {/* Link QR card */}
      <div className="flex flex-col rounded-md p-6 gap-y-2 bg-white">
        <h2 className="text-lg font-bold text-black/80">QR Code</h2>

        <div className="rounded-lg overflow-hidden border-primary border w-max">
          <Image height={200} width={200} src={link.qrCode!} alt={'QR'} />
        </div>
      </div>

      {/* Clicks vs date */}
      <div className="flex flex-col rounded-md p-6 gap-y-2 bg-white">
        <Engagements id={link.id} />
      </div>

      <div className="flex flex-col rounded-md p-6 gap-y-2 bg-white">
        <Locations id={link.id} />
      </div>
    </div>
  );
};
export default LinkDetail;
