"use client";

import { useState } from "react";
import { toggleWebhookProcessed } from "../actions";

export default function WebhookClientTable({ events }: { events: any[] }) {
  const [isPending, setIsPending] = useState(false);

  async function handleToggle(id: string, currentStatus: boolean) {
    setIsPending(true);
    try {
      await toggleWebhookProcessed(id, !currentStatus);
    } catch (e) {
      alert("Error updating webhook status.");
    }
    setIsPending(false);
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
      <table className="w-full text-left text-sm text-gray-400">
        <thead className="bg-[#222] text-xs uppercase font-bold text-gray-500">
          <tr>
            <th className="px-6 py-4">Source</th>
            <th className="px-6 py-4">External Event ID</th>
            <th className="px-6 py-4">Payload Preview</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-[#222]/50 transition-colors">
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase
                  ${event.source === 'WHATSAPP' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}
                `}>
                  {event.source}
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-gray-500">
                {event.external_event_id || 'N/A'}
              </td>
              <td className="px-6 py-4">
                <div className="max-w-[300px] truncate font-mono text-[10px] text-gray-400 bg-[#111] p-1.5 rounded border border-gray-800">
                  {JSON.stringify(event.payload)}
                </div>
              </td>
              <td className="px-6 py-4">
                {event.processed ? (
                  <div className="flex flex-col">
                    <span className="text-green-500 font-bold text-xs flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Processed
                    </span>
                    <span className="text-[10px] text-gray-600">{new Date(event.processed_at).toLocaleTimeString()}</span>
                  </div>
                ) : (
                  <span className="text-yellow-500/80 font-bold text-xs flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    Pending
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  disabled={isPending}
                  onClick={() => handleToggle(event.id, event.processed)}
                  className={`text-xs font-bold px-3 py-1.5 rounded transition-all
                    ${event.processed ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}
                  `}
                >
                  {event.processed ? 'Mark Unprocessed' : 'Mark Processed'}
                </button>
              </td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                No webhook events found in the database.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
