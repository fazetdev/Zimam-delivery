import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import { Globe, Moon, Bell, Shield, Download, Trash2, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])
  if (!isClient) return null

  const toggleLanguage = () => setLanguage(language === 'ar' ? 'en' : 'ar')

  const settings = [
    {
      title: language === 'ar' ? 'اللغة' : 'Language',
      subtitle: language === 'ar' ? 'العربية / الإنجليزية' : 'Arabic / English',
      icon: Globe,
      action: toggleLanguage,
      value: language === 'ar' ? 'العربية' : 'English',
      toggle: false,
    },
    {
      title: language === 'ar' ? 'الوضع المظلم' : 'Dark Mode',
      subtitle: language === 'ar' ? 'مظهر داكن للمساء' : 'Dark appearance for night',
      icon: Moon,
      action: () => setDarkMode(!darkMode),
      value: darkMode ? (language === 'ar' ? 'مفعل' : 'On') : (language === 'ar' ? 'معطل' : 'Off'),
      toggle: true,
    },
    {
      title: language === 'ar' ? 'الإشعارات' : 'Notifications',
      subtitle: language === 'ar' ? 'تنبيهات الطلبات والتحديثات' : 'Order alerts and updates',
      icon: Bell,
      action: () => setNotifications(!notifications),
      value: notifications ? (language === 'ar' ? 'مفعل' : 'On') : (language === 'ar' ? 'معطل' : 'Off'),
      toggle: true,
    },
  ]

  const dataManagement = [
    {
      title: language === 'ar' ? 'تصدير البيانات' : 'Export Data',
      subtitle: language === 'ar' ? 'حفظ نسخة احتياطية' : 'Backup your data',
      icon: Download,
      color: 'bg-emerald-500/15 text-emerald-400',
    },
    {
      title: language === 'ar' ? 'مسح البيانات' : 'Clear Data',
      subtitle: language === 'ar' ? 'حذف جميع السجلات' : 'Delete all records',
      icon: Trash2,
      color: 'bg-red-500/15 text-red-400',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white">
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="pb-20 max-w-2xl mx-auto">
        <Header />

        <main className="px-5 py-6 space-y-10">
          {/* HEADER TEXT */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
              {language === 'ar' ? 'الإعدادات' : 'Settings'}
            </h1>
            <p className="text-gray-400 mt-1">
              {language === 'ar' ? 'تخصيص تطبيقك' : 'Customize your app'}
            </p>
          </div>

          {/* APP SETTINGS */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-emerald-400">
              {language === 'ar' ? 'إعدادات التطبيق' : 'App Settings'}
            </h2>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-4 divide-y divide-white/5 shadow-lg">
              {settings.map((setting, index) => {
                const Icon = setting.icon
                return (
                  <div key={setting.title} className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/40 shadow-inner">
                        <Icon size={22} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium">{setting.title}</p>
                        <p className="text-gray-400 text-sm">{setting.subtitle}</p>
                      </div>
                    </div>

                    {setting.toggle ? (
                      <button
                        onClick={setting.action}
                        className={`relative w-14 h-7 rounded-full transition bg-slate-600/40 shadow-inner 
                        ${setting.value === 'On' || setting.value === 'مفعل' ? 'bg-emerald-500' : ''}`}
                      >
                        <span
                          className={`absolute top-1 w-5 h-5 bg-white rounded-full transition 
                          ${setting.value === 'On' || setting.value === 'مفعل' ? 'right-1' : 'left-1'}`}
                        />
                      </button>
                    ) : (
                      <button
                        onClick={setting.action}
                        className="px-4 py-2 text-sm rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition"
                      >
                        {setting.value}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* DATA MANAGEMENT */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-emerald-400">
              {language === 'ar' ? 'إدارة البيانات' : 'Data Management'}
            </h2>

            <div className="grid grid-cols-2 gap-5">
              {dataManagement.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.title}
                    className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-5 text-center shadow-md hover:scale-105 transition"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${item.color}`}>
                      <Icon size={24} />
                    </div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.subtitle}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* SECURITY */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-emerald-400">
              {language === 'ar' ? 'الأمان والخصوصية' : 'Security & Privacy'}
            </h2>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-700/40 flex items-center justify-center">
                  <Shield size={22} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium">{language === 'ar' ? 'حماية البيانات' : 'Data Protection'}</p>
                  <p className="text-gray-400 text-sm">
                    {language === 'ar' ? 'بياناتك مخزنة محلياً فقط' : 'Your data is stored locally only'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-700/30 rounded-xl p-3">
                  <span className="text-gray-400 block text-sm">
                    {language === 'ar' ? 'عدد الطلبات المحفوظة' : 'Saved deliveries'}
                  </span>
                  <span className="text-xl font-bold">24</span>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-3">
                  <span className="text-gray-400 block text-sm">
                    {language === 'ar' ? 'إجمالي المعاملات' : 'Total transactions'}
                  </span>
                  <span className="text-xl font-bold">156</span>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-3">
                  <span className="text-gray-400 block text-sm">
                    {language === 'ar' ? 'آخر تحديث' : 'Last updated'}
                  </span>
                  <span className="text-xl font-bold">{language === 'ar' ? 'اليوم' : 'Today'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* VERSION INFO */}
          <div className="text-center mt-10 opacity-80">
            <p className="font-medium">Zimam Delivery v1.0.0</p>
            <p className="text-gray-400 text-sm">
              {language === 'ar' ? 'مصمم خصيصاً لسائقي توصيل الخليج' : 'Designed specifically for Gulf delivery drivers'}
            </p>
          </div>

          {/* LOGOUT */}
          <button className="w-full flex items-center justify-center gap-2 mt-6 py-3 rounded-2xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition font-semibold">
            <LogOut size={20} />
            {language === 'ar' ? 'تسجيل الخروج' : 'Log Out'}
          </button>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
