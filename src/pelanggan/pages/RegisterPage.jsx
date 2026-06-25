import AuthLayout from "../layouts/AuthLayout";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <RegisterForm />

      </div>

    </AuthLayout>
  );
}