import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useRef, useEffect, forwardRef, useState, useImperativeHandle, useCallback } from 'react';
import { PenLine, Loader2, Mail } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { c as createServerRpc, s as supabase } from './supabase-NWwdWcP4.mjs';
import { c as createServerFn } from './ssr.mjs';
import { useAnimation, motion } from 'motion/react';
import { isRedirect } from '@tanstack/router-core';
import { useRouter } from '@tanstack/react-router';
import 'tiny-invariant';
import '@supabase/supabase-js';
import '@tanstack/history';
import '@tanstack/router-core/ssr/client';
import 'tiny-warning';
import 'node:async_hooks';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const logo = "/logo2.png";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(
    async (...args) => {
      try {
        const res = await serverFn(...args);
        if (isRedirect(res)) {
          throw res;
        }
        return res;
      } catch (err) {
        if (isRedirect(err)) {
          err.options._fromLocation = router.state.location;
          return router.navigate(router.resolveRedirect(err).options);
        }
        throw err;
      }
    },
    [router, serverFn]
  );
}
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
function Flame({
  className,
  top
}) {
  const topStyle = top ? { top: typeof top === "number" ? `${top}px` : top } : {};
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative *:left-1/2 *:-translate-x-1/2 *:bottom-0 *:before:absolute *:before:bottom-0 *:before:content-[''] *:before:left-1/2 *:before:-translate-x-1/2", className),
      style: topStyle,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute size-25 -top-25 rounded-full bg-orange-600 blur-3xl fade-in animate-blink" }),
        /* @__PURE__ */ jsx("div", { className: "absolute w-5 h-11.5 rounded-[100%_100%_50%_50%] bg-blue-500/70 shadow-[0_-40px_30px_0_#dc8a0c,0_40px_50px_0_#dc8a0c,inset_3px_0_2px_0_rgba(0,133,255,0.6),inset_-3px_0_2px_0_rgba(0,133,255,0.6)] before:w-[70%] before:h-[60%] before:rounded-full before:bg-black/35 fade-in" }),
        /* @__PURE__ */ jsx("div", { className: "origin-bottom absolute w-5 h-20 rounded-[100%_100%_30%_30%] bg-[linear-gradient(white_80%,transparent)] animate-[var(--animate-move-flame),var(--animate-enlarge-flame)] before:w-full before:h-full before:rounded-[100%_100%_30%_30%] before:shadow-[0_0_15px_0_rgba(247,93,0,0.4),0_-6px_4px_0_rgba(247,128,0,0.7)]" })
      ]
    }
  );
}
const penVariants = {
  normal: {
    rotate: 0,
    x: 0,
    y: 0
  },
  animate: {
    rotate: [-0.5, 0.5, -0.5],
    x: [0, -1, 1.5, 0],
    y: [0, 1.5, -1, 0]
  }
};
const SquarePenIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal")
      };
    });
    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter == null ? void 0 : onMouseEnter(e);
        }
      },
      [controls, onMouseEnter]
    );
    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave == null ? void 0 : onMouseLeave(e);
        }
      },
      [controls, onMouseLeave]
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(className),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
        children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: size,
            height: size,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: { overflow: "visible" },
            children: [
              /* @__PURE__ */ jsx("path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
              /* @__PURE__ */ jsx(
                motion.path,
                {
                  d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
                  variants: penVariants,
                  animate: controls
                }
              )
            ]
          }
        )
      }
    );
  }
);
SquarePenIcon.displayName = "SquarePenIcon";
const pathVariants$1 = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 }
    }
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.5, 1],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 }
    }
  }
};
const ShieldCheckIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal")
      };
    });
    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter == null ? void 0 : onMouseEnter(e);
        }
      },
      [controls, onMouseEnter]
    );
    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave == null ? void 0 : onMouseLeave(e);
        }
      },
      [controls, onMouseLeave]
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(className),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
        children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: size,
            height: size,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsx("path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }),
              /* @__PURE__ */ jsx(
                motion.path,
                {
                  variants: pathVariants$1,
                  initial: "normal",
                  animate: controls,
                  d: "m9 12 2 2 4-4"
                }
              )
            ]
          }
        )
      }
    );
  }
);
ShieldCheckIcon.displayName = "ShieldCheckIcon";
const handVariants = {
  normal: {
    rotate: 0,
    originX: "0%",
    originY: "100%",
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  animate: {
    rotate: 300,
    originX: "0%",
    originY: "100%",
    transition: {
      delay: 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};
const buttonVariants = {
  normal: {
    scale: 1,
    y: 0
  },
  animate: {
    scale: [0.9, 1],
    y: [0, 1, 0],
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};
const TimerIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal")
      };
    });
    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter == null ? void 0 : onMouseEnter(e);
        }
      },
      [controls, onMouseEnter]
    );
    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave == null ? void 0 : onMouseLeave(e);
        }
      },
      [controls, onMouseLeave]
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(className),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
        children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: size,
            height: size,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsx(
                motion.line,
                {
                  x1: "10",
                  x2: "14",
                  y1: "2",
                  y2: "2",
                  animate: controls,
                  variants: buttonVariants
                }
              ),
              /* @__PURE__ */ jsx(
                motion.line,
                {
                  x1: "12",
                  x2: "15",
                  y1: "14",
                  y2: "11",
                  initial: "normal",
                  animate: controls,
                  variants: handVariants
                }
              ),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "14", r: "8" })
            ]
          }
        )
      }
    );
  }
);
TimerIcon.displayName = "TimerIcon";
const variants = {
  normal: {
    x: 0,
    y: 0
  },
  animate: {
    x: [0, 0, -3, 2, -2, 1, -1, 0],
    y: [0, -3, 0, -2, -3, -1, -2, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
    }
  }
};
const fireVariants = {
  normal: {
    d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
  },
  animate: {
    d: [
      "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      "M4.5 16.5c-1.5 1.26-3 5.5-3 5.5s4.74-1 6-2.5c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      "M4.5 16.5c-1.5 1.26-2.2 4.8-2.2 4.8s3.94-0.3 5.2-1.8c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      "M4.5 16.5c-1.5 1.26-2.8 5.2-2.8 5.2s4.54-0.7 5.8-2.2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
    ],
    transition: {
      duration: 2,
      ease: [0.4, 0, 0.2, 1],
      repeat: Infinity,
      times: [0, 0.2, 0.5, 0.8, 1]
    }
  }
};
const RocketIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal")
      };
    });
    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter == null ? void 0 : onMouseEnter(e);
        }
      },
      [controls, onMouseEnter]
    );
    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave == null ? void 0 : onMouseLeave(e);
        }
      },
      [controls, onMouseLeave]
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(className),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
        children: /* @__PURE__ */ jsxs(
          motion.svg,
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: size,
            height: size,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            variants,
            animate: controls,
            children: [
              /* @__PURE__ */ jsx(
                motion.path,
                {
                  d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
                  variants: fireVariants,
                  animate: controls
                }
              ),
              /* @__PURE__ */ jsx("path", { d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" }),
              /* @__PURE__ */ jsx("path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" }),
              /* @__PURE__ */ jsx("path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" })
            ]
          }
        )
      }
    );
  }
);
RocketIcon.displayName = "RocketIcon";
const pathVariants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 }
    }
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.5, 1],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 }
    }
  }
};
const CheckIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal")
      };
    });
    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter == null ? void 0 : onMouseEnter(e);
        }
      },
      [controls, onMouseEnter]
    );
    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave == null ? void 0 : onMouseLeave(e);
        }
      },
      [controls, onMouseLeave]
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(className),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: size,
            height: size,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx(
              motion.path,
              {
                variants: pathVariants,
                initial: "normal",
                animate: controls,
                d: "M4 12 9 17L20 6"
              }
            )
          }
        )
      }
    );
  }
);
CheckIcon.displayName = "CheckIcon";
function Feature({
  renderIcon,
  title
}) {
  const iconRef = useRef(null);
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-w-0 max-w-[360px] sm:max-w-[320px] text-center group px-2", onMouseEnter: () => {
    var _a, _b;
    return (_b = (_a = iconRef.current) == null ? void 0 : _a.startAnimation) == null ? void 0 : _b.call(_a);
  }, onMouseLeave: () => {
    var _a, _b;
    return (_b = (_a = iconRef.current) == null ? void 0 : _a.stopAnimation) == null ? void 0 : _b.call(_a);
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "size-24 rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl", children: renderIcon(iconRef) }),
    /* @__PURE__ */ jsx("h3", { className: "text-[20px] sm:text-[22px] md:text-2xl font-semibold text-primary tracking-tight leading-snug break-words whitespace-normal max-w-[20ch] sm:max-w-[16ch] md:max-w-[18ch] mx-auto", children: title })
  ] });
}
function IntentionDemo() {
  const [state, setState] = useState({
    input: "",
    phase: "idle"
  });
  const isValid = state.input.trim().length > 10;
  const isSubmitting = state.phase === "submitting";
  const isSuccess = state.phase === "success";
  const showOverlay = state.phase !== "hidden";
  const siteBlurred = showOverlay;
  const submitDemo = () => {
    if (!isValid || isSubmitting) return;
    setState((s) => ({
      ...s,
      phase: "submitting"
    }));
    setTimeout(() => {
      setState((s) => ({
        ...s,
        phase: "success"
      }));
      setTimeout(() => {
        setState((s) => ({
          ...s,
          phase: "hidden"
        }));
      }, 3e3);
    }, 1500);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-primary/80 backdrop-blur-lg rounded-xl md:rounded-4xl shadow-2xl overflow-hidden relative h-[480px] sm:h-[520px] md:h-[560px] flex items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-linear-to-br from-primary to-primary transition-all duration-1000 flex items-center justify-center text-primary-foreground ${siteBlurred ? "blur-2xl" : "blur-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "text-center opacity-70", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold mb-2", children: "Sample Website" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg", children: "This represents a potentially distracting website" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `absolute inset-0 transition-opacity duration-1000 ${showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"}`, children: [
      /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0 z-0 bg-radial-[ellipse_80%_60%_at_50%_0%] from-primary to-transparent to-70% transition-colors duration-1000", isSuccess && "from-orange-900/20") }),
      /* @__PURE__ */ jsxs("div", { className: cn("relative space-y-8 w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-full px-4", isSuccess && "animate-slide-out-up delay-1000"), children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center relative animate-slide-in-up", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2 bottom-10.5", children: /* @__PURE__ */ jsx(Flame, { className: cn("scale-35 scale-x-45", isSuccess ? "animate-flame-ignition" : "opacity-0 scale-0") }) }),
          /* @__PURE__ */ jsx("img", { src: logo, alt: "Logo", className: cn("size-24 opacity-80 transition-all duration-500", isSuccess && ["rounded-full", "bg-[radial-gradient(circle,color-mix(in_srgb,rgb(251,146,60)_15%,transparent)_60%,transparent_100%)]", "shadow-[0_0_40px_10px_rgb(251,146,60),0_0_0_4px_color-mix(in_srgb,rgb(251,146,60)_8%,transparent)]", "opacity-100"]) })
        ] }),
        !isSuccess ? /* @__PURE__ */ jsxs("div", { className: cn("relative w-full border-2 border-transparent rounded-xl animate-intention-glow", "animate-slide-in-up delay-150"), children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 flex w-full justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-[1px] animate-border-width rounded-full bg-gradient-to-r from-transparent via-orange-700 to-transparent transition-all duration-1000" }) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(PenLine, { className: "absolute left-4 top-5.5 size-4 text-primary-foreground/60 z-10" }),
            isSubmitting && /* @__PURE__ */ jsx(Loader2, { className: "absolute right-4 top-4 size-4 text-primary-foreground/60 z-10 animate-spin" }),
            /* @__PURE__ */ jsx("textarea", { value: state.input, onChange: (e) => setState((s) => ({
              ...s,
              input: e.target.value
            })), className: "w-full p-4 text-lg resize-none rounded-xl shadow-lg pl-10 pr-10 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground border border-primary-foreground/10 placeholder-primary-foreground/40 focus:border-primary-foreground/20 focus:outline-none min-h-[120px]", placeholder: "What is your intention for this site?", disabled: isSubmitting, onKeyDown: (e) => {
              if (e.key === "Enter" && !e.shiftKey && isValid) {
                e.preventDefault();
                submitDemo();
              }
            } })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "animate-slide-in-up text-center mt-6 max-w-prose px-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed break-words overflow-hidden font-medium text-orange-500/80", children: state.input }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-foreground/60 mt-2", children: "Your intention has been set" })
        ] })
      ] })
    ] })
  ] });
}
function Waitlist() {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const addEmail = useServerFn(addToWaitlist);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email.trim());
  const submitting = phase === "submitting";
  const success = phase === "success";
  const error = phase === "error";
  const submit = async (e) => {
    e == null ? void 0 : e.preventDefault();
    if (!isValid || submitting) return;
    setPhase("submitting");
    setErrorMessage("");
    try {
      const result = await addEmail({
        data: email
      });
      if (result == null ? void 0 : result.success) {
        setPhase("success");
        setEmail("");
      } else {
        setPhase("error");
        setErrorMessage((result == null ? void 0 : result.error) || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting email:", err);
      setPhase("error");
      setErrorMessage((err == null ? void 0 : err.message) || "Something went wrong. Please try again.");
    }
  };
  if (success) {
    return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-primary/80 text-primary-foreground border border-primary-foreground/10 shadow-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_0%] from-primary to-transparent opacity-60" }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center gap-3 px-5 py-4", children: [
        /* @__PURE__ */ jsx(CheckIcon, { size: 22, className: "text-orange-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-base sm:text-lg font-medium", children: "You\u2019re on the list! We\u2019ll email you when Intent is live." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, action: addToWaitlist.url, method: "POST", encType: "multipart/form-data", className: cn("relative overflow-hidden rounded-2xl bg-primary-foreground/5 transition-all", "shadow-lg hover:shadow-xl focus-within:shadow-2xl shadow-black/5 focus-within:shadow-black/10", error && "ring-2 ring-red-500/20"), children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial-[ellipse_120%_80%_at_50%_-10%] from-orange-500/10 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 sm:p-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "sr-only", children: "Email" }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx(Mail, { className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary-foreground/40" }),
          /* @__PURE__ */ jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", "aria-invalid": email.length > 0 && !isValid, value: email, onChange: (e) => {
            setEmail(e.target.value);
            if (error) {
              setPhase("idle");
              setErrorMessage("");
            }
          }, placeholder: "you@example.com", className: cn("w-full rounded-xl bg-background text-foreground placeholder-primary-foreground/40", "px-11 py-3 shadow-inner", "focus:outline-none", email.length > 0 && !isValid && "ring-2 ring-red-500/20"), required: true })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: !isValid || submitting, style: {
          backgroundColor: !isValid || submitting ? "#9CA3AF" : "#F97316",
          cursor: !isValid || submitting ? "not-allowed" : "pointer",
          opacity: !isValid || submitting ? 0.6 : 1
        }, className: "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white transition-all duration-200 min-w-[12rem]", children: submitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "mr-2 size-4 animate-spin" }),
          " Adding\u2026"
        ] }) : "Join the waitlist" })
      ] })
    ] }),
    error && errorMessage && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm font-medium text-center", children: errorMessage }) })
  ] });
}
const SplitComponent = function Landing() {
  const bottomRef = useRef(null);
  const headerCtaRef = useRef(null);
  const handleGetExtensionClick = () => {
    console.log("[Intent] Get Extension button clicked");
    return;
  };
  useEffect(() => {
    const el = headerCtaRef.current;
    if (!el) return;
    const nativeHandler = () => {
      console.log("[Intent] Native listener: Get Extension click captured");
    };
    el.addEventListener("click", nativeHandler, true);
    return () => {
      el.removeEventListener("click", nativeHandler, true);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Intent logo", className: "size-7 rounded-lg" }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-primary", children: "Intent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-6 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("button", { className: "hover:text-primary transition-colors", children: "FAQs" }),
        /* @__PURE__ */ jsx("button", { ref: headerCtaRef, onClickCapture: () => console.log("[Intent] Header Get Extension onClickCapture"), onClick: handleGetExtensionClick, className: "bg-orange-500 text-white px-4 py-2 font-medium shadow-sm shadow-orange-500/30 hover:bg-orange-600 active:scale-[100.5%] rounded-lg", children: "Get Extension" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial-[at_50%_90%] from-orange-500/[0.05] from-0% to-transparent to-65%" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial-[at_50%_95%] from-orange-500/[0.04] from-0% to-transparent to-75%" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial-[at_50%_100%] from-orange-500/[0.07] from-0% to-transparent to-85%" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-40 sm:pt-44 px-6 max-w-[1200px] mx-auto", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-[48px] sm:text-[72px] lg:text-[112px] font-semibold text-primary leading-[0.9] tracking-tight mb-6", children: [
        "Browse with",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("span", { className: "relative inline-block", children: [
          /* @__PURE__ */ jsx("span", { className: "relative z-10 px-1", children: "intention" }),
          /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 right-0 h-[45%] bg-linear-to-t from-orange-500/80 to-orange-500/60 -z-0" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-2xl text-muted-foreground max-w-3xl", children: "Intent keeps you grounded by asking for your purpose before accessing any distracting website." }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 hidden", children: /* @__PURE__ */ jsxs("button", { onClick: handleGetExtensionClick, className: "group relative inline-flex items-center justify-center overflow-hidden bg-orange-500 text-white px-8 py-4 rounded-xl text-lg sm:text-xl font-semibold transition-all duration-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40", children: [
        /* @__PURE__ */ jsx("span", { className: "transition-all duration-300 group-hover:-translate-x-40 group-hover:opacity-0", children: "Get Started" }),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 flex items-center justify-center transition-all duration-300 translate-x-40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100", children: /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1200px] mx-auto mb-24 px-6 mt-16 sm:mt-24", children: /* @__PURE__ */ jsx(IntentionDemo, {}) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1200px] mx-auto px-6 pb-24", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12 mt-12 sm:mt-16 justify-items-center", children: [
      /* @__PURE__ */ jsx(Feature, { renderIcon: (ref) => /* @__PURE__ */ jsx(SquarePenIcon, { ref, size: 56 }), title: "Set your intention" }),
      /* @__PURE__ */ jsx(Feature, { renderIcon: (ref) => /* @__PURE__ */ jsx(ShieldCheckIcon, { ref, size: 56 }), title: "Stay focused" }),
      /* @__PURE__ */ jsx(Feature, { renderIcon: (ref) => /* @__PURE__ */ jsx(TimerIcon, { ref, size: 56 }), title: "Gentle reminders" }),
      /* @__PURE__ */ jsx(Feature, { renderIcon: (ref) => /* @__PURE__ */ jsx(RocketIcon, { ref, size: 56 }), title: "Build better habits" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { ref: bottomRef, className: "text-center py-20 px-6", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xl sm:text-2xl md:text-3xl font-semibold text-primary max-w-3xl mx-auto", children: [
        "We\u2019re putting the finishing touches on Intent to meet the latest Chrome Web Store requirements.",
        /* @__PURE__ */ jsx("span", { className: "block mt-2 text-muted-foreground font-normal text-lg sm:text-xl", children: "Get notified as soon as we\u2019re live again." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto", children: /* @__PURE__ */ jsx(Waitlist, {}) }),
      /* @__PURE__ */ jsx("div", { className: "w-3/5 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent mx-auto my-10" }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-sm pb-10", children: [
        "\xA9 2025 Intent. All rights reserved.",
        /* @__PURE__ */ jsx("a", { href: "/privacy", className: "underline hover:text-primary ml-2", children: "Privacy" })
      ] })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=index-8UMMSu9F.mjs.map
