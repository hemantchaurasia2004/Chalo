import prisma from "@/lib/prisma";
import { Suspense } from "react";
import WebhookClientTable from "./WebhookClientTable";

export const dynamic = "force-dynamic";

export default async function WebhooksPage() {
  let events: any[] = [];
  try {
    events = await prisma.webhookEvent.findMany({
      orderBy: { created_at: "desc" },
      take: 50,
    });
  } catch (e) {
    console.error("Webhook fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Webhook Debugger</h1>
        <p className="text-gray-400">Monitor and manually process incoming data from external integrations.</p>
      </div>

      <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <WebhookClientTable events={events} />
      </Suspense>
    </div>
  );
}
