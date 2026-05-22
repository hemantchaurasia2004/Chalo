import prisma from "@/lib/prisma";
import AuctionList from "./AuctionList";
import AutoRefresh from "../AutoRefresh";

export const dynamic = "force-dynamic";

export default async function AuctionsPage() {
  let activeAuctions: any[] = [];
  
  try {
    const auctions = await prisma.ride.findMany({
      where: {
        status: "BIDDING",
      },
      include: {
        student: true,
        bids: {
          include: {
            driver: true
          },
          orderBy: {
            bid_price: 'asc'
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // CRITICAL: Serialize all Decimal fields (including nested ones) before passing to Client Component
    activeAuctions = auctions.map(ride => ({
      ...ride,
      price: ride.price ? ride.price.toNumber() : null,
      bids: ride.bids.map(bid => ({
        ...bid,
        bid_price: bid.bid_price.toNumber(),
        driver: {
          ...bid.driver,
          rating: bid.driver.rating ? bid.driver.rating.toNumber() : null
        }
      }))
    }));
  } catch (e) {
    console.error("Auction fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <AutoRefresh intervalMs={3000} />
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Live Auction Monitor</h1>
        <p className="text-gray-400">Watch real-time bidding activity on WhatsApp.</p>
      </div>

      <AuctionList initialAuctions={activeAuctions} />
    </div>
  );
}
