import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:ml-64 p-4 md:p-8">
        <div className="mb-8 mt-12 md:mt-0">
          <Skeleton className="h-8 w-96 mb-2" />
          <Skeleton className="h-4 w-[600px]" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
