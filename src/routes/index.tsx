import logo from '/logo2.png'
import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState, type ReactNode, type Ref } from 'react'
import { PenLine, Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'
import Flame from '@/components/flame'
import { SquarePenIcon } from '@/components/ui/square-pen'
import { ShieldCheckIcon } from '@/components/ui/shield-check'
import { TimerIcon } from '@/components/ui/timer'
import { RocketIcon } from '@/components/ui/rocket'
import { SparklesIcon } from '@/components/ui/sparkles'
import { CheckIcon } from '@/components/ui/check'
import { SettingsGearIcon } from '@/components/ui/settings-gear'
import { KeyboardIcon } from '@/components/ui/keyboard'
import { ChartPieIcon } from '@/components/ui/chart-pie'
import { FingerprintIcon } from '@/components/ui/fingerprint'

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
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const openExtension = () => {
    // Smoothly scroll to the bottom waitlist section
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="size-7 bg-orange-500 rounded-lg" />
          <div className="text-lg font-semibold text-primary">Intent</div>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <button className="hover:text-primary transition-colors">FAQs</button>
          <button
            onClick={openExtension}
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

      <div className="pt-40 sm:pt-44 px-6 max-w-[1200px] mx-auto">
        <h1 className="text-[48px] sm:text-[72px] lg:text-[112px] font-semibold text-primary leading-[0.9] tracking-tight mb-6">
          Browse with
          <br/>
          <span className="relative inline-block">
            <span className="relative z-10 px-1">intention</span>
            <span className="absolute bottom-0 left-0 right-0 h-[45%] bg-linear-to-t from-orange-500/80 to-orange-500/60 -z-0"></span>
          </span>
        </h1>
        <p className="text-lg sm:text-2xl text-muted-foreground max-w-3xl">
          Intent keeps you grounded by asking for your purpose before accessing any distracting website.
        </p>
        <div className="mt-8 hidden">
          {/*
          <button 
            onClick={openExtension}
            className="group relative inline-flex items-center justify-center overflow-hidden bg-orange-500 text-white px-8 py-4 rounded-xl text-lg sm:text-xl font-semibold transition-all duration-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
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
          */}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mb-24 px-6 mt-16 sm:mt-24">
        <IntentionDemo />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12 mt-12 sm:mt-16 justify-items-center">
          <Feature
            renderIcon={(ref) => <SquarePenIcon ref={ref as Ref<any>} size={56} />}
            title="Set your intention"
          />
          <Feature
            renderIcon={(ref) => <ShieldCheckIcon ref={ref as Ref<any>} size={56} />}
            title="Stay focused"
          />
          <Feature
            renderIcon={(ref) => <TimerIcon ref={ref as Ref<any>} size={56} />}
            title="Gentle reminders"
          />
          <Feature
            renderIcon={(ref) => <RocketIcon ref={ref as Ref<any>} size={56} />}
            title="Build better habits"
          />
          <Feature
            renderIcon={(ref) => <SettingsGearIcon ref={ref as Ref<any>} size={56} />}
            title="Flexible customization"
          />
          <Feature
            renderIcon={(ref) => <SparklesIcon ref={ref as Ref<any>} size={56} />}
            title="Delightful experience"
          />
          <Feature
            renderIcon={(ref) => <ChartPieIcon ref={ref as Ref<any>} size={56} />}
            title="Actionable insights"
          />
          <Feature
            renderIcon={(ref) => <FingerprintIcon ref={ref as Ref<any>} size={56} />}
            title="Privacy‑first design"
          />
          {/* Extras available to swap in later */}
          {/* <Feature icon={<SparklesIcon size={28} />} title="Delightful UX" /> */}
          {/* <Feature icon={<CheckIcon size={28} />} title="Progress Tracking" /> */}
        </div>
      </div>

      <div ref={bottomRef} className="text-center py-20 px-6">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary max-w-3xl mx-auto">
          We’re putting the finishing touches on Intent to meet the latest Chrome Web Store requirements.
          <span className="block mt-2 text-muted-foreground font-normal text-lg sm:text-xl">Get notified as soon as we’re live again.</span>
        </p>

        <div className="mt-8 max-w-2xl mx-auto">
          <Waitlist />
        </div>

        <div className="w-3/5 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent mx-auto my-10"></div>
        <div className="text-muted-foreground text-sm pb-10">© 2025 Intent. All rights reserved.</div>
      </div>
    </div>
  )
}

type IconHandle = { startAnimation?: () => void; stopAnimation?: () => void }

function Feature({ renderIcon, title }: { renderIcon: (ref: Ref<IconHandle>) => ReactNode; title: string }) {
  const iconRef = useRef<IconHandle | null>(null)
  return (
    <div
      className="w-full min-w-0 max-w-[360px] sm:max-w-[320px] text-center group px-2"
      onMouseEnter={() => iconRef.current?.startAnimation?.()}
      onMouseLeave={() => iconRef.current?.stopAnimation?.()}
    >
      <div className="size-24 rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl">
        {renderIcon((iconRef as unknown) as Ref<IconHandle>)}
      </div>
      <h3 className="text-[20px] sm:text-[22px] md:text-2xl font-semibold text-primary tracking-tight leading-snug break-words whitespace-normal max-w-[20ch] sm:max-w-[16ch] md:max-w-[18ch] mx-auto">
        {title}
      </h3>
    </div>
  )
}

