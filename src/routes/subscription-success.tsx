import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/subscription-success')({
  component: SubscriptionSuccess,
  head: () => ({
    meta: [
      {
        title: 'Subscription Activated — Intent',
      },
      {
        name: 'description',
        content: 'Your Intent subscription has been successfully activated.'
      },
    ],
  }),
})

function SubscriptionSuccess() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <CheckCircle className="size-20 text-green-500" />
            <div className="absolute inset-0 animate-ping">
              <CheckCircle className="size-20 text-green-500 opacity-30" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold text-primary mb-3">
          Subscription Activated!
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Your Intent Premium subscription is now active. You can return to the extension to enjoy all premium features.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => window.close()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Return to Extension
          </button>
          
          <p className="text-sm text-muted-foreground">
            You can close this tab and continue using Intent with all premium features unlocked.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary/10">
          <p className="text-sm text-muted-foreground">
            Need help? Contact us at{' '}
            <a href="mailto:hello@useintent.app" className="text-orange-500 hover:text-orange-600 underline">
              hello@useintent.app
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}