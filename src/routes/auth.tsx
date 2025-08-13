import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '../lib/supabase';

export const Route = createFileRoute('/auth')({
  component: AuthInitiate,
});

function AuthInitiate() {
  useEffect(() => {
    const initiateAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const provider = urlParams.get('provider');
      const isFromExtension = urlParams.get('extension') === 'true';
      
      if (provider === 'google') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth-callback${isFromExtension ? '?extension=true' : ''}`
          }
        });
        
        if (error) {
          console.error('OAuth initiation error:', error);
        }
      }
    };

    initiateAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-4 p-8">
        <div className="flex justify-center mb-8">
          <img src="/logo2.png" alt="Intent" className="w-24 h-24" />
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
        <p className="text-white text-lg">Redirecting to authentication provider...</p>
      </div>
    </div>
  );
}