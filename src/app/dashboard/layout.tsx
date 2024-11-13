import Header from "@/src/components/Header";
import SidebarWrapper from "@/src/components/SidebarWrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex">
      <SidebarWrapper />

      <div className="flex-1 w-5/6">
        <Header />
        {children}
      </div>
    </div>
  );
};
export default layout;
