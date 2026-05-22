"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function StudentsClientTable({ initialStudents }: { initialStudents: any[] }) {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const filtered = initialStudents.filter(s => 
    s.phone.includes(search) || 
    (s.campus?.name?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <input 
          type="text" 
          placeholder="🔍 Search students by phone or campus..." 
          className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#222222] text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Campus</th>
              <th className="px-6 py-4 text-center">Total Rides</th>
              <th className="px-6 py-4">Joined At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((student) => (
              <tr key={student.id} className="hover:bg-[#222222]/50 transition-colors">
                <td className="px-6 py-4 text-white font-medium">{student.phone}</td>
                <td className="px-6 py-4">
                  {student.campus ? (
                    <span className="text-gray-300">{student.campus.name}</span>
                  ) : (
                    <span className="text-gray-600 italic">No Campus Set</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-bold">
                    {student._count.rides}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(student.created_at).toISOString().split('T')[0]}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/admin/rides?search=${student.phone}`}
                    className="text-xs text-blue-500 hover:text-blue-400 font-medium bg-blue-500/10 px-3 py-1.5 rounded transition-colors"
                  >
                    View Rides
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
