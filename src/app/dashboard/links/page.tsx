"use client";

import MyButton from "@/src/components/Button";
import LinkCard from "@/src/components/LinkCard";
import { ModalProvider } from "@/src/contexts/ModalContext";
import { FakeLinks } from "@/src/utils/constants";
import { Divider } from "@mui/material";
import { BiPlus } from "react-icons/bi";

const page = () => {
  return (
    <div className="px-20 py-10 flex flex-col gap-y-2 overflow-y-scroll">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-black/80 font-bold text-4xl">Links</h2>
        </div>

        <MyButton className="font-semibold">
          <BiPlus size={20} />
          <p>Create link</p>
        </MyButton>
      </div>

      <Divider />

      <ModalProvider>
        <div className="flex flex-col space-y-4">
          {FakeLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      </ModalProvider>
    </div>
  );
};
export default page;