function IntentionDemo() {
  const [state, setState] = useState<{
    input: string
    phase: 'idle' | 'submitting' | 'success' | 'hidden'
  }>({ input: '', phase: 'idle' })

  const isValid = state.input.trim().length > 10
  const isSubmitting = state.phase === 'submitting'
  const isSuccess = state.phase === 'success'
  const showOverlay = state.phase !== 'hidden'
  const siteBlurred = showOverlay

  const submitDemo = () => {
    if (!isValid || isSubmitting) return
    setState((s) => ({ ...s, phase: 'submitting' }))
    setTimeout(() => {
      setState((s) => ({ ...s, phase: 'success' }))
      setTimeout(() => {
        setState((s) => ({ ...s, phase: 'hidden' }))
      }, 3000)
    }, 1500)
  }

  return (
    <div className="bg-primary/80 backdrop-blur-lg rounded-xl md:rounded-4xl shadow-2xl overflow-hidden relative h-[480px] sm:h-[520px] md:h-[560px] flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-linear-to-br from-primary to-primary transition-all duration-1000 flex items-center justify-center text-primary-foreground ${
          siteBlurred ? 'blur-2xl' : 'blur-0'
        }`}
      >
        <div className="text-center opacity-70">
          <h2 className="text-3xl font-semibold mb-2">Sample Website</h2>
          <p className="text-lg">This represents a potentially distracting website</p>
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={cn(
            'absolute inset-0 z-0 bg-radial-[ellipse_80%_60%_at_50%_0%] from-primary to-transparent to-70% transition-colors duration-1000',
            isSuccess && 'from-orange-900/20',
          )}
        />
        <div
          className={cn(
            'relative space-y-8 w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-full px-4',
            isSuccess && 'animate-slide-out-up delay-1000',
          )}
        >
          <div className="flex justify-center relative animate-slide-in-up">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10.5">
              <Flame
                className={cn(
                  'scale-35 scale-x-45',
                  isSuccess ? 'animate-flame-ignition' : 'opacity-0 scale-0',
                )}
              />
            </div>
            <img
              src={logo}
              alt="Logo"
              className={cn(
                'size-24 opacity-80 transition-all duration-500',
                isSuccess && [
                  'rounded-full',
                  'bg-[radial-gradient(circle,color-mix(in_srgb,rgb(251,146,60)_15%,transparent)_60%,transparent_100%)]',
                  'shadow-[0_0_40px_10px_rgb(251,146,60),0_0_0_4px_color-mix(in_srgb,rgb(251,146,60)_8%,transparent)]',
                  'opacity-100',
                ],
              )}
            />
          </div>

          {!isSuccess ? (
            <div
              className={cn(
                'relative w-full border-2 border-transparent rounded-xl animate-intention-glow',
                'animate-slide-in-up delay-150',
              )}
            >
              <div className="absolute top-0 flex w-full justify-center">
                <div className="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-transparent via-orange-700 to-transparent transition-all duration-1000" />
              </div>

              <div className="relative">
                <PenLine className="absolute left-4 top-5.5 size-4 text-primary-foreground/60 z-10" />
                {isSubmitting && (
                  <Loader2 className="absolute right-4 top-4 size-4 text-primary-foreground/60 z-10 animate-spin" />
                )}
                <textarea
                  value={state.input}
                  onChange={(e) => setState((s) => ({ ...s, input: e.target.value }))}
                  className="w-full p-4 text-lg resize-none rounded-xl shadow-lg pl-10 pr-10 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground border border-primary-foreground/10 placeholder-primary-foreground/40 focus:border-primary-foreground/20 focus:outline-none min-h-[120px]"
                  placeholder="What is your intention for this site?"
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && isValid) {
                      e.preventDefault()
                      submitDemo()
                    }
                  }}
                />
              </div>
            
            </div>
          ) : (
            <div className="animate-slide-in-up text-center mt-6 max-w-prose px-4">
              <p className="text-lg leading-relaxed break-words overflow-hidden font-medium text-orange-500/80">
                {state.input}
              </p>
              <p className="text-sm text-primary-foreground/60 mt-2">Your intention has been set</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Waitlist() {
  const [email, setEmail] = useState('')
  const [phase, setPhase] = useState<'idle' | 'submitting' | 'success'>('idle')

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const submitting = phase === 'submitting'
  const success = phase === 'success'

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!isValid || submitting) return
    setPhase('submitting')
    try {
      // TODO: send to your backend or service
      await new Promise((r) => setTimeout(r, 900))
      setPhase('success')
    } catch (err) {
      setPhase('idle')
    }
  }

  if (success) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-primary/80 text-primary-foreground border border-primary-foreground/10 shadow-2xl">
        <div className="absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_0%] from-primary to-transparent opacity-60" />
        <div className="relative flex items-center justify-center gap-3 px-5 py-4">
          <CheckIcon size={22} className="text-orange-400" />
          <span className="text-base sm:text-lg font-medium">You’re on the list! We’ll email you when Intent is live.</span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="relative overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 shadow-xl">
      <div className="absolute inset-0 bg-radial-[ellipse_120%_80%_at_50%_-10%] from-orange-500/10 to-transparent pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 sm:p-4">
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 px-4 py-3 rounded-xl bg-background text-foreground placeholder-primary-foreground/40 border border-primary-foreground/15 focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 shadow-inner"
          required
        />
        <button
          type="submit"
          disabled={!isValid || submitting}
          className={cn(
            'inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-orange-500/30'
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Adding…
            </>
          ) : (
            'Join the waitlist'
          )}
        </button>
      </div>
    </form>
  )
}