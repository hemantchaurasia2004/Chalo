import prisma from "@/lib/prisma";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  let logs: any[] = [];
  try {
    logs = await prisma.auditLog.findMany({
      orderBy: { created_at: "desc" },
      take: 100,
    });
  } catch (e) {
    console.error("Audit fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Audit Logs</h1>
        <p className="text-gray-400">Review all administrative actions and security events.</p>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#222] text-xs uppercase font-bold text-gray-500">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Target Entity</th>
              <th className="px-6 py-4">Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#222]/50 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-gray-500" suppressHydrationWarning>
                  {new Date(log.created_at).toISOString().split('T')[0]} {new Date(log.created_at).getHours().toString().padStart(2, '0')}:{new Date(log.created_at).getMinutes().toString().padStart(2, '0')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{log.actor_type}</span>
                    {log.actor_id && <span className="text-[10px] font-mono text-gray-600">{log.actor_id.slice(0, 8)}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                    ${log.action.includes('APPROVE') ? 'bg-green-500/10 text-green-500' : ''}
                    ${log.action.includes('REJECT') ? 'bg-red-500/10 text-red-500' : ''}
                    ${log.action.includes('PROCESS') ? 'bg-blue-500/10 text-blue-500' : ''}
                    ${!log.action.includes('APPROVE') && !log.action.includes('REJECT') && !log.action.includes('PROCESS') ? 'bg-gray-800 text-gray-400' : ''}
                  `}>
                    {log.action.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-300 font-medium">{log.entity_type}</span>
                    {log.entity_id && <span className="text-[10px] font-mono text-gray-600">ID: {log.entity_id.slice(0, 8)}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate text-[10px] text-gray-500 font-mono bg-[#111] p-1.5 rounded border border-gray-800">
                    {JSON.stringify(log.metadata)}
                  </div>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                  No audit logs recorded yet. Actions like KYC approval will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
