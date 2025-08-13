import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { supabase } from '../lib/supabase';

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
        const provider = urlParams.get('provider');
        
        // Handle OAuth provider authentication
        if (provider) {
          // Initiate OAuth flow
          const { error } = await supabase.auth.signInWithOAuth({
            provider: provider as any,
            options: {
              redirectTo: `${window.location.origin}/auth-callback${isFromExtension ? '?extension=true' : ''}`
            }
          });
          
          if (error) {
            throw error;
          }
          return; // OAuth will redirect back to this page
        }

        // Get the session from the URL (after OAuth redirect or email confirmation)
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (!session) {
          // Check if we have auth parameters in the URL hash
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          
          if (accessToken) {
            // Set the session from the URL parameters
            const { data: { session: newSession }, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: hashParams.get('refresh_token') || '',
            });
            
            if (sessionError) throw sessionError;
            if (!newSession) throw new Error('Failed to establish session');
            
            await handleSuccessfulAuth(newSession, isFromExtension);
          } else {
            throw new Error('No session found');
          }
        } else {
          await handleSuccessfulAuth(session, isFromExtension);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  const handleSuccessfulAuth = async (session: any, isFromExtension: boolean) => {
    setStatus('success');
    setMessage('Authentication successful!');

    if (isFromExtension) {
      // Send session to extension
      try {
        // Get all extension IDs that might need the session
        // In production, you'd have a specific extension ID
        const extensionId = import.meta.env.VITE_EXTENSION_ID || '*';
        
        // Post message to extension
        if (chrome?.runtime?.sendMessage) {
          await chrome.runtime.sendMessage(extensionId, {
            type: 'AUTH_SUCCESS',
            session: {
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              user: session.user,
            }
          });
        } else {
          // Fallback: Use postMessage for communication
          window.postMessage({
            type: 'AUTH_SUCCESS',
            session: {
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              user: session.user,
            }
          }, '*');
        }

        setMessage('Authentication successful! You can close this tab and return to the extension.');
        
        // Auto-close after a delay
        setTimeout(() => {
          window.close();
        }, 3000);
      } catch (error) {
        console.error('Failed to send session to extension:', error);
        setMessage('Authentication successful! Please return to the extension.');
      }
    } else {
      // Regular web app flow - redirect to dashboard or home
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