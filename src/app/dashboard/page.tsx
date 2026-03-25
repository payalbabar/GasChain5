import { Activity, Calendar, FileText, UserPlus, FileCheck, Clock, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Patient Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your health records and appointments securely.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
            JD
          </div>
          <div className="pr-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">John Doe</p>
            <p className="text-xs text-slate-500 mt-1">0x1234...5678</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <StatCard 
          icon={<FileText className="w-5 h-5 text-blue-500" />}
          title="Total Records"
          value="12"
          trend="+2 this month"
          color="bg-blue-50 dark:bg-blue-500/10"
        />
        <StatCard 
          icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
          title="Active Permissions"
          value="3 Doctors"
          trend="Securely Managed"
          color="bg-emerald-50 dark:bg-emerald-500/10"
        />
        <StatCard 
          icon={<Calendar className="w-5 h-5 text-purple-500" />}
          title="Appointments"
          value="1 Upcoming"
          trend="Tomorrow, 10:00 AM"
          color="bg-purple-50 dark:bg-purple-500/10"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Records */}
          <section className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Medical Records</h2>
              <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              <RecordRow 
                title="Blood Test Results - Q1"
                date="Oct 24, 2026"
                type="Lab Report"
                doctor="Dr. Smith"
                status="Encrypted"
                icon={<Activity className="w-5 h-5" />}
              />
              <RecordRow 
                title="Annual Physical Examination"
                date="Sep 12, 2026"
                type="Clinical Note"
                doctor="Dr. Adams"
                status="Encrypted"
                icon={<FileCheck className="w-5 h-5" />}
              />
              <RecordRow 
                title="MRI Brain Scan"
                date="Jul 05, 2026"
                type="Imaging"
                doctor="Dr. Miller"
                status="Encrypted"
                icon={<FileText className="w-5 h-5" />}
              />
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              Upload New Record to IPFS
            </button>
          </section>
        </div>

        <div className="space-y-8">
          {/* Access Management Mini */}
          <section className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Access Management</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Dr. Sarah Smith</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> Expires in 3 days
                  </p>
                </div>
                <button className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                  Revoke
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Dr. Mike Adams</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Persistent
                  </p>
                </div>
                <button className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                  Revoke
                </button>
              </div>
            </div>
            <button className="w-full mt-4 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
              Grant New Access
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, color }: { icon: React.ReactNode, title: string, value: string, trend: string, color: string }) {
  return (
    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-500 mt-1">{trend}</p>
      </div>
    </div>
  );
}

function RecordRow({ title, date, type, doctor, status, icon }: { title: string, date: string, type: string, doctor: string, status: string, icon: React.ReactNode }) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all cursor-pointer">
      <div className="flex items-center gap-4 mb-3 sm:mb-0">
        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-950 group-hover:text-primary-600 dark:group-hover:text-primary-500 transition-colors shadow-sm">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>{type}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>{doctor}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pl-14 sm:pl-0">
        <span className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
          <ShieldCheck className="w-3 h-3" /> {status}
        </span>
      </div>
    </div>
  );
}
