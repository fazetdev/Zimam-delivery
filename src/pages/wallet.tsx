import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useWallet, useWalletSummary } from '@/context/useWallet'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import TransactionCard from '@/components/TransactionCard'
import { Plus, Minus, Wallet, TrendingUp, TrendingDown, Sparkles, Target, Coins, Crown, Download, ArrowUpRight, ArrowDownRight, ChevronRight, MoreVertical, Shield } from 'lucide-react'

export default function WalletPage() {
  const { language } = useLanguage()
  const { addTransaction, deleteTransaction } = useWallet()
  const { todayIncome, todayExpense, todayProfit, todayTransactions } = useWalletSummary()
  const [isClient, setIsClient] = useState(false)
  const [animatedProfit, setAnimatedProfit] = useState(0)
  const [animatedIncome, setAnimatedIncome] = useState(0)
  const [animatedExpense, setAnimatedExpense] = useState(0)
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Profit count-up animation
    let profitCount = 0
    let incomeCount = 0
    let expenseCount = 0
    const duration = 1500
    const steps = 75
    
    const profitIncrement = todayProfit / steps
    const incomeIncrement = todayIncome / steps
    const expenseIncrement = todayExpense / steps
    
    const timer = setInterval(() => {
      profitCount += profitIncrement
      incomeCount += incomeIncrement
      expenseCount += expenseIncrement
      
      if (profitCount >= todayProfit) {
        setAnimatedProfit(todayProfit)
        setAnimatedIncome(todayIncome)
        setAnimatedExpense(todayExpense)
        clearInterval(timer)
      } else {
        setAnimatedProfit(Math.floor(profitCount))
        setAnimatedIncome(Math.floor(incomeCount))
        setAnimatedExpense(Math.floor(expenseCount))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [todayProfit, todayIncome, todayExpense])

  const handleAddTransaction = (type: 'income' | 'expense') => {
    const categories = type === 'income'
      ? ['delivery']
      : ['fuel', 'food', 'maintenance', 'toll', 'other']

    const descriptions = type === 'income'
      ? language === 'ar'
        ? ['توصيل طلبات', 'طلب جاهز', 'توصيل كريم', 'توصيل نون']
        : ['Talabat delivery', 'Jahez order', 'Careem delivery', 'Noon delivery']
      : language === 'ar'
        ? ['محطة وقود', 'غداء/عشاء', 'غسيل سيارة', 'رسوم سالك']
        : ['Gas station', 'Lunch/Dinner', 'Car wash', 'Salik toll']

    addTransaction({
      type,
      amount: type === 'income' ? Math.floor(Math.random() * 100) + 50 : Math.floor(Math.random() * 30) + 10,
      category: categories[Math.floor(Math.random() * categories.length)] as any,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
    })
    
    if (type === 'income') {
      setShowIncomeForm(false)
    } else {
      setShowExpenseForm(false)
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-gold-50 to-white dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-950">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-500 border-l-transparent rounded-full animate-spin mx-auto animation-delay-1000"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
            {language === 'ar' ? 'تحميل محفظة النخبة...' : 'Loading Elite Wallet...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-gold-50 to-white dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Header */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl px-6 py-4 flex items-center justify-between rounded-b-3xl border-b border-white/40 dark:border-gray-800 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold-500/30">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                {language === 'ar' ? 'محفظة النخبة' : 'Elite Wallet'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {language === 'ar' ? 'تتبع أمجادك الذهبية' : 'Track your golden empire'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl flex items-center justify-center transition-colors">
              <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl flex items-center justify-center transition-colors">
              <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </header>

        <main className="pb-32 lg:pb-8">
          {/* Hero Profit Section - 24K Gold Luxury */}
          <div className="relative group mb-8">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500 via-amber-400 to-yellow-300 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-950/95 backdrop-blur-xl rounded-3xl p-8 border border-white/40 dark:border-gray-800 overflow-hidden">
              {/* Gold shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-gold-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold-500/30">
                      <Crown className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        {language === 'ar' ? 'إجمالي الربح اليوم' : "Today's Total Profit"}
                      </p>
                      <p className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mt-2 bg-gradient-to-r from-gold-600 to-amber-400 bg-clip-text text-transparent">
                        AED {animatedProfit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-32 h-32 relative">
                      {/* Profit ring */}
                      <div className="absolute inset-0 border-[12px] border-emerald-500/20 rounded-full"></div>
                      <div className="absolute inset-0 border-[12px] border-gold-500 rounded-full animate-pulse" style={{ clipPath: `inset(0 ${100 - (todayProfit / 2000 * 100)}% 0 0)` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center shadow-xl">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Income/Expense Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Income Card */}
                  <div className="group/card relative bg-gradient-to-br from-white/90 to-emerald-50/90 dark:from-gray-900/90 dark:to-emerald-900/20 backdrop-blur-xl rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-800/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl opacity-0 group-hover/card:opacity-20 blur transition duration-500"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                            <ArrowUpRight className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                              {language === 'ar' ? 'الدخل' : 'Income'}
                            </p>
                            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                              AED {animatedIncome.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full text-white text-xs font-bold flex items-center gap-1">
                          <TrendingUp size={12} />
                          <span>+24%</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-emerald-200 dark:bg-emerald-900/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Expense Card */}
                  <div className="group/card relative bg-gradient-to-br from-white/90 to-rose-50/90 dark:from-gray-900/90 dark:to-rose-900/20 backdrop-blur-xl rounded-2xl p-6 border border-rose-200/50 dark:border-rose-800/30 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-pink-400 rounded-2xl opacity-0 group-hover/card:opacity-20 blur transition duration-500"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                            <ArrowDownRight className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                              {language === 'ar' ? 'المصاريف' : 'Expenses'}
                            </p>
                            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                              AED {animatedExpense.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-400 rounded-full text-white text-xs font-bold flex items-center gap-1">
                          <TrendingDown size={12} />
                          <span>-12%</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-rose-200 dark:bg-rose-900/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full animate-pulse" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="fixed bottom-28 right-6 lg:hidden z-40 flex flex-col gap-4">
            {/* Income FAB */}
            <button
              onClick={() => setShowIncomeForm(true)}
              className="relative group w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-400 rounded-2xl shadow-2xl shadow-emerald-500/40 hover:shadow-3xl hover:shadow-emerald-500/60 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Plus className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-emerald-500 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
              </div>
            </button>

            {/* Expense FAB */}
            <button
              onClick={() => setShowExpenseForm(true)}
              className="relative group w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-400 rounded-2xl shadow-2xl shadow-rose-500/40 hover:shadow-3xl hover:shadow-rose-500/60 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Minus className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-rose-500 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-rose-500" />
              </div>
            </button>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex gap-4 mb-8">
            <button
              onClick={() => setShowIncomeForm(true)}
              className="group flex-1 bg-gradient-to-br from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-white font-bold rounded-2xl p-6 shadow-2xl shadow-emerald-500/30 hover:shadow-3xl hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold">Add Income</p>
                <p className="text-sm opacity-90">Record your earnings</p>
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-80" />
            </button>

            <button
              onClick={() => setShowExpenseForm(true)}
              className="group flex-1 bg-gradient-to-br from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 text-white font-bold rounded-2xl p-6 shadow-2xl shadow-rose-500/30 hover:shadow-3xl hover:shadow-rose-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                <Minus className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold">Add Expense</p>
                <p className="text-sm opacity-90">Track your costs</p>
              </div>
              <ArrowDownRight className="w-5 h-5 opacity-80" />
            </button>
          </div>

          {/* Transactions Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                  {language === 'ar' ? 'معاملات اليوم' : "Today's Transactions"}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                  {todayTransactions.length}
                </span>
                <span>{language === 'ar' ? 'عملية' : 'transactions'}</span>
              </div>
            </div>

            {todayTransactions.length > 0 ? (
              <div className="space-y-3">
                {todayTransactions.map((transaction) => (
                  <div key={transaction.id} className="group">
                    <TransactionCard
                      type={transaction.type}
                      amount={transaction.amount}
                      category={transaction.category as any}
                      notes={transaction.description}
                      date={transaction.time}
                      onDelete={() => deleteTransaction(transaction.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-950/90 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl border border-white/40 dark:border-gray-800">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500 to-amber-400 rounded-3xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gold-500/10 to-amber-400/10 rounded-3xl flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold-500/30">
                      <Wallet className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? '🏰 إمبراطوريتك تبدأ اليوم!' : '🏰 Your Empire Starts Today!'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
                    {language === 'ar'
                      ? 'ابدأ في بناء إمبراطوريتك المالية. سجل أول عملية ربح أو مصروف وشاهد كيف تنمو ثروتك!'
                      : 'Start building your financial empire. Record your first profit or expense and watch your wealth grow!'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setShowIncomeForm(true)}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      <span>{language === 'ar' ? 'إضافة دخل' : 'Add Income'}</span>
                    </button>
                    <button
                      onClick={() => setShowExpenseForm(true)}
                      className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Minus size={20} />
                      <span>{language === 'ar' ? 'إضافة مصروف' : 'Add Expense'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-950/90 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'متوسط الدخل' : 'Avg. Income'}
                  </p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    AED 145
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            </div>

            <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-950/90 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'هامش الربح' : 'Profit Margin'}
                  </p>
                  <p className="text-2xl font-black text-gold-600 dark:text-gold-400">
                    78%
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500/20 to-amber-400/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-gold-500" />
                </div>
              </div>
            </div>

            <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-950/90 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'أفضل يوم' : 'Best Day'}
                  </p>
                  <p className="text-2xl font-black text-purple-600 dark:text-purple-400">
                    AED 2,450
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-400/20 rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-6 lg:pb-0 bg-gradient-to-t from-white/95 to-transparent dark:from-gray-900/95 dark:to-transparent backdrop-blur-xl lg:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <BottomNav />
          </div>
        </div>
      </div>

      {/* Income Form Modal */}
      {showIncomeForm && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={() => setShowIncomeForm(false)}
          />
          
          <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp">
            <div className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/20 rounded-t-3xl shadow-3xl border-t border-emerald-200/50 dark:border-emerald-800/30 max-h-[85vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        {language === 'ar' ? 'إضافة دخل' : 'Add Income'}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {language === 'ar' ? 'سجل أرباحك الجديدة' : 'Record your new earnings'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowIncomeForm(false)}
                    className="w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleAddTransaction('income')} className="p-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors text-center">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Wallet className="w-6 h-6 text-emerald-500" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">Delivery</span>
                    </button>
                    
                    <button onClick={() => handleAddTransaction('income')} className="p-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors text-center">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-emerald-500" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">Bonus</span>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleAddTransaction('income')}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
                  >
                    Quick Add +AED 75
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={() => setShowExpenseForm(false)}
          />
          
          <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp">
            <div className="bg-gradient-to-br from-white to-rose-50 dark:from-gray-900 dark:to-rose-900/20 rounded-t-3xl shadow-3xl border-t border-rose-200/50 dark:border-rose-800/30 max-h-[85vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <Minus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        {language === 'ar' ? 'إضافة مصروف' : 'Add Expense'}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {language === 'ar' ? 'سجل تكاليفك اليومية' : 'Record your daily costs'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowExpenseForm(false)}
                    className="w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => handleAddTransaction('expense')} className="p-6 bg-rose-100 dark:bg-rose-900/30 rounded-2xl hover:bg-rose-200 dark:hover:bg-rose-800/50 transition-colors text-center">
                    <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingDown className="w-6 h-6 text-rose-500" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">Fuel</span>
                  </button>
                  
                  <button onClick={() => handleAddTransaction('expense')} className="p-6 bg-rose-100 dark:bg-rose-900/30 rounded-2xl hover:bg-rose-200 dark:hover:bg-rose-800/50 transition-colors text-center">
                    <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Coins className="w-6 h-6 text-rose-500" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">Food</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
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