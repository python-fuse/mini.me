import Link from "next/link";
import { BiHome } from "react-icons/bi";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  isExpanded: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  isActive,
  isExpanded,
  title,
}) => {
  return (
    <Link
      href={href}
      style={{
        backgroundColor: isActive ? "#d7e3fb" : "",
        color: isActive ? "#2563eb" : "",
        width: isExpanded ? "100%" : "40px",
        transitionDuration: "0.3s",
      }}
      className={`${
        isActive && "nav-item"
      } relative ease-in-out flex items-center h-10 duration-300 gap-x-2 rounded pl-2 bg-prim hover:bg-accent text-black/80 p-2`}
    >
      {icon}
      {isExpanded && <p className="text-nowrap">{title}</p>}
    </Link>
  );
};
export default NavItem;
