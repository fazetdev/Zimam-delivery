'use client'

import { useLanguage } from '@/context/useLanguage'
import { Bell, MapPin } from 'lucide-react'

export default function Header() {
  const { language } = useLanguage()

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/90 backdrop-blur-xl border-b border-white/20 dark:border-gray-800 shadow-lg">
      <div className="w-full px-4 py-4 md:max-w-md md:mx-auto">
        <div className="flex items-center justify-between">

          {/* Logo + Title – Luxury Edition */}
          <div className="flex items-center gap-3">
            {/* Premium Gradient Logo */}
            <div className="relative">
              <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl flex items-center justify-center ring-4 ring-emerald-500/20">
                <span className="text-white text-2xl font-black tracking-tighter">Z</span>
              </div>
              {/* Subtle glow pulse ring */}
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/30 blur-xl animate-pulse"></div>
            </div>

            {/* Title + Location */}
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <h1 className="text-lg font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Zimam Delivery
              </h1>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                <MapPin size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium">
                  {language === 'ar' ? 'دبي • الإمارات' : 'Dubai • UAE'}
                </span>
              </div>
            </div>
          </div>

          {/* Notification Bell – Elite Style */}
          <button className="relative p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-inner hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200">
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" strokeWidth={2} />

            {/* Badge – Glowing Red */}
            <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] bg-gradient-to-br from-red-500 to-pink-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse ring-4 ring-red-500/30">
              3
            </span>

            {/* Optional: subtle ring pulse when new */}
            <span className="absolute inset-0 rounded-2xl ring-4 ring-red-500/20 animate-ping"></span>
          </button>

        </div>
      </div>

      {/* Optional: Bottom glass glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
    </header>
  )
}