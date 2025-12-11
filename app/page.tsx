
import AuthPage from "./components/auth/AuthPage";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Auth Form */}
      <div className="w-full max-w-md">
        <AuthPage />
      </div>

    </div>
  );
}
