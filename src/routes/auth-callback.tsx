import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { supabase } from '../lib/supabase';

declare const chrome: any;

export const Route = createFileRoute('/auth-callback')({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const isFromExtension = urlParams.get('extension') === 'true';
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          throw error;
        }
        
        if (session) {
          console.log('Session found:', session.user?.email);
          await handleSuccessfulAuth(session, isFromExtension);
        } else {
          setStatus('error');
          setMessage('Please check your email for the confirmation link to complete signup.');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  const openExtension = async () => {
    console.log('Authentication successful, user should click extension icon to open');
    
    setTimeout(() => {
      setMessage('Authentication successful! Click the Intent extension icon in your browser toolbar to continue.');
    }, 1500);
  };

  const handleSuccessfulAuth = async (session: any, isFromExtension: boolean) => {
    setStatus('success');
    setMessage('Authentication successful!');

    if (isFromExtension) {
      try {
        const extensionId = import.meta.env.VITE_EXTENSION_ID || '*';
        
        if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
          await chrome.runtime.sendMessage(extensionId, {
            type: 'AUTH_SUCCESS',
            session: {
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              user: session.user,
            }
          });
          setMessage('Authentication successful! Opening extension...');
        } else {
          window.postMessage({
            type: 'AUTH_SUCCESS',
            session: {
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              user: session.user,
            }
          }, '*');
        }
        
        try {
          if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
            await chrome.runtime.sendMessage(extensionId, {
              type: 'CLOSE_AUTH_TABS',
              origin: window.location.origin
            });
          }
        } catch (error) {
          console.log('Could not request tab closure:', error);
        }
        
        await openExtension();
        
      } catch (error) {
        console.error('Failed to send session to extension:', error);
        setMessage('Authentication successful! Click the Intent extension icon to continue.');
      }
    } else {
      setTimeout(() => {
        navigate({ to: '/' });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-4 p-8">
        <div className="flex justify-center mb-8">
          <img src="/logo2.png" alt="Intent" className="w-24 h-24" />
        </div>
        
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-white text-lg">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-white text-lg">{message}</p>
            {message.includes('extension icon') && (
              <div className="mt-6 space-y-4">
                <p className="text-white/60 text-sm">
                  The extension should open automatically, or you can click the extension icon in your browser toolbar.
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
        
        {status === 'error' && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <p className="text-white text-lg">{message}</p>
            <button 
              onClick={() => navigate({ to: '/' })}
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