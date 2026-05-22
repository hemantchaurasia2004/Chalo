"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RidesClientTable({ initialRides }: { initialRides: any[] }) {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  
  const [search, setSearch] = useState(urlSearch);
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const filtered = initialRides.filter(r => {
    const matchesSearch = 
      r.student.phone.includes(search) || 
      (r.driver?.phone || "").includes(search) ||
      (r.driver?.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      r.id.includes(search) ||
      r.destination.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = filterStatus === "ALL" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row gap-4">
        <input 
          type="text" 
          placeholder="🔍 Search rides by ID, phone, name, or destination..." 
          className="flex-1 bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select 
          className="bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="BIDDING">Bidding Live</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#222222] text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Driver</th>
              <th className="px-6 py-4">Location & Destination</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((ride) => (
              <tr key={ride.id} className="hover:bg-[#222222]/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                  <Link href={`/admin/rides/${ride.id}`} className="text-blue-500 hover:underline">
                    {ride.id.slice(0, 8)}
                  </Link>
                </td>
                <td className="px-6 py-4 text-white font-medium">{ride.student.phone}</td>
                <td className="px-6 py-4">
                  {ride.driver ? (
                     <div className="flex flex-col">
                       <span className="text-white">{ride.driver.name || "Unknown"}</span>
                       <span className="text-xs text-gray-500">{ride.driver.phone}</span>
                     </div>
                  ) : (
                    <span className="text-gray-600 italic">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">From: {ride.pickup || "Unknown"}</span>
                    <span className="text-sm font-medium text-white">To: {ride.destination}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider
                    ${ride.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : ''}
                    ${ride.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : ''}
                    ${ride.status === 'BIDDING' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 animate-pulse' : ''}
                    ${ride.status === 'ONGOING' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : ''}
                    ${ride.status === 'DRIVER_ASSIGNED' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : ''}
                    ${ride.status === 'NO_DRIVERS' || ride.status === 'EXPIRED' ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20' : ''}
                  `}>
                    {ride.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-white font-semibold">₹{ride.price?.toString() || '-'}</td>
                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap" suppressHydrationWarning>
                  {new Date(ride.created_at).getHours().toString().padStart(2, '0')}:
                  {new Date(ride.created_at).getMinutes().toString().padStart(2, '0')}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No rides match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
