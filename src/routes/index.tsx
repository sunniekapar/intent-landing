import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Landing,
  head: () => ({
    meta: [
      {
        title: 'Welcome to Intent',
      },
    ],
  }),
})

function Landing() {
  const [intentionInput, setIntentionInput] = useState('')
  const [showOverlay, setShowOverlay] = useState(true)
  const [siteBlurred, setSiteBlurred] = useState(true)

  const submitDemo = () => {
    if (intentionInput.trim()) {
      setShowOverlay(false)
      setSiteBlurred(false)
    }
  }

  const openExtension = () => {
    console.log('[Landing] Get Started button clicked')
    console.log('Opening extension...')
  }

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      <div className="fixed top-0 left-0 right-0 h-20 bg-neutral-50/80 backdrop-blur-md z-50 flex items-center px-10">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-orange-500 rounded-lg"></div>
          <div className="text-xl font-medium text-neutral-900">Intent</div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-[at_50%_100%] from-orange-500/[0.06] from-0% to-transparent to-60%" />
        <div className="absolute inset-0 bg-radial-[at_50%_100%] from-orange-500/[0.04] from-0% to-transparent to-70%" />
        <div className="absolute inset-0 bg-radial-[at_50%_100%] from-orange-500/[0.08] from-0% to-transparent to-80%" />
      </div>

      <div className="pt-48 px-20 max-w-5xl mx-auto">
        <h1 className="text-8xl font-semibold text-neutral-900 mb-8 leading-none tracking-tight">
          Browse with<br/>
          <span className="relative inline-block">
            <span className="relative z-10 px-1">intention</span>
            <span className="absolute bottom-0 left-0 right-0 h-[45%] bg-linear-to-t from-orange-500/80 to-orange-500/60 -z-0"></span>
          </span>
        </h1>
        <p className="text-2xl text-neutral-600 mb-6 max-w-2xl">
          Intent helps you stay focused by asking for your purpose before accessing any website.
        </p>
        <button 
          onClick={openExtension}
          className="group relative inline-flex items-center justify-center overflow-hidden bg-orange-500 text-white px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
        >
          <span className="transition-all duration-300 group-hover:-translate-x-40 group-hover:opacity-0">
            Get Started
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-x-40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto mb-20 px-10 mt-16">
        <div className="bg-neutral-800/40 backdrop-blur-lg rounded-[3rem] shadow-2xl overflow-hidden relative h-[650px] flex items-center justify-center">
          <div 
            className={`absolute inset-0 bg-linear-to-br from-slate-900 to-slate-950 transition-all duration-1000 flex items-center justify-center text-white ${
              siteBlurred ? 'blur-2xl' : 'blur-0'
            }`}
          >
            <div className="text-center opacity-70">
              <h2 className="text-3xl font-semibold mb-2">Sample Website</h2>
              <p className="text-lg">This represents a potentially distracting website</p>
            </div>
          </div>

          <div 
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
              showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="text-center max-w-md mx-5">
              <h3 className="text-white text-2xl font-medium mb-4">What's your intention?</h3>
              <p className="text-white/80 mb-6">Enter your purpose for visiting this website:</p>
              <input 
                type="text"
                value={intentionInput}
                onChange={(e) => setIntentionInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitDemo()}
                className="w-full px-4 py-3 rounded-lg text-lg mb-5 outline-none bg-transparent text-white border border-white/20 placeholder-neutral-400 focus:border-white/40 transition-colors"
                placeholder="e.g., Research for my project"
                autoFocus
              />
              <button 
                onClick={submitDemo}
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg text-lg cursor-pointer transition-all font-medium hover:bg-white/20 hover:border-white/30"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 pb-20">
        <div className="flex flex-wrap gap-10 mt-16 justify-center">
          <Feature 
            icon="✏️"
            title="Set Your Intention"
            description="When you want to use a potentially distracting site, Intent will prompt you to declare your clear intention."
          />
          <Feature 
            icon="🎯"
            title="Stay Focused"
            description="Intent monitors your activity and ensures you stay aligned with your declared intention."
          />
          <Feature 
            icon="🔒"
            title="Gentle Reminders"
            description="If your activity drifts from your intention, Intent gently steps in and reblocks the site to help you refocus."
          />
          <Feature 
            icon="🌱"
            title="Build Better Habits"
            description="Over time, Intent helps you develop healthier browsing habits and maintain focus on what matters most."
          />
        </div>
      </div>

      <div className="text-center py-16">
        <button 
          onClick={openExtension}
          className="group relative inline-flex items-center justify-center overflow-hidden bg-orange-500 text-white px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
        >
          <span className="transition-all duration-300 group-hover:-translate-x-40 group-hover:opacity-0">
            Let's get started
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-x-40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </span>
        </button>
        <div className="w-3/5 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent mx-auto my-10"></div>
        <div className="text-neutral-600 text-sm pb-10">© 2025 Intent. All rights reserved.</div>
      </div>
    </div>
  )
}

function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex-1 min-w-[250px] max-w-[300px] text-center">
      <div className="size-16 rounded-xl flex items-center justify-center mx-auto mb-5 text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed text-lg">{description}</p>
    </div>
  )
}