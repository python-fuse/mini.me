import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa";

type ProviderProps = {
  title: string;
  icon: ReactNode;
  url: string;
};

const ShareGateway: React.FC<ProviderProps> = ({ title, icon, url }) => {
  return (
    <div className="flex flex-col gap-y-2 items-center text-center">
      <a
        href={url}
        className="border rounded p-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon}
      </a>
      <p className="text-sm">{title}</p>
    </div>
  );
};
export default ShareGateway;
