import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import { FaFacebook, FaTimes, FaWhatsapp } from "react-icons/fa";
import ShareGateway from "../ShareGateway";
import { URL } from "@prisma/client";
import { BiEnvelope, BiLogoTwitter } from "react-icons/bi";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: URL;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, link }) => {
  const encodedUrl = encodeURIComponent(link.short_url);
  const encodedTitle = encodeURIComponent(
    "Check out this link shortened with Minime"
  );

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%20${encodedUrl}`,
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-md w-[40%] p-6 flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Share your Minime link</h2>
            <IconButton onClick={onClose}>
              <FaTimes size={20} />
            </IconButton>
          </div>

          <div className="flex justify-between">
            <ShareGateway
              title="Whatsapp"
              icon={<FaWhatsapp size={50} className="text-green-500" />}
              url={shareLinks.whatsapp}
            />
            <ShareGateway
              title="Facebook"
              icon={<FaFacebook size={50} className="text-blue-500" />}
              url={shareLinks.facebook}
            />
            <ShareGateway
              title="Twitter"
              icon={<BiLogoTwitter size={50} className="text-blue-400" />}
              url={shareLinks.twitter}
            />
            <ShareGateway
              title="Email"
              icon={<BiEnvelope size={50} className="text-gray-500" />}
              url={shareLinks.email}
            />
          </div>

          <div className="flex justify-between rounded-md border-2 border-black px-2 py-1 overflow-hidden">
            <input
              type="text"
              value={link.short_url}
              className="w-full p-2"
              readOnly
            />
            <button
              className="bg-tertiary px-2 rounded-md"
              onClick={() => {
                navigator.clipboard.writeText(link.short_url);
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ShareModal;
