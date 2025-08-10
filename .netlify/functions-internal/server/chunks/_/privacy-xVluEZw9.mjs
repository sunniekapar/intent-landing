import { jsxs, jsx } from 'react/jsx-runtime';
import { Mail } from 'lucide-react';
import { useRef } from 'react';

const SplitComponent = function PrivacyPage() {
  const headerCtaRef = useRef(null);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Intent logo", className: "size-7 rounded-lg" }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-primary", children: "Intent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-6 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("a", { href: "/", className: "hover:text-primary transition-colors", children: "Home" }),
        /* @__PURE__ */ jsx("button", { ref: headerCtaRef, className: "bg-orange-500 text-white px-4 py-2 font-medium shadow-sm shadow-orange-500/30 hover:bg-orange-600 active:scale-[100.5%] rounded-lg", children: "Get Extension" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial-[at_50%_90%] from-orange-500/[0.05] from-0% to-transparent to-65%" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial-[at_50%_95%] from-orange-500/[0.04] from-0% to-transparent to-75%" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial-[at_50%_100%] from-orange-500/[0.07] from-0% to-transparent to-85%" })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "pt-28 sm:pt-32 pb-24 px-6 max-w-[900px] mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-semibold text-primary tracking-tight mb-6", children: "Privacy Policy" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-10", children: [
        "Last updated: ",
        (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-6 leading-relaxed text-foreground/90", children: [
        /* @__PURE__ */ jsx("p", { children: "Your privacy matters. This page explains what information Intent may collect, how we use it, and the choices you have. We design Intent to minimize data collection and keep everything on your device whenever possible." }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-primary mb-2", children: "Information We Collect" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Usage intentions you enter within the extension (stored locally in your browser whenever possible)." }),
            /* @__PURE__ */ jsx("li", { children: "Email address if you join our waitlist on the website." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-primary mb-2", children: "How We Use Information" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Provide and improve Intent\u2019s features and user experience." }),
            /* @__PURE__ */ jsx("li", { children: "Send product updates if you opt-in via the waitlist." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-primary mb-2", children: "Data Retention" }),
          /* @__PURE__ */ jsx("p", { children: "We retain information only as long as necessary to deliver the service or as required by law." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-primary mb-2", children: "Your Choices" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
            /* @__PURE__ */ jsx("li", { children: "You can request deletion of your waitlist email at any time." }),
            /* @__PURE__ */ jsx("li", { children: "You can uninstall the extension to stop any local data collection." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-primary mb-2", children: "Contact Us" }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "size-4" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Questions? Email us at ",
              /* @__PURE__ */ jsx("a", { className: "underline hover:text-primary", href: "mailto:hello@useintent.app", children: "hello@useintent.app" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-3/5 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent mx-auto my-10" }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-sm", children: [
        "\xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Intent. All rights reserved."
      ] })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=privacy-xVluEZw9.mjs.map
