import { PageEnter } from "./PageEnter";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <PageEnter>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8 lg:py-10">
        {children}
      </div>
    </PageEnter>
  );
}
