import { createFileRoute } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { useRef } from 'react'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [
      {
        title: 'Privacy Policy — Intent',
      },
      {
        name: 'description',
        content: 'Learn how Intent collects, uses, and protects your data.'
      },
    ],
  }),
})

function PrivacyPage() {
  const headerCtaRef = useRef<HTMLButtonElement | null>(null)
  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Intent logo" className="size-7 rounded-lg" />
          <div className="text-lg font-semibold text-primary">Intent</div>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <button
            ref={headerCtaRef}
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

      <main className="pt-28 sm:pt-32 pb-24 px-6 max-w-[900px] mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <section className="space-y-6 leading-relaxed text-foreground/90">
          <p>
            Your privacy matters. This page explains what information Intent may collect, how we use it,
            and the choices you have. We design Intent to minimize data collection and keep everything on your device whenever possible.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usage intentions you enter within the extension (stored locally in your browser whenever possible).</li>
              <li>Email address if you join our waitlist on the website.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve Intent’s features and user experience.</li>
              <li>Send product updates if you opt-in via the waitlist.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Data Retention</h2>
            <p>We retain information only as long as necessary to deliver the service or as required by law.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Your Choices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You can request deletion of your waitlist email at any time.</li>
              <li>You can uninstall the extension to stop any local data collection.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Contact Us</h2>
            <p className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>Questions? Email us at <a className="underline hover:text-primary" href="mailto:hello@useintent.app">hello@useintent.app</a>.</span>
            </p>
          </div>
        </section>

        <div className="w-3/5 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent mx-auto my-10"></div>
        <div className="text-muted-foreground text-sm">© {new Date().getFullYear()} Intent. All rights reserved.</div>
      </main>
    </div>
  )
}


