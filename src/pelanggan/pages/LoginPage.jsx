import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/LoginForm";
import SocialLogin from "../components/SocialLogin";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <LoginForm />
        <SocialLogin />
      </div>
    </AuthLayout>
  );
}