import Link from "next/link";
import { ArrowRight, ShieldCheck, FileKey, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-24 pb-32">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary-50 dark:from-primary-500/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
              Web3 Medical Infrastructure
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white leading-tight">
              Your Health Data, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Truly Decentralized.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Secure, unalterable Electronic Health Records accessible only by you and authorization-granted professionals. The future of telemedicine starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-primary-500/25"
              >
                Access Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-full font-medium transition-all shadow-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why MediChain?</h2>
            <p className="text-slate-600 dark:text-slate-400">Our platform ensures patient data sovereignty while providing healthcare practitioners with the tools they need to give care effectively.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6 text-primary-500" />}
              title="Immutable Records"
              description="Medical data hashed directly on-chain and stored securely via IPFS, ensuring absolute immutability and provenance."
            />
            <FeatureCard 
              icon={<FileKey className="w-6 h-6 text-primary-500" />}
              title="Patient Sovereignty"
              description="You hold the keys to your health data. Only grant access to specific doctors for specific times through smart contracts."
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-primary-500" />}
              title="Telemedicine Ready"
              description="Book remote appointments, process payments in crypto escrow, and securely share data all in one flow."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
