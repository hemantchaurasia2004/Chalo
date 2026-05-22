"use client";

import { useState } from "react";
import { createCampus, deleteCampus } from "../actions";

export default function CampusClientTable({ initialCampuses }: { initialCampuses: any[] }) {
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", code: "" });
  const [isPending, setIsPending] = useState(false);

  const filtered = initialCampuses.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    try {
      await createCampus(formData);
      setIsAdding(false);
      setFormData({ name: "", code: "" });
    } catch (e) {
      alert("Error adding campus.");
    }
    setIsPending(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure? This will not delete students but they will lose their campus link.")) return;
    setIsPending(true);
    await deleteCampus(id);
    setIsPending(false);
  }

  return (
    <div className="space-y-6">
      {/* Add Campus Modal-like form */}
      {isAdding ? (
        <div className="bg-[#1a1a1a] border border-yellow-500/30 rounded-xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Add New Campus</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Campus Name</label>
              <input 
                required 
                type="text" 
                placeholder="IIT Delhi"
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-yellow-500"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Unique Code</label>
              <input 
                required 
                type="text" 
                placeholder="IITD"
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-yellow-500 uppercase"
                value={formData.code}
                onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
              />
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button disabled={isPending} type="submit" className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all">
                {isPending ? "Creating..." : "Create Campus"}
              </button>
              <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <input 
            type="text" 
            placeholder="🔍 Search campuses..." 
            className="w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-2 text-white outline-none focus:border-yellow-500 transition-colors"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all shadow-lg shadow-yellow-500/20"
          >
            + New Campus
          </button>
        </div>
      )}

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#222] text-xs uppercase font-bold text-gray-500">
            <tr>
              <th className="px-6 py-4">Campus Name</th>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4 text-center">Total Students</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((campus) => (
              <tr key={campus.id} className="hover:bg-[#222]/50 transition-colors">
                <td className="px-6 py-4 text-white font-bold">{campus.name}</td>
                <td className="px-6 py-4 font-mono text-yellow-500/80">{campus.code}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-bold border border-gray-700">
                    {campus._count.students}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(campus.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(campus.id)}
                    className="text-xs text-red-500 hover:text-red-400 font-bold bg-red-500/10 px-3 py-1.5 rounded transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No campuses found. Click "+ New Campus" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
