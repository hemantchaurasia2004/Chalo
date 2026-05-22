import HelpContent from "./HelpContent";

export const metadata = {
  title: "Help & Documentation | Chalo Admin",
};

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Help & Documentation</h1>
        <p className="text-gray-400">Everything you need to know about how Chalo works.</p>
      </div>
      
      <HelpContent />
    </div>
  );
}
