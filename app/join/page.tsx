import OnboardingForm from "./OnboardingForm";

export const metadata = {
  title: "Drive with Chalo - Join Now",
  description: "Sign up to be a driver on the Chalo campus ride network.",
};

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight sm:text-5xl">
            Drive with <span className="text-[#25D366]">Chalo</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Join the campus ride network. Set your own schedule, earn on every trip, and help students get around safely.
          </p>
        </div>

        <OnboardingForm />
      </div>
    </main>
  );
}
