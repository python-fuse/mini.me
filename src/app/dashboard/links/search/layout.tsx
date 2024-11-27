"use client";

import { ModalProvider } from "@/src/contexts/ModalContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <div className="">{children}</div>;
    </ModalProvider>
  );
};
export default layout;
