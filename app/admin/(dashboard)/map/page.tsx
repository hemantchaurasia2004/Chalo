import prisma from "@/lib/prisma";
import MapClientManager from "./MapClientManager";

export const dynamic = "force-dynamic";

export default async function RouteMapPage() {
  const routes = await prisma.routeMap.findMany({
    orderBy: { ride_count: 'desc' }
  });

  const serializedRoutes = routes.map(r => ({
    ...r,
    base_price: r.base_price.toNumber(),
    estimated_km: r.estimated_km.toNumber(),
    actual_avg_price: r.actual_avg_price ? r.actual_avg_price.toNumber() : null,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Route Intelligence Map</h1>
        <p className="text-gray-400">Track learned market prices and route performance across your network.</p>
      </div>

      <MapClientManager initialRoutes={serializedRoutes} />
    </div>
  );
}
