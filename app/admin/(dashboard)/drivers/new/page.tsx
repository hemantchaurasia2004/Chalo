import NewDriverForm from "./NewDriverForm";
import Link from "next/link";

export default function NewDriverPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col space-y-2">
        <Link href="/admin/drivers" className="text-blue-500 hover:text-blue-400 text-sm mb-2 inline-flex items-center">
          &larr; Back to Drivers
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">Add New Driver</h1>
        <p className="text-gray-400">Manually onboard a driver into the system.</p>
      </div>

      <NewDriverForm />
    </div>
  );
}
