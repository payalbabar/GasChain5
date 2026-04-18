"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Wallet, LogOut } from "lucide-react";
import { useStellar } from "@/context/StellarContext";

export default function Navbar() {
  const { address, isConnected, isConnecting, connect, disconnect } = useStellar();
  const pathname = usePathname();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Records", href: "/records" },
    { name: "Appointments", href: "/appointments" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500 rounded-lg">
            <Stethoscope className="w-6 h-6" />
          </div>
          <Link href="/" className="text-xl font-bold tracking-tight">
            MediChain
          </Link>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="hidden md:flex items-center gap-6 mr-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`transition-colors border-b-2 py-5 ${
                  pathname === link.href 
                    ? "border-primary-500 text-primary-600 dark:text-primary-400 font-semibold" 
                    : "border-transparent text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {isConnected && address ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs">{truncateAddress(address)}</span>
              </div>
              <button 
                onClick={disconnect}
                className="flex items-center justify-center p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                title="Disconnect Wallet"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={connect}
              disabled={isConnecting}
              className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm disabled:opacity-70"
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
