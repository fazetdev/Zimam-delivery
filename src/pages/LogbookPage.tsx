'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbook } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard, { Delivery } from '@/components/DeliveryCard'
import { Search, Filter, Calendar, Download, Plus, ChevronDown, BarChart3, TrendingUp, Clock, Star, Package, X, CheckCircle, ChevronRight, Zap, Target, Wallet } from 'lucide-react'

type FilterPlatform = 'all' | 'talabat' | 'jahez' | 'careem' | 'noon'

export default function LogbookPage() {
  const { language } = useLanguage()
  const { deliveries, addDelivery, deleteDelivery, getTodayDeliveries } = useLogbook()
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [platformFilter, setPlatformFilter] = useState<FilterPlatform>('all')
  const [selectedDate, setSelectedDate] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDelivery, setNewDelivery] = useState({
    customer: '',
    platform: 'talabat' as const,
    fee: 0,
    area: '',
    notes: ''
  })
  const [stats, setStats] = useState({ earnings: 0, averageTime: '0m' })

  useEffect(() => {
    setIsClient(true)
    // Simulate count-up animation
    const totalEarnings = deliveries.reduce((sum, d) => sum + d.fee, 0)
    const avgTime = deliveries.length > 0 ? '32m' : '0m'
    
    let count = 0
    const duration = 1000
    const steps = 60
    const increment = totalEarnings / steps
    
    const timer = setInterval(() => {
      count += increment
      if (count >= totalEarnings) {
        setStats({ earnings: totalEarnings, averageTime: avgTime })
        clearInterval(timer)
      } else {
        setStats({ earnings: Math.floor(count), averageTime: avgTime })
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-navy-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-gold-500 border-l-transparent rounded-full animate-spin mx-auto animation-delay-1000"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-300 animate-pulse">
            {language === 'ar' ? 'جاري تحميل سجل النخبة...' : 'Loading Elite Logbook...'}
          </p>
        </div>
      </div>
    )
  }

  const todayDeliveries = getTodayDeliveries()
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = searchQuery === '' || 
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.notes.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesPlatform = platformFilter === 'all' || delivery.platform === platformFilter
    
    return matchesSearch && matchesPlatform
  })

  const handleAddDelivery = (e: React.FormEvent) => {
    e.preventDefault()
    if (newDelivery.customer && newDelivery.fee > 0 && newDelivery.area) {
      addDelivery(newDelivery)
      setNewDelivery({
        customer: '',
        platform: 'talabat',
        fee: 0,
        area: '',
        notes: ''
      })
      setShowAddForm(false)
    }
  }

  const totalEarnings = filteredDeliveries.reduce((sum, delivery) => sum + delivery.fee, 0)
  const averageDeliveryTime = filteredDeliveries.length > 0 ? '32m' : '0m'

  const platformColors = {
    talabat: 'from-orange-500 to-amber-500',
    jahez: 'from-red-500 to-pink-500',
    careem: 'from-emerald-500 to-green-500',
    noon: 'from-yellow-500 to-amber-400',
    other: 'from-purple-500 to-indigo-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-navy-900 dark:to-gray-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl shadow-2xl px-6 py-4 flex items-center justify-between rounded-b-3xl border-b border-white/20 dark:border-gray-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/30">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full border-2 border-white dark:border-navy-900"></div>
            </div>
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                {language === 'ar' ? 'سجل النخبة' : 'Elite Logbook'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {language === 'ar' 
                  ? `${deliveries.length} رحلة مسجلة` 
                  : `${deliveries.length} recorded missions`
                }
              </p>
            </div>
          </div>
          <button className="hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold rounded-2xl hover:from-teal-700 hover:to-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30">
            <TrendingUp size={20} />
            <span>{language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics'}</span>
          </button>
        </header>

        <main className="pb-24 lg:pb-8">
          {/* Hero Stats - Luxury Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-navy-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 dark:border-gray-800 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <Wallet className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'إجمالي الأرباح' : 'Total Earnings'}
                      </p>
                      <p className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mt-2">
                        AED {stats.earnings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full text-white text-sm font-bold flex items-center gap-1">
                    <TrendingUp size={16} />
                    <span>+18%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full animate-pulse" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-navy-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 dark:border-gray-800 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'متوسط الوقت' : 'Avg. Delivery Time'}
                      </p>
                      <p className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mt-2">
                        {averageDeliveryTime}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-white text-sm font-bold flex items-center gap-1">
                    <Zap size={16} />
                    <span>⚡</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' 
                    ? 'أسرع من ٩٢٪ من المنافسين'
                    : 'Faster than 92% of competitors'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Search & Add Section */}
          <div className="relative mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-gray-800 overflow-hidden">
                  <div className="flex items-center px-6 py-4">
                    <Search className={`w-5 h-5 text-gray-400 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                    <input
                      type="text"
                      placeholder={language === 'ar' ? '🔍 ابحث في الرحلات...' : '🔍 Search deliveries...'}
                      className="flex-1 bg-transparent border-0 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                      >
                        <X size={18} className="text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating Add Button */}
              <button
                onClick={() => setShowAddForm(true)}
                className="fixed bottom-24 right-6 lg:static lg:relative z-40 w-16 h-16 lg:w-auto lg:h-auto lg:px-8 lg:py-4 bg-gradient-to-br from-gold-500 to-amber-400 text-white font-bold rounded-2xl lg:rounded-2xl shadow-2xl shadow-gold-500/30 hover:shadow-3xl hover:shadow-gold-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <div className="w-12 h-12 lg:w-10 lg:h-10 bg-white/20 rounded-xl lg:rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                  <Plus className="w-6 h-6 lg:w-5 lg:h-5 text-white" />
                </div>
                <span className="hidden lg:inline text-lg">
                  {language === 'ar' ? 'إضافة رحلة' : 'Add Delivery'}
                </span>
              </button>
            </div>

            {/* Platform Filters - Pill Design */}
            <div className="flex flex-wrap gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
              {(['all', 'talabat', 'jahez', 'careem', 'noon'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setPlatformFilter(platform)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
                    platformFilter === platform 
                      ? platform === 'all'
                        ? 'bg-gradient-to-r from-gray-900 to-navy-900 dark:from-gray-800 dark:to-gray-900 text-white shadow-2xl'
                        : `bg-gradient-to-r ${platformColors[platform]} text-white shadow-2xl`
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
                  }`}
                >
                  {platform === 'all' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span>{language === 'ar' ? 'الكل' : 'All'}</span>
                    </>
                  ) : platform === 'talabat' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span>{language === 'ar' ? 'طلبات' : 'Talabat'}</span>
                    </>
                  ) : platform === 'jahez' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span>{language === 'ar' ? 'جاهز' : 'Jahez'}</span>
                    </>
                  ) : platform === 'careem' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span>{language === 'ar' ? 'كريم' : 'Careem'}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>{language === 'ar' ? 'نون' : 'Noon'}</span>
                    </>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    platformFilter === platform 
                      ? 'bg-white/20' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {deliveries.filter(d => platform === 'all' || d.platform === platform).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Add Delivery Form - Modal/Bottom Sheet */}
          {showAddForm && (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:z-40 animate-fadeIn"
                onClick={() => setShowAddForm(false)}
              />
              
              {/* Form Container */}
              <div className="fixed lg:absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-50 lg:z-40 lg:max-w-2xl w-full animate-slideUp lg:animate-fadeIn">
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-navy-900 rounded-t-3xl lg:rounded-3xl shadow-3xl border-t lg:border border-white/40 dark:border-gray-800 max-h-[85vh] overflow-y-auto">
                  <div className="p-6 lg:p-8">
                    {/* Form Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-xl">
                          <Plus className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                            {language === 'ar' ? 'إضافة رحلة جديدة' : 'Add New Delivery'}
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {language === 'ar' ? 'سجل رحلتك بكل تفاصيلها' : 'Record your delivery with full details'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    <form onSubmit={handleAddDelivery} className="space-y-6">
                      {/* Customer & Platform */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="group">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                            {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                            placeholder={language === 'ar' ? 'مثال: أحمد محمد' : 'e.g., Ahmed Mohammed'}
                            value={newDelivery.customer}
                            onChange={(e) => setNewDelivery({...newDelivery, customer: e.target.value})}
                          />
                        </div>
                        
                        <div className="group">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                            {language === 'ar' ? 'المنصة' : 'Platform'}
                          </label>
                          <div className="relative">
                            <select
                              className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent appearance-none transition-all duration-300"
                              value={newDelivery.platform}
                              onChange={(e) => setNewDelivery({...newDelivery, platform: e.target.value as any})}
                            >
                              <option value="talabat" className="bg-white dark:bg-gray-900">Talabat</option>
                              <option value="jahez" className="bg-white dark:bg-gray-900">Jahez</option>
                              <option value="careem" className="bg-white dark:bg-gray-900">Careem</option>
                              <option value="noon" className="bg-white dark:bg-gray-900">Noon</option>
                              <option value="other" className="bg-white dark:bg-gray-900">Other</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Fee & Area */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="group">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                            {language === 'ar' ? 'الأجرة (درهم إماراتي)' : 'Fee (AED)'}
                          </label>
                          <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-bold">AED</span>
                            <input
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              className="w-full px-5 py-4 pl-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                              placeholder="0.00"
                              value={newDelivery.fee || ''}
                              onChange={(e) => setNewDelivery({...newDelivery, fee: parseFloat(e.target.value) || 0})}
                            />
                          </div>
                        </div>
                        
                        <div className="group">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                            {language === 'ar' ? 'المنطقة' : 'Area'}
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                            placeholder={language === 'ar' ? 'مثال: دبي مارينا' : 'e.g., Dubai Marina'}
                            value={newDelivery.area}
                            onChange={(e) => setNewDelivery({...newDelivery, area: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          {language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (Optional)'}
                        </label>
                        <textarea
                          className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300 min-h-[120px] resize-none"
                          placeholder={language === 'ar' ? 'أي تفاصيل إضافية عن الرحلة...' : 'Any additional delivery details...'}
                          value={newDelivery.notes}
                          onChange={(e) => setNewDelivery({...newDelivery, notes: e.target.value})}
                        />
                      </div>

                      {/* Form Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl transition-all duration-300 hover:scale-105"
                        >
                          {language === 'ar' ? 'إلغاء' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                          <CheckCircle size={20} />
                          <span>{language === 'ar' ? 'إضافة الرحلة' : 'Add Delivery'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Deliveries List */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-navy-900 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                  {language === 'ar' ? 'رحلاتي' : 'My Deliveries'}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                  {filteredDeliveries.length}
                </span>
                <span>{language === 'ar' ? 'رحلة' : 'deliveries'}</span>
              </div>
            </div>

            {filteredDeliveries.length > 0 ? (
              <div className="space-y-4">
                {filteredDeliveries.map((delivery, index) => (
                  <div key={delivery.id} className="group">
                    <DeliveryCard
                      delivery={delivery}
                      index={index}
                      onDelete={() => deleteDelivery(delivery.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-navy-900/90 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl border border-white/40 dark:border-gray-800">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-3xl flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? '🎯 جاهز للإنجاز!' : '🎯 Ready for Action!'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
                    {searchQuery 
                      ? (language === 'ar' 
                          ? 'لم نعثر على رحلات تطابق بحثك. جرب كلمات أخرى أو أضف رحلة جديدة!'
                          : 'No deliveries match your search. Try different keywords or add a new delivery!'
                        )
                      : (language === 'ar'
                          ? 'ابدأ رحلتك الأولى نحو النجاح! سجل توصيلتك الآن وارفع إحصائياتك.'
                          : 'Start your first journey to success! Record your delivery now and boost your stats.'
                        )
                    }
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-400 text-white font-bold rounded-2xl shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                  >
                    <Plus size={20} />
                    <span>{language === 'ar' ? 'إضافة أول رحلة' : 'Add First Delivery'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Export Section - Luxury Design */}
          <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-navy-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 dark:border-gray-800 overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500 group-hover:duration-200"></div>
            <div className="relative">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Download className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                      {language === 'ar' ? 'تصدير بيانات النخبة' : 'Export Elite Data'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' 
                        ? 'احفظ نسخة احتياطية فاخرة من سجلك الكامل'
                        : 'Save a luxurious backup of your complete delivery history'
                      }
                    </p>
                  </div>
                </div>
                <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative flex items-center gap-2">
                    <Download size={20} />
                    {language === 'ar' ? 'تصدير كملف Excel' : 'Export as Excel'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-6 lg:pb-0 bg-gradient-to-t from-white/95 to-transparent dark:from-navy-900/95 dark:to-transparent backdrop-blur-xl lg:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <BottomNav />
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}