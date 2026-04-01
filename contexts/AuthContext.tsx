
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { UserState } from '../types';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

interface AuthContextType {
  user: UserState | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUp: (email: string, password: string, metaData: any) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<UserState>) => void;
  setUser: (user: UserState | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      console.log("AUTH_DEBUG: Checking session...");
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("AUTH_DEBUG: Session found, fetching profile.");
        await fetchProfile(session.user);
      } else {
        console.log("AUTH_DEBUG: No session found.");
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      console.log("AUTH_DEBUG: Auth state changed:", event);
      if (session?.user) {
        console.log("AUTH_DEBUG: Session found in change, fetching profile.");
        await fetchProfile(session.user);
      } else {
        console.log("AUTH_DEBUG: No session found in change.");
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser: any) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.message === 'Failed to fetch') {
          throw new Error("Could not connect to Supabase. Please check your network or Supabase URL.");
      }

      if (data) {
        const mappedUser: UserState = {
          id: data.id,
          role: data.role as any,
          name: data.name,
          email: data.email,
          organization_id: data.organization_id,
          currentGrade: data.current_grade || '1',
          subject: data.subject,
          ai_credits: data.ai_credits,
          parentLinkCode: data.parent_link_code,
          completedTopics: [],
          linkedStudentIds: [],
          isDemo: data.is_demo || false,
        };
        setUser(mappedUser);
      } else {
        const newProfile = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            role: 'student', 
            current_grade: '1',
            ai_credits: 5,
            is_demo: false
        };

        const { error: insertError } = await supabase.from('profiles').insert(newProfile);
        
        if (!insertError) {
             const mappedUser: UserState = {
                id: newProfile.id,
                role: 'student',
                name: newProfile.name,
                email: newProfile.email,
                currentGrade: '1',
                ai_credits: 5,
                completedTopics: [],
                linkedStudentIds: [],
                isDemo: false,
             };
             setUser(mappedUser);
        }
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      if (error.message === 'Failed to fetch') {
          // If network fails, we might want to fallback to local storage if available
          const saved = localStorage.getItem('motlatsi_user');
          if (saved) {
              setUser(JSON.parse(saved));
          }
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
        return await supabase.auth.signInWithPassword({ email, password });
    } catch (error: any) {
        if (error.message === 'Failed to fetch') {
            return { data: {}, error: { message: "Network error: Could not reach Supabase." } };
        }
        throw error;
    }
  };

  const signUp = async (email: string, password: string, metaData: any) => {
    try {
        return await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metaData 
          }
        });
    } catch (error: any) {
        if (error.message === 'Failed to fetch') {
            return { data: {}, error: { message: "Network error: Could not reach Supabase. Check your URL configuration." } };
        }
        throw error;
    }
  };

  const signOut = async () => {
    console.log("AUTH_DEBUG: Sign out initiated...");
    try {
      // 1. Sign out of Supabase (only if we have a real session)
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.auth.signOut({ scope: 'global' });
        await supabase.auth.setSession({ access_token: '', refresh_token: '' });
      }
    } catch (error) {
      console.error('Error signing out from Supabase:', error);
    } finally {
      // 2. Aggressively clear session-related local storage keys, but PRESERVE seeded demo data
      const sessionKeys = [
          'motlatsi_user', 
          'motlatsi_is_demo', 
          'motlatsi_nav_view', 
          'motlatsi_nav_topic', 
          'motlatsi_nav_mode',
          'motlatsi_curriculum'
      ];
      
      // Also clear Supabase keys
      const sbKeys = Object.keys(localStorage).filter(key => key.startsWith('sb-'));
      
      [...sessionKeys, ...sbKeys].forEach(key => localStorage.removeItem(key));
      
      // 3. Clear session storage
      sessionStorage.clear();
      
      // 4. Reset React state
      setUser(null);
      setLoading(false);
      
      console.log("AUTH_DEBUG: Local state cleared. Redirecting to login...");
      
      // 5. Hard reload for APK environments to ensure memory is cleared
      if (window.location.pathname !== '/') {
          window.location.href = '/';
      } else {
          window.location.reload();
      }
    }
  };

  const updateUser = (updates: Partial<UserState>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
