
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header = ({ onAuthClick }: HeaderProps) => {
  const { user, subscription, signOut } = useAuth();

  return (
    <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">D</span>
          </div>
          <span className="text-white font-bold text-xl">DeepVoiceX</span>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-white">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user.email}</span>
                {subscription.subscribed && (
                  <Crown className="w-4 h-4 text-yellow-400" />
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut}
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button onClick={onAuthClick} className="bg-purple-600 hover:bg-purple-700">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
