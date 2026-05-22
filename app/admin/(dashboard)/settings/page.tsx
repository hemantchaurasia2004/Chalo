import prisma from "@/lib/prisma";
import Link from "next/link";
import SettingsClientForm from "./SettingsClientForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await prisma.systemSetting.findMany();
  
  // Convert settings array to an object for easier access
  const settingsObj = settings.reduce((acc: any, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-gray-400">Configure global parameters and platform-wide logic.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Financial Settings */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 shadow-xl h-fit">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            Financial Logistics
          </h3>
          <SettingsClientForm initialSettings={settingsObj} />
        </div>

        {/* Technical Tools */}
        <div className="space-y-6">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              Technical Tools
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <Link 
                href="/admin/audit"
                className="flex items-center justify-between p-4 bg-[#222] hover:bg-[#282828] border border-gray-700 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">System Audit Logs</p>
                    <p className="text-[10px] text-gray-500">Trace all administrative actions</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:text-white transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </Link>

              <Link 
                href="/admin/map"
                className="flex items-center justify-between p-4 bg-[#222] hover:bg-[#282828] border border-gray-700 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Route Intelligence Map</p>
                    <p className="text-[10px] text-gray-500">Manage pickup/drop points and learned rates</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:text-white transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </Link>

              <Link 
                href="/admin/webhooks"
                className="flex items-center justify-between p-4 bg-[#222] hover:bg-[#282828] border border-gray-700 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Webhook Debugger</p>
                    <p className="text-[10px] text-gray-500">Inspect raw WhatsApp/Payment events</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:text-white transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </Link>
            </div>
          </div>

          <div className="bg-[#1a1a1a]/50 border border-gray-800 rounded-xl p-8 border-dashed flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
            <p className="text-gray-500 text-xs italic">More modules like Campus Radius and Surge Multipliers coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
