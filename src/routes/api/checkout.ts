import { createServerFileRoute } from '@tanstack/react-start/server'
import { Checkout } from "@polar-sh/tanstack-start";

export const ServerRoute = createServerFileRoute('/api/checkout').methods({
  GET: Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN!,
    successUrl: `${process.env.VITE_APP_URL || 'http://localhost:4000'}/subscription-success`,
    theme: "light",
  }),
})