import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import { MapPin, Navigation, Compass, Target, Camera, Route } from 'lucide-react'

export default function MapPage() {
  const { language = 'en' } = useLanguage?.() || {}
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <p className="animate-pulse text-lg font-medium">
          {language === 'ar' ? 'جاري تحميل الخريطة...' : 'Loading Map...'}
        </p>
      </div>
    )
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto">
        <Header />

        <main className="px-4 pb-24 space-y-10">

          {/* Page Title */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-emerald-400">
              <MapPin size={24} className="text-emerald-400" />
              {language === 'ar' ? '🗺️ خريطة العناوين' : '🗺️ Address Map'}
            </h1>
            <p className="text-slate-400 mt-1">
              {language === 'ar'
                ? 'حفظ وتذكر العناوين المهمة مع نظام خرائط ذكي'
                : 'Save and remember important addresses with a smart mapping system'}
            </p>
          </div>

          {/* HERO SECTION */}
          <div className="relative">
            {/* Animated blobs */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-emerald-400/10 blur-3xl rounded-3xl"></div>

            {/* Card */}
            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 shadow-2xl hover:shadow-emerald-600/20 transition-all duration-300">

              {/* Title Row */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-emerald-300 drop-shadow-md">
                    {language === 'ar' ? '🚀 قريباً جداً!' : '🚀 Coming Soon!'}
                  </h2>
                  <p className="text-slate-400 mt-1 text-sm leading-relaxed">
                    {language === 'ar'
                      ? 'نعمل على نظام خرائط متطور لتسهيل توصيلاتك وحفظ عناوينك المفضلة'
                      : 'We are building an advanced mapping system to simplify your deliveries and save favorite addresses'}
                  </p>
                </div>
                <Navigation size={40} className="text-emerald-400 animate-pulse" />
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 mt-6 gap-4">
                {[
                  { icon: Target, title: language === 'ar' ? 'حفظ العناوين' : 'Save Addresses', desc: language === 'ar' ? 'مفضلة ومتكررة' : 'Favorite & frequent' },
                  { icon: MapPin, title: language === 'ar' ? 'تحديد المواقع' : 'Pin Locations', desc: language === 'ar' ? 'علامات جغرافية' : 'Geo-markers' },
                  { icon: Camera, title: language === 'ar' ? 'إضافة صور' : 'Add Photos', desc: language === 'ar' ? 'ذكريات موقعية' : 'Location memories' },
                  { icon: Route, title: language === 'ar' ? 'تتبع المسار' : 'Track Routes', desc: language === 'ar' ? 'تحسين المسارات' : 'Route optimization' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-xl p-3 flex flex-col items-start hover:scale-105 hover:border-emerald-400/40 transition-all duration-300"
                  >
                    <item.icon size={22} className="text-emerald-400 mb-1" />
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-slate-400 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 hover:scale-[1.03] transition-all duration-300 shadow-lg">
                  {language === 'ar' ? '🔔 إشعارني عند التحديث' : '🔔 Notify me on update'}
                </button>
                <button className="flex-1 py-3 rounded-xl border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/10 hover:scale-[1.03] transition-all duration-300">
                  {language === 'ar' ? '📋 عرض المزيد' : '📋 View Details'}
                </button>
              </div>
            </div>
          </div>

          {/* STATISTICS */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              {language === 'ar' ? '📊 إحصائيات الخريطة' : '📊 Map Statistics'}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '0', label: language === 'ar' ? 'عنوان محفوظ' : 'Saved Addresses', icon: MapPin },
                { value: '0', label: language === 'ar' ? 'مناطق نشطة' : 'Active Areas', icon: Target },
                { value: '0', label: language === 'ar' ? 'صور محفوظة' : 'Saved Photos', icon: Camera },
                { value: '0', label: language === 'ar' ? 'مسارات' : 'Routes', icon: Route }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 backdrop-blur hover:border-emerald-400/40 hover:scale-105 transition-all"
                >
                  <stat.icon size={20} className="text-emerald-400 mb-1" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FUTURE READY */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl text-center">
            <Compass size={36} className="mx-auto text-emerald-400 mb-2" />
            <h3 className="text-xl font-semibold text-white">
              {language === 'ar' ? '🎯 جاهز للمستقبل' : '🎯 Future Ready'}
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              {language === 'ar'
                ? 'احصل على أولوية الوصول عندما نطلق هذه الميزة. كن من أوائل من يجربون خرائط زمام الذكية.'
                : 'Get priority access when we launch this feature. Be among the first to try Zimam Smart Maps.'}
            </p>

            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {[
                language === 'ar' ? 'خرائط تفاعلية' : 'Interactive Maps',
                language === 'ar' ? 'حفظ تلقائي' : 'Auto-save',
                language === 'ar' ? 'تحليل مسارات' : 'Route Analytics',
                language === 'ar' ? 'ملاحقة ذكية' : 'Smart Navigation'
              ].map((chip, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 rounded-full text-xs"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 w-full">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
