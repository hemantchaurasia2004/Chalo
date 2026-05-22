import prisma from "@/lib/prisma";
import { Suspense } from "react";
import StudentsClientTable from "./StudentsClientTable";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  let students: any[] = [];
  try {
    students = await prisma.student.findMany({
      orderBy: { created_at: "desc" },
      include: {
        campus: true,
        _count: {
          select: { rides: true }
        }
      },
    });
  } catch (e) {
    console.error("Students fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Students Directory</h1>
        <p className="text-gray-400">View and manage all registered students across campuses.</p>
      </div>

      <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <StudentsClientTable initialStudents={students} />
      </Suspense>
    </div>
  );
}
