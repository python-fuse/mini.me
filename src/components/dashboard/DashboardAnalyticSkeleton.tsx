import { Skeleton } from '@mui/material';

const DashboardAnalyticSkeleton = () => {
  return (
    <div className="flex flex-1 animate-pulse bg-white border border-tertiary-500 p-4 items-center gap-x-2">
      <Skeleton
        className="size-14 aspect-square rounded-full bg-blue-100 p-2 grid place-content-center"
        variant="circular"
      ></Skeleton>
      <div className="flex flex-col gap-y-2">
        <Skeleton variant="text" className="h-5 w-10 font-semibold" />
        <Skeleton variant="text" className="w-14 h-4" />
      </div>
    </div>
  );
};
export default DashboardAnalyticSkeleton;
