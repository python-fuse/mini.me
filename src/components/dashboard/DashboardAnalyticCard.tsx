import { BiLink } from 'react-icons/bi';

interface DashboardAnalyticCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const DashboardAnalyticCard: React.FC<DashboardAnalyticCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="flex flex-1 bg-white border border-tertiary-500 p-4 items-center gap-x-2">
      <div className="size-14 rounded-full bg-blue-100 p-2 grid place-content-center">
        {icon}
      </div>
      <div className="">
        <p className="text-4xl font-semibold">{value}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};
export default DashboardAnalyticCard;
