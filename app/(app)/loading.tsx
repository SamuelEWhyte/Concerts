import { PageContainer } from "@/components/PageContainer";

export default function DashboardLoading() {
  return (
    <PageContainer>
      <div className="page-section">
        <div className="space-y-2">
          <div className="skeleton h-9 w-48" />
          <div className="skeleton h-4 w-72 max-w-full" />
        </div>
        <div className="app-card">
          <div className="card-body p-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton h-24 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="skeleton min-h-[280px] w-full rounded-2xl lg:col-span-1" />
          <div className="skeleton min-h-[280px] w-full rounded-2xl lg:col-span-1" />
          <div className="skeleton min-h-[280px] w-full rounded-2xl lg:col-span-2 xl:col-span-1" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="skeleton h-48 w-full rounded-2xl" />
          <div className="skeleton h-48 w-full rounded-2xl" />
        </div>
      </div>
    </PageContainer>
  );
}
