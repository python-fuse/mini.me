import Header from "@/src/components/Header";
import SidebarWrapper from "@/src/components/SidebarWrapper";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SidebarWrapper />

      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
};
export default layout;
