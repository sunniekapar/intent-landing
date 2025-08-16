import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

declare const chrome: any;

export const Route = createFileRoute("/auth-callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Processing authentication...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        console.log(
          "Session found, sending to extension:",
          session.user?.email
        );
        try {
          const extensionId = import.meta.env.VITE_EXTENSION_ID || "*";
          if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
            await chrome.runtime.sendMessage(extensionId, {
              type: "AUTH_SUCCESS",
              session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                user: session.user,
              },
            });
            console.log("Session sent to extension");
            await chrome.tabs.sendMessage(extensionId, {
              type: "CREATE_VISUAL_ELEMENT",
              elementType: "floating-popup", 
              position: { x: 100, y: 100 },
            });
          }
        } catch (error) {
          console.log("Extension not available:", error);
        }
      }

      setStatus("success");
      setMessage(
        "Authentication successful! Click the Intent extension icon to continue."
      );

      try {
        const extensionId = import.meta.env.VITE_EXTENSION_ID || "*";
        if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
          await chrome.runtime.sendMessage(extensionId, {
            type: "CLOSE_EXTENSION_TABS",
          });
          console.log("Requested to close extension tabs");
        }
      } catch (error) {
        console.log("Could not close extension tabs:", error);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-4 p-8">
        <div className="flex justify-center mb-8">
          <img src="/logo2.png" alt="Intent" className="w-24 h-24" />
        </div>

        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-white text-lg">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-white text-lg">{message}</p>
            {message.includes("extension icon") && (
              <div className="mt-6 space-y-4">
                <p className="text-white/60 text-sm">
                  The extension should open automatically, or you can click the
                  extension icon in your browser toolbar.
                </p>
                <button
                  onClick={() => window.close()}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Close This Tab
                </button>
              </div>
            )}
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <p className="text-white text-lg">{message}</p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
