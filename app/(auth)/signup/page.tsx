import { AuthForm } from "@/components/AuthForm";
import { signup } from "@/app/login/actions";

export default function SignupPage() {
  return (
    <AuthForm
      mode="signup"
      action={signup}
      title="Create your account"
      submitLabel="Sign up"
      alternateHref="/login"
      alternateText="Already have an account?"
      alternateLinkLabel="Log in"
    />
  );
}
