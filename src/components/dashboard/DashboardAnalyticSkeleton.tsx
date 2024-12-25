import { Skeleton } from '@mui/material';

const DashboardAnalyticSkeleton = () => {
  return (
    <div className="flex w-full bg-white border border-tertiary-500 p-4 items-center gap-x-2">
      <div className="size-14 rounded-full bg-blue-100 p-2 grid place-content-center">
        <Skeleton variant="circular" width={32} height={32} />
      </div>
      <div className="">
        <Skeleton className="h-8 w-5"></Skeleton>
        <Skeleton className="h-5 w-14"></Skeleton>
      </div>
    </div>
  );
};
export default DashboardAnalyticSkeleton;
