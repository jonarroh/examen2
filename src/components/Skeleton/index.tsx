import { Skeleton } from "../ui/skeleton";

export const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} className="w-full h-64 bg-gray-200 rounded-lg" />
    ))}
  </div>
);
