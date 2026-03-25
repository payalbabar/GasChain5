"use client"

import { Calendar, Clock, Video, Wallet } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Telemedicine Appointments</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Book and manage secure smart-contract based consultations.</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          Book New Consultation
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Upcoming Consultations</h2>
        
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-primary-200 dark:border-primary-900/50 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500" />
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-500/10 flex flex-col items-center justify-center shrink-0 border border-primary-100 dark:border-primary-500/20 text-primary-600 dark:text-primary-400">
                <span className="text-xs font-bold uppercase tracking-wider">Oct</span>
                <span className="text-2xl font-extrabold leading-none mt-1">28</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Sarah Smith</h3>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">Confirmed</span>
                </div>
                <p className="text-slate-500 font-medium">Cardiology Follow-up</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> 10:00 AM - 10:30 AM
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" /> Escrow Locked: 0.05 ETH
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors w-full sm:w-auto">
                <Video className="w-5 h-5" />
                Join Call
              </button>
              <button className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto">
                Reschedule
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Past Consultations</h2>
        
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Dr. Mike Adams</h3>
              <p className="text-sm text-slate-500">General Practice • Sep 12, 2026</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            Completed (0.03 ETH Released)
          </span>
        </div>

      </div>
    </div>
  );
}
