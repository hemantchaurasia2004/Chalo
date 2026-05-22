"use client";

import { useState } from "react";

const HELP_DATA = [
  {
    category: "💰 Financials & Fees",
    items: [
      {
        q: "The Advance Fee vs. Platform Fee logic",
        a: "**WHY:** To prevent spam (Advance) and generate revenue (Platform Fee).\n\n**HOW:** \n1. Student pays Advance % to Chalo via WhatsApp link.\n2. After ride, Student pays balance to Driver via Cash/UPI.\n3. System automatically deducts Platform Fee from Driver's wallet.\n\n**WHAT:** The platform is always protected. Even if a student pays the driver cash, Chalo has already collected the advance to cover its commission.\n\n**💡 ADMIN ACTION:** You can adjust these % in 'System Settings' based on fuel prices or demand."
      },
      {
        q: "Settling Driver Payouts",
        a: "**WHY:** To transfer digital earnings from the Chalo platform to the driver's bank account.\n\n**HOW:** Go to the 'Payouts' page, select 'Pending' drivers, and click 'Mark as Settled' after making the bank transfer.\n\n**WHAT:** This resets the driver's 'Unsettled' balance to zero and creates a permanent payment record.\n\n**💡 ADMIN ACTION:** Always verify the Driver's UPI ID/Bank details in their profile before clicking Settle."
      }
    ]
  },
  {
    category: "🚕 Ride Lifecycle & Safety",
    items: [
      {
        q: "The OTP Completion Flow",
        a: "**WHY:** To ensure the driver cannot falsely claim a ride is finished without dropping the student.\n\n**HOW:** Student provides the 4-digit OTP at the end of the trip. Driver sends `DONE <otp>` to the WhatsApp Bot.\n\n**WHAT:** A correct OTP instantly moves the ride to 'COMPLETED' and triggers financial ledger entries.\n\n**💡 ADMIN ACTION:** If a driver loses internet, they may call you. Use 'Force Complete' in the Disputes center only after calling the student to verify."
      },
      {
        q: "Automated Dispute Detection",
        a: "**WHY:** To catch 'stale' rides where someone forgot to complete the trip.\n\n**HOW:** Any 'Confirmed' ride older than 2 hours is automatically flagged as 'DISPUTED'.\n\n**WHAT:** The ride is paused, and both student/driver are notified that the ride is under review.\n\n**💡 ADMIN ACTION:** Check the 'Disputes' page daily. Resolve these quickly to keep driver wallets accurate."
      }
    ]
  },
  {
    category: "🆔 Driver Compliance",
    items: [
      {
        q: "KYC & Aadhaar Verification",
        a: "**WHY:** Regulatory compliance and passenger safety.\n\n**HOW:** Drivers upload photos. You verify the 12-digit number against the image.\n\n**WHAT:** Approved drivers gain access to the Bidding pool. Rejected drivers are blocked from seeing any rides.\n\n**💡 ADMIN ACTION:** Look for clear photos. If the Aadhaar is blurry, reject it with the note 'Image not clear'."
      },
      {
        q: "Blocking & Unblocking Drivers",
        a: "**WHY:** To punish bad behavior (e.g., misbehavior or frequent cancellations).\n\n**HOW:** Use the 'Status' toggle in the Driver Profile.\n\n**WHAT:** A blocked driver can still log in but will receive zero ride notifications and cannot bid.\n\n**💡 ADMIN ACTION:** Check 'Audit Logs' if you need to see why a driver was previously blocked by another admin."
      }
    ]
  },
  {
    category: "📜 Cancellation Policies",
    items: [
      {
        q: "Student Cancellations",
        a: "**WHY:** To handle changes in plans while protecting the driver's time.\n\n**HOW:** If a student cancels before a driver is assigned, it's free. If they cancel after confirmation, they lose their Advance Fee.\n\n**WHAT:** The system automatically notifies the driver and frees them up for the next bid.\n\n**💡 ADMIN ACTION:** If a student claims a technical glitch caused a cancellation, you can manually refund them from the Payment Debugger."
      },
      {
        q: "Driver Cancellations",
        a: "**WHY:** To handle driver emergencies while protecting the student's trip.\n\n**HOW:** The system automatically tries to assign the 'Next Best Bidder' if the original driver cancels.\n\n**WHAT:** If a replacement is found, the student pays the new advance. If not, the student is fully refunded.\n\n**💡 ADMIN ACTION:** Drivers with a cancellation rate > 20% should be warned or temporarily blocked."
      }
    ]
  },
  {
    category: "⚙️ Technical Debugging",
    items: [
      {
        q: "Reading the Webhook Debugger",
        a: "**WHY:** To find out why a payment failed or a message wasn't delivered.\n\n**HOW:** Each incoming 'event' from WhatsApp/Razorpay is listed with its raw JSON payload.\n\n**WHAT:** You can see error codes directly from Meta (e.g., 'user blocked bot').\n\n**💡 ADMIN ACTION:** If a student says 'I paid but no OTP,' find their phone number in the Webhooks list to see if the payment gateway sent a 'Success' signal."
      }
    ]
  }
];

export default function HelpContent() {
  const [search, setSearch] = useState("");

  const filteredData = HELP_DATA.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.q.toLowerCase().includes(search.toLowerCase()) || 
      item.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="relative">
        <input 
          type="text" 
          placeholder="🔍 Search help topics (e.g. 'fees', 'otp', 'security')..."
          className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl px-6 py-4 text-white text-lg outline-none focus:border-yellow-500 shadow-2xl transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-12">
        {filteredData.map((category, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-xl font-bold text-yellow-500 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-yellow-500 rounded-full" />
              {category.category}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {category.items.map((item, iIdx) => (
                <div key={iIdx} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-3">{item.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No results found for "{search}"</p>
            <button 
              onClick={() => setSearch("")}
              className="text-yellow-500 mt-2 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      <div className="mt-20 p-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
        <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Need more technical help?
        </h3>
        <p className="text-sm text-gray-400">
          If you have a query not covered here, check the <strong>Webhook Debugger</strong> for raw logs or the <strong>Audit Logs</strong> to see recent changes. For platform-wide crashes, contact the development team at dev@chalo.app.
        </p>
      </div>
    </div>
  );
}
