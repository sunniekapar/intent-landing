import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
  head: () => ({
    meta: [
      {
        title: 'Pricing — Intent',
      },
      {
        name: 'description',
        content: 'Choose the plan that works best for you.'
      },
    ],
  }),
})

function PricingPage() {
  const headerCtaRef = useRef<HTMLButtonElement | null>(null)
  
  const handleGetExtensionClick = () => {
    //TODO: Change to actual extension id when in prod
    window.open('https://chrome.google.com/webstore/detail/ehfoddcbmgdfbdlkcockblbjcjakibio', '_blank')
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Intent logo" className="size-7 rounded-lg" />
          <div className="text-lg font-semibold text-primary">Intent</div>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <button type="button" className="hover:text-primary transition-colors"><Link to="/">Home</Link></button>
          <button type="button" className="hover:text-primary transition-colors"><Link to="/pricing">Pricing</Link></button>
          <button
            type="button"
            ref={headerCtaRef}
            onClick={handleGetExtensionClick}
            className="bg-orange-500 text-white px-4 py-2 font-medium shadow-sm shadow-orange-500/30 hover:bg-orange-600 active:scale-[100.5%] rounded-lg"
          >
            Get Extension
          </button>
        </div>
      </div>

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-[at_50%_90%] from-orange-500/[0.05] from-0% to-transparent to-65%" />
        <div className="absolute inset-0 bg-radial-[at_50%_95%] from-orange-500/[0.04] from-0% to-transparent to-75%" />
        <div className="absolute inset-0 bg-radial-[at_50%_100%] from-orange-500/[0.07] from-0% to-transparent to-85%" />
      </div>

      <main className="pt-28 sm:pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with a 2-week free trial, no credit card required
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-sm mx-auto">
          {/* <div className="relative">
            <div className="bg-gray-100 rounded-[18px] p-0.5 pt-2 shadow-lg">
              <div className="px-4 py-2">
                <h2 className="text-lg font-medium text-gray-500">Starter</h2>
              </div>
              <div className="bg-white rounded-2xl px-4 pt-6 pb-6 ">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                  <p className="text-gray-600 text-sm">Basic intention tracking for personal use</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-4">Our Starter plan includes</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Basic intention prompts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Simple browsing awareness</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Personal use license</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Email support</span>
                    </li>
                  </ul>
                </div>

                <button 
                  type="button"
                  onClick={handleGetExtensionClick}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Choose this plan
                </button>
              </div>
            </div>
          </div> */}

          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-[18px] p-0.5 pt-2 shadow-lg">
              <div className="px-4 pb-2">
                <h2 className="text-lg font-medium text-white">Premium</h2>
              </div>
              <div className="bg-white rounded-2xl px-4 pt-6 pb-6 shadow-md">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900">$2</span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                  <p className="text-gray-600 text-sm">Advanced intention tracking with powerful analytics</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-4">Our Premium plan includes</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Advanced analytics dashboard</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Custom intention categories</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Habit tracking & insights</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Export your data anytime</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="size-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Priority support</span>
                    </li>
                  </ul>
                </div>

                <button 
                  type="button"
                  onClick={handleGetExtensionClick}
                  className="group w-full inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow"
                >
                  <span>Start 2 Week Free Trial</span>
                  <div className="relative ml-2 size-4 overflow-hidden">
                    <div className="absolute transition-all duration-200 group-hover:-translate-y-4 group-hover:translate-x-3">
                      <ArrowUpRight className="size-4" />
                      <ArrowUpRight className="size-4 -translate-x-3" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Questions about pricing? <a href="mailto:hello@useintent.app" className="text-orange-500 hover:text-orange-600 underline">Contact us</a>
          </p>
        </div>
      </main>

      <div className="text-center py-10 px-6 border-t border-primary/10">
        <div className="text-muted-foreground text-sm">
          © 2025 Intent. All rights reserved.
          <Link to="/privacy" className="underline hover:text-primary ml-2">Privacy</Link>
        </div>
      </div>
    </div>
  )
}
