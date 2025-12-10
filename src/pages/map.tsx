import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import { MapPin, Navigation, Compass, Target, Clock, Users, Camera, Route } from 'lucide-react'

export default function MapPage() {
  const { language = 'en' } = useLanguage?.() || {}
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            {language === 'ar' ? 'جاري تحميل الخريطة...' : 'Loading Map...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-white">
      {/* For Mobile: Full width with shadow */}
      {/* For Desktop: Centered with max-width */}
      <div className="w-full min-h-screen bg-white md:max-w-2xl md:mx-auto md:shadow-xl md:rounded-b-2xl md:my-4 relative overflow-hidden">
        <Header />
        
        <main className="pb-24 pt-6 px-4 md:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl mr-3">
                  <MapPin className="text-white" size={24} />
                </div>
                {language === 'ar' ? '🗺️ خريطة العناوين' : '🗺️ Address Map'}
              </h1>
            </div>
            <p className="text-gray-600 text-base md:text-lg">
              {language === 'ar' 
                ? 'حفظ وتذكر العناوين المهمة مع نظام خرائط ذكي' 
                : 'Save and remember important addresses with smart mapping system'}
            </p>
          </div>

          {/* Coming Soon Card - Enhanced Design */}
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-2xl overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {language === 'ar' ? '🚀 قريباً جداً!' : '🚀 Coming Soon!'}
                  </h2>
                  <p className="text-blue-100 mb-4 text-base md:text-lg">
                    {language === 'ar' 
                      ? 'نعمل على نظام خرائط متطور لتسهيل توصيلاتك وحفظ عناوينك المفضلة' 
                      : 'We are building an advanced mapping system to simplify your deliveries and save favorite addresses'}
                  </p>
                </div>
                
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-cyan-400 to-blue-300 rounded-full flex items-center justify-center mx-auto md:mx-0 shadow-lg">
                  <Navigation size={36} className="text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { icon: Target, title: language === 'ar' ? 'حفظ العناوين' : 'Save Addresses', desc: language === 'ar' ? 'مفضلة ومتكررة' : 'Favorite & frequent' },
                  { icon: MapPin, title: language === 'ar' ? 'تحديد المواقع' : 'Pin Locations', desc: language === 'ar' ? 'علامات جغرافية' : 'Geo-markers' },
                  { icon: Camera, title: language === 'ar' ? 'إضافة صور' : 'Add Photos', desc: language === 'ar' ? 'ذكريات موقعية' : 'Location memories' },
                  { icon: Route, title: language === 'ar' ? 'تتبع المسار' : 'Track Routes', desc: language === 'ar' ? 'تحسين المسارات' : 'Route optimization' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors duration-300"
                  >
                    <div className="text-white mb-2 flex justify-center">
                      <item.icon size={20} />
                    </div>
                    <p className="text-sm font-semibold text-white text-center mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-blue-200 text-center">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  {language === 'ar' ? '🔔 إشعارني عند التحديث' : '🔔 Notify me on update'}
                </button>
                <button className="flex-1 bg-transparent border-2 border-white/50 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                  {language === 'ar' ? '📋 عرض المزيد' : '📋 View Details'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section - Responsive Grid */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {language === 'ar' ? '📊 إحصائيات الخريطة' : '📊 Map Statistics'}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { 
                  value: '0', 
                  label: language === 'ar' ? 'عنوان محفوظ' : 'Saved Addresses',
                  icon: MapPin,
                  color: 'from-blue-500 to-blue-600'
                },
                { 
                  value: '0', 
                  label: language === 'ar' ? 'مناطق نشطة' : 'Active Areas',
                  icon: Target,
                  color: 'from-emerald-500 to-green-600'
                },
                { 
                  value: '0', 
                  label: language === 'ar' ? 'صور محفوظة' : 'Saved Photos',
                  icon: Camera,
                  color: 'from-purple-500 to-pink-600'
                },
                { 
                  value: '0', 
                  label: language === 'ar' ? 'مسارات' : 'Routes',
                  icon: Route,
                  color: 'from-amber-500 to-orange-600'
                }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}>
                      <stat.icon size={18} className="text-white" />
                    </div>
                    <span className="text-xs text-gray-500">
                      {language === 'ar' ? 'مؤقت' : 'Temp'}
                    </span>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Compass size={32} className="text-gray-500" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'ar' ? '🎯 جاهز للمستقبل' : '🎯 Future Ready'}
            </h3>
            
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {language === 'ar' 
                ? 'احصل على أولوية الوصول عندما نطلق هذه الميزة. كن من أوائل من يجربون خرائط زمام الذكية.' 
                : 'Get priority access when we launch this feature. Be among the first to try Zimam Smart Maps.'}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {language === 'ar' ? 'خرائط تفاعلية' : 'Interactive Maps'}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {language === 'ar' ? 'حفظ تلقائي' : 'Auto-save'}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {language === 'ar' ? 'تحليل مسارات' : 'Route Analytics'}
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                {language === 'ar' ? 'ملاحقة ذكية' : 'Smart Navigation'}
              </span>
            </div>
          </div>
        </main>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:relative md:border-t">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}