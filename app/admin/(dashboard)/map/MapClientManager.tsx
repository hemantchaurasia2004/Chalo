"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MapClientManager({ initialRoutes }: { initialRoutes: any[] }) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    base_price: "50",
    estimated_km: "5",
  });
  const [editData, setEditData] = useState<any>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/routes", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsAdding(false);
        setFormData({ pickup: "", destination: "", base_price: "50", estimated_km: "5" });
        router.refresh();
      }
    } catch (err) {
      alert("Failed to add route");
    }
  }

  async function handleSaveEdit(id: string) {
    try {
      const res = await fetch(`/api/admin/routes/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          pickup: editData.pickup,
          destination: editData.destination,
          base_price: parseFloat(editData.base_price),
          estimated_km: parseFloat(editData.estimated_km)
        }),
      });
      if (res.ok) {
        setEditingId(null);
        router.refresh();
      }
    } catch (err) {
      alert("Save failed");
    }
  }

  async function toggleStatus(id: string, field: string, value: boolean) {
    try {
      await fetch(`/api/admin/routes/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: !value }),
      });
      router.refresh();
    } catch (err) {
      alert("Update failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this route? This will stop it from showing in the bot.")) return;
    try {
      await fetch(`/api/admin/routes/${id}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (err) {
      alert("Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20"
        >
          {isAdding ? "✕ Cancel" : "+ Add New Route"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-[#1a1a1a] border border-blue-900/50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end animate-in fade-in slide-in-from-top-4 duration-300">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Pickup Point</label>
            <input 
              required
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
              placeholder="e.g. Main Gate"
              value={formData.pickup}
              onChange={e => setFormData({...formData, pickup: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Destination</label>
            <input 
              required
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
              placeholder="e.g. Bihta Station"
              value={formData.destination}
              onChange={e => setFormData({...formData, destination: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Price (₹)</label>
              <input 
                type="number"
                required
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                value={formData.base_price}
                onChange={e => setFormData({...formData, base_price: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">KM</label>
              <input 
                type="number"
                step="0.1"
                required
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                value={formData.estimated_km}
                onChange={e => setFormData({...formData, estimated_km: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors">
            Create Route
          </button>
        </form>
      )}

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#222222] text-xs uppercase font-bold text-gray-500 tracking-wider">
              <tr>
                <th className="px-6 py-4">Route Path</th>
                <th className="px-6 py-4">Distance</th>
                <th className="px-6 py-4">Base Rate</th>
                <th className="px-6 py-4 text-blue-400">Learned Avg</th>
                <th className="px-6 py-4 text-center">Popular</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {initialRoutes.map((route) => (
                <tr key={route.id} className={`hover:bg-[#222222]/50 transition-all group ${!route.is_active ? 'opacity-50' : ''}`}>
                  {editingId === route.id ? (
                    <>
                      <td className="px-6 py-4 space-y-2">
                        <input 
                          className="w-full bg-[#333] border border-blue-500 rounded px-2 py-1 text-white text-xs"
                          value={editData.pickup}
                          onChange={e => setEditData({...editData, pickup: e.target.value})}
                        />
                        <input 
                          className="w-full bg-[#333] border border-blue-500 rounded px-2 py-1 text-white text-[10px]"
                          value={editData.destination}
                          onChange={e => setEditData({...editData, destination: e.target.value})}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="number"
                          className="w-20 bg-[#333] border border-blue-500 rounded px-2 py-1 text-white text-xs"
                          value={editData.estimated_km}
                          onChange={e => setEditData({...editData, estimated_km: e.target.value})}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="number"
                          className="w-20 bg-[#333] border border-blue-500 rounded px-2 py-1 text-white text-xs"
                          value={editData.base_price}
                          onChange={e => setEditData({...editData, base_price: e.target.value})}
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-600 italic text-xs">---</td>
                      <td className="px-6 py-4 text-center">---</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleSaveEdit(route.id)} className="text-green-500 hover:text-green-400 font-bold text-xs uppercase">Save</button>
                          <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-400 font-bold text-xs uppercase">Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white font-bold">{route.pickup}</span>
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-600 italic">
                            to {route.destination}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{route.estimated_km} km</td>
                      <td className="px-6 py-4 text-white font-medium">₹{route.base_price}</td>
                      <td className="px-6 py-4">
                        {route.actual_avg_price ? (
                          <span className="text-blue-400 font-bold">₹{Math.round(route.actual_avg_price)}</span>
                        ) : (
                          <span className="text-gray-600">---</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => toggleStatus(route.id, 'is_popular', route.is_popular)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${route.is_popular ? 'bg-yellow-500/20 text-yellow-500' : 'text-gray-700 hover:text-gray-500'}`}
                        >
                          ★
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => {
                              setEditingId(route.id);
                              setEditData({...route});
                            }}
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(route.id)}
                            className="text-gray-700 hover:text-red-500 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                          <button 
                            onClick={() => toggleStatus(route.id, 'is_active', route.is_active)}
                            className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${route.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                          >
                            {route.is_active ? 'Active' : 'Disabled'}
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
