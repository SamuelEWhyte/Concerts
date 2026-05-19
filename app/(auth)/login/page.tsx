import { AuthForm } from "@/components/AuthForm";
import { login } from "@/app/login/actions";
import { AlertBanner } from "@/components/AlertBanner";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {params.error && (
        <div className="mb-4">
          <AlertBanner
            message={decodeURIComponent(params.error.replace(/\+/g, " "))}
            variant="error"
            dismissible={false}
          />
        </div>
      )}
      <AuthForm
        mode="login"
        action={login}
        title="Welcome back"
        submitLabel="Log in"
        alternateHref="/signup"
        alternateText="Need an account?"
        alternateLinkLabel="Sign up"
      />
    </>
  );
}
