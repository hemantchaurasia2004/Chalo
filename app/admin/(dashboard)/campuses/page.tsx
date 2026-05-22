import prisma from "@/lib/prisma";
import { Suspense } from "react";
import CampusClientTable from "./CampusClientTable";

export const dynamic = "force-dynamic";

export default async function CampusesPage() {
  let campuses: any[] = [];
  try {
    campuses = await prisma.campus.findMany({
      orderBy: { created_at: "desc" },
      include: {
        _count: {
          select: { students: true }
        }
      },
    });
  } catch (e) {
    console.error("Campuses fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Campus Management</h1>
        <p className="text-gray-400">Add new university campuses and monitor their activity.</p>
      </div>

      <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <CampusClientTable initialCampuses={campuses} />
      </Suspense>
    </div>
  );
}
