import { Skeleton } from '@mui/material';

const DashboardAnalyticSkeleton = () => {
  return (
    <Skeleton className="flex flex-1 bg-white border border-tertiary-500 p-4 items-center gap-x-2">
      <Skeleton className="size-14 rounded-full bg-blue-100 p-2 grid place-content-center"></Skeleton>
      <Skeleton className="">
        <Skeleton className="text-4xl font-semibold" />
        <Skeleton variant="text" className="w-4" />
      </Skeleton>
    </Skeleton>
  );
};
export default DashboardAnalyticSkeleton;
