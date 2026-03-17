const s = "currentColor";

export function IconMapOff({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11a.993.993 0 001.52 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7z" />
      <line x1="4" y1="4" x2="20" y2="20" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function IconPhoneCall({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      <path d="M14.05 2a9 9 0 018 7.94M14.05 6A5 5 0 0118 10" />
    </svg>
  );
}

export function IconAlertTriangle({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function IconRouteOff({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M12 19h4.5a3.5 3.5 0 000-7h-8a3.5 3.5 0 010-7H12" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

export function IconMessageCircle({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

export function IconBroadcast({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 010 8.49M7.76 16.24a6 6 0 010-8.49" />
      <path d="M19.07 4.93a10 10 0 010 14.14M4.93 19.07a10 10 0 010-14.14" />
    </svg>
  );
}

export function IconTrendingDown({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

export function IconAward({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

export function IconShield({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export function IconCar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17l-1 2m15-2l1 2" />
      <circle cx="7.5" cy="14" r="1.5" />
      <circle cx="16.5" cy="14" r="1.5" />
    </svg>
  );
}

export function IconBuilding({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  );
}

export function IconWhatsapp({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      <path d="M9 10a1 1 0 011-1h0a1 1 0 011 1v1a1 1 0 01-1 1h0a4 4 0 003 3h0a1 1 0 011-1h1a1 1 0 011 1h0a1 1 0 01-1 1c-3.87 0-7-3.13-7-7a1 1 0 011-1z" />
    </svg>
  );
}

export function IconScale({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21" />
      <polyline points="1 14 5 10 9 14" />
      <polyline points="15 14 19 10 23 14" />
      <line x1="5" y1="10" x2="12" y2="3" />
      <line x1="19" y1="10" x2="12" y2="3" />
      <path d="M1 14a3 3 0 004 2.83A3 3 0 009 14M15 14a3 3 0 004 2.83 3 3 0 004-2.83" />
    </svg>
  );
}

export function IconHandshake({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0A5.4 5.4 0 003.58 12L12 20.42 20.42 12a5.4 5.4 0 000-7.42z" />
    </svg>
  );
}

export function IconBanknote({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M2 10h2M20 10h2M2 14h2M20 14h2" />
    </svg>
  );
}

export function IconTarget({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconCheckCircle({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function IconXCircle({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
