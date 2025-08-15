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
          At Intent, we believe you deserve tools that help you focus without compromising your privacy. We do not sell your data, track your browsing history, or create profiles about you. The extension has been designed so that as much as possible happens directly on your device, and when limited processing outside your device is necessary, no information is ever sent that could identify you personally.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Information We Process During Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <p>When you use Intent, the extension may temporarily read certain information from the page you are currently viewing. This information consists primarily of page metadata extracted from the active tab’s DOM—such as titles or headings—together with the intention statement you entered. This data is processed only in your browser’s memory and, when needed, sent via OpenRouter to an AI model for analysis to check whether your current activity aligns with your stated intention. We never send your name, email, account details, or any other identifier alongside this content. The API receives only the relevant page content and your intention statement, with no way to link it back to you. While OpenRouter does not retain requests permanently, certain third-party AI models available through their service may store data temporarily for quality assurance; however, the data we send contains nothing that could identify you.</p>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Data We Store for Your Settings</h2>
            <ul className="list-disc pl-6 space-y-2">
              <p>To provide a consistent and personalized experience, Intent stores your blocked site list and enabled settings in our secure database. This allows the extension to apply your blocking preferences every time you browse, regardless of device restarts or browser sessions. The intention statements you enter are not stored on our servers—they are kept only in the local cache of your Chrome extension, ensuring that your goals remain on your device alone. Your email address is collected solely for authentication, serving as the only identifier that allows us to load your settings and enforce your blocking rules.</p>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Waitlist Information</h2>
            <p>Before public release, a waitlist on our separate website was used to collect email addresses for early launch notifications. These addresses are stored in our database and will be deleted when the waitlist is retired. They are not used for marketing or unrelated communication.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Analytics and Tracking</h2>
            <ul className="list-disc pl-6 space-y-2">
              <p>At present, Intent does not use analytics or tracking tools such as Google Analytics. If we introduce analytics in the future, we will update this policy in advance so you can make an informed choice.</p>
            </ul>
          </div>


          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Why We Need Certain Chrome Permissions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <p>Intent requires specific Chrome permissions to function effectively:</p>
              <li>
                <strong>storage</strong>: Used to keep your intention statements locally in the extension’s cache and to store your site block list and preferences so your settings are preserved between sessions.
              </li>
              <li>
                <strong>activeTab</strong>: Ensures we only access and process content from the tab you are actively viewing when you trigger the extension, never from other tabs.
              </li>
              <li>
                <strong>scripting</strong>: Enables us to inject the focus overlay and blocking interface directly into the page you are viewing, allowing the extension to limit access to distracting sites until you confirm your intention.
              </li>
              <li>
                <strong>tabs</strong>: Allows us to read basic tab metadata, such as the URL and title, to enforce your rules, and to open or close tabs when redirecting you or displaying your dashboard.
              </li>
            </ul>
          </div>


          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Contact Us</h2>
            <p className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>Questions? Email us at <a className="underline hover:text-primary" href="mailto:intentextension@gmail.com">intentextension@gmail.com</a>.</span>
            </p>
          </div>
        </section>

        <div className="w-3/5 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent mx-auto my-10"></div>
        <div className="text-muted-foreground text-sm">© {new Date().getFullYear()} Intent. All rights reserved.</div>
      </main>
    </div>
  )
}


