import { c as createServerRpc, s as supabase } from './supabase-NWwdWcP4.mjs';
import { c as createServerFn } from './ssr.mjs';
import 'tiny-invariant';
import '@supabase/supabase-js';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import '@tanstack/history';
import '@tanstack/router-core/ssr/client';
import 'tiny-warning';
import '@tanstack/router-core';
import 'node:async_hooks';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

function validateEmail(e) {
  const email = e.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error("Please enter a valid email address");
  return email;
}
const addToWaitlist_createServerFn_handler = createServerRpc("src_lib_waitlist_ts--addToWaitlist_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return addToWaitlist.__executeServer(opts, signal);
});
const addToWaitlist = createServerFn({
  method: "POST"
}).validator((data) => {
  if (data instanceof FormData) {
    const v = data.get("email");
    if (!v) throw new Error("Please enter a valid email address");
    return {
      email: validateEmail(typeof v === "string" ? v : v.toString())
    };
  }
  if (typeof data === "string") {
    return {
      email: validateEmail(data)
    };
  }
  if (data && typeof data === "object" && "email" in data) {
    const v = data.email;
    if (typeof v !== "string") throw new Error("Please enter a valid email address");
    return {
      email: validateEmail(v)
    };
  }
  throw new Error("Please enter a valid email address");
}).handler(addToWaitlist_createServerFn_handler, async ({
  data: {
    email
  }
}) => {
  const {
    data: existing,
    error: checkError
  } = await supabase.from("waitlist").select("id").eq("email", email).limit(1);
  if (checkError) {
    throw new Error("Something went wrong. Please try again.");
  }
  if (existing && existing.length > 0) {
    return {
      success: false,
      error: "You're already on the waitlist!"
    };
  }
  const {
    error
  } = await supabase.from("waitlist").insert([{
    email
  }]);
  if (error) {
    throw new Error("Something went wrong. Please try again.");
  }
  return {
    success: true
  };
});

export { addToWaitlist_createServerFn_handler };
//# sourceMappingURL=waitlist-COX2vfmg.mjs.map
