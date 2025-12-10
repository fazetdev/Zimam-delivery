import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbookSummary } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard from '@/components/DeliveryCard'
import { Package, Clock, Star, ChevronRight, MapPin, Users, CheckCircle, TrendingUp, Zap, Target, Trophy, Award, Compass, Sparkles } from 'lucide-react'

// Added types to fix Vercel TypeScript error
type StatCardData = {
  title: string
  value: string
  icon: React.ComponentType<any>
  color: string
  gradient: string
}

type DashboardStatCardProps = {
  stat: StatCardData
  language: string
}

// Enhanced Dashboard Stat Card
const DashboardStatCard = ({ stat, language }: DashboardStatCardProps) => {
  const Icon = stat.icon
  return (
    <div className="group relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]">
      {/* Premium Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

      {/* Animated Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500 group-hover:duration-200`}></div>

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl ${stat.color} bg-gradient-to-br ${stat.gradient} shadow-lg transform transition-transform group-hover:scale-110`}>
            <Icon size={24} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {stat.title}
          </span>
        </div>
        <p className="text-4xl font-black text-gray-900 tracking-tight mb-2">{stat.value}</p>
        <div className="flex items-center">
          <div className="flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-xs font-bold">
            <Target size={12} className="mr-1" />
            <span>{language === 'ar' ? '+12% هذا الشهر' : '+12% this month'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { language } = useLanguage()
  const { todayDeliveries, todayEarnings } = useLogbookSummary()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-500 border-l-transparent rounded-full animate-spin mx-auto animation-delay-1000"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            {language === 'ar' ? 'تحميل زمام دليفري...' : 'Loading Zimam Delivery...'}
          </p>
        </div>
      </div>
    )
  }

  const todaysStats = [
    {
      title: language === 'ar' ? 'طلبات اليوم' : "Today's Deliveries",
      value: todayDeliveries.length.toString(),
      icon: Package,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-400',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      title: language === 'ar' ? 'أرباح اليوم' : "Today's Earnings",
      value: `AED ${todayEarnings.toLocaleString()}`,
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-emerald-500 to-green-400',
      gradient: 'from-emerald-500 to-green-400'
    },
    {
      title: language === 'ar' ? 'تقييم النجوم' : 'Star Rating',
      value: '4.8',
      icon: Star,
      color: 'bg-gradient-to-br from-amber-500 to-yellow-400',
      gradient: 'from-amber-500 to-yellow-400'
    },
    {
      title: language === 'ar' ? 'سرعة التوصيل' : 'Delivery Speed',
      value: '32m',
      icon: Zap,
      color: 'bg-gradient-to-br from-purple-500 to-pink-400',
      gradient: 'from-purple-500 to-pink-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Header />

        <main className="pb-24 px-4 pt-6 md:pt-8">
          {/* Dashboard grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {todaysStats.map((stat) => (
                  <DashboardStatCard key={stat.title} stat={stat} language={language} />
                ))}
              </div>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
