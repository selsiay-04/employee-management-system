"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Direct access to the enterprise portal
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl"></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Initializing Portal...</p>
      </div>
    </div>
  );
}
