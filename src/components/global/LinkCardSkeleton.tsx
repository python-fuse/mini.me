import { Skeleton } from '@mui/material';

const LinkCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4">
      {[...Array(3)].map((item, idx) => {
        return (
          <Skeleton
            key={idx}
            variant="rectangular"
            height={156}
            width="100%"
            className="rounded-md flex flex-col space-y-2 w-full"
          >
            <div className="flex">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex flex-col space-y-2 flex-1">
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
              </div>
            </div>
          </Skeleton>
        );
      })}
    </div>
  );
};
export default LinkCardSkeleton;
