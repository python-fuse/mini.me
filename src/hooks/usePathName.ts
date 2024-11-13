import { usePathname } from "next/navigation";

const usePath = () => {
  const pathName = usePathname();

  const segments = pathName.split("/").filter((segment) => segment !== "");

  if (segments.length === 1) return segments[0];

  return segments[segments.length - 1];
};
export default usePath;
