import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { pickup, destination, base_price, estimated_km } = await req.json();
    
    // Normalize: Trim and Title Case
    const cleanPickup = pickup.trim().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    const cleanDestination = destination.trim().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

    const route = await prisma.routeMap.create({
      data: {
        pickup: cleanPickup,
        destination: cleanDestination,
        base_price: parseFloat(base_price),
        estimated_km: parseFloat(estimated_km),
        is_active: true
      }
    });

    return NextResponse.json(route);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
