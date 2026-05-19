import { ConcertForm } from "@/components/ConcertForm";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";

export default function NewConcertPage() {
  return (
    <PageContainer>
      <div className="page-section">
        <PageHeader
          title="Add a concert"
          subtitle="Log a show you went to, what you spent, and how much fun you had."
        />
        <ConcertForm />
      </div>
    </PageContainer>
  );
}
