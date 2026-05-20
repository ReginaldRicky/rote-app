import AuthLayout from "../layouts/AuthLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <ForgotPasswordForm />

      </div>

    </AuthLayout>
  );
}