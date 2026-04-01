import { createClient } from '@supabase/supabase-js';

// Helper to safely access environment variables in Vite/React
const getEnvVar = (key: string) => {
  let value = '';
  // Cast import.meta to any to avoid TS errors regarding 'env' property not existing on ImportMeta
  const meta = import.meta as any;
  if (meta && meta.env && meta.env[key]) {
    value = meta.env[key];
  }
  // Fallback for environments where process.env might be polyfilled
  else if (typeof process !== 'undefined' && process.env && process.env[key]) {
    value = process.env[key];
  }
  
  // Fallback for AI Studio environment where VITE_ prefix might be missing in process.env
  else {
    const altKey = key.startsWith('VITE_') ? key.substring(5) : `VITE_${key}`;
    if (typeof process !== 'undefined' && process.env && process.env[altKey]) {
      value = process.env[altKey];
    }
  }
  
  return value ? value.trim() : '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Mock client for development or when env vars are missing
const createMockClient = () => {
  console.warn("⚠️ Supabase keys missing or invalid. Using mock client with simulated authentication.");
  
  // Fake user for mock session
  const mockUser = {
    id: 'mock-user-123',
    email: 'demo@motlatsi.ls',
    user_metadata: { full_name: 'Demo Student' },
    role: 'authenticated'
  };

  const mockSession = {
    user: mockUser,
    access_token: 'mock-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    token_type: 'bearer'
  };

  // Generic builder for chaining
  const mockBuilder: any = {
    select: () => mockBuilder,
    eq: () => mockBuilder,
    order: () => Promise.resolve({ data: [], error: null }),
    single: () => Promise.resolve({ data: { id: mockUser.id, name: 'Demo Student', role: 'student', email: 'demo@motlatsi.ls', completed_topics: [], current_grade: '1' }, error: null }), // Return mock profile
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => mockBuilder,
    delete: () => mockBuilder,
    upsert: () => Promise.resolve({ data: null, error: null }),
    then: (resolve: any) => Promise.resolve({ data: [], error: null }).then(resolve)
  };

  return {
    from: (table: string) => mockBuilder,
    channel: (name: string) => ({
      on: (type: string, filter: any, callback: any) => ({ 
          subscribe: (cb: any) => { if(cb) cb('SUBSCRIBED'); } 
      }),
      presenceState: () => ({}),
      track: () => Promise.resolve(),
      subscribe: (callback: any) => { if(callback) callback('SUBSCRIBED'); },
      unsubscribe: () => {}
    }),
    removeChannel: () => {},
    auth: {
      // Simulate existing session if checking
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      
      // Simulate Successful Login for Demo
      signInWithPassword: ({ email, password }: any) => {
        console.log("Mock Login Success", email);
        // Dispatch event to trick AuthContext if needed, or just return success
        // In real app, AuthContext listens to state change. Here we just return session data.
        return Promise.resolve({ data: { user: mockUser, session: mockSession }, error: null });
      },
      signInWithOAuth: () => Promise.resolve({ data: { session: mockSession }, error: null }),
      signUp: ({ email }: any) => {
         console.log("Mock SignUp Success", email);
         return Promise.resolve({ data: { user: mockUser, session: mockSession }, error: null });
      },
      signOut: () => Promise.resolve({ error: null })
    }
  } as any;
};

// Only initialize the real client if URL and Key are valid non-empty strings and not placeholders
const isValidConfig = (() => {
  if (!supabaseUrl || typeof supabaseUrl !== 'string') return false;
  if (!supabaseAnonKey || typeof supabaseAnonKey !== 'string') return false;
  
  const url = supabaseUrl.trim();
  const key = supabaseAnonKey.trim();
  
  if (url.length === 0 || key.length === 0) return false;
  if (!url.startsWith('http')) return false;
  
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  
  // Check for common placeholders or invalid values
  const invalidValues = [
    'YOUR_SUPABASE_URL', 
    'YOUR_SUPABASE_ANON_KEY', 
    'your-project', 
    'your-anon-key',
    'undefined',
    'null'
  ];
  
  if (invalidValues.some(v => url.includes(v) || key.includes(v))) return false;
  
  return true;
})();

if (isValidConfig) {
    console.log("✅ Supabase initialized with project:", supabaseUrl.substring(0, 20) + "...");
} else {
    console.warn("⚠️ Supabase configuration invalid or missing. Using mock client.");
    console.log("Diagnostic - URL present:", !!supabaseUrl, "Key present:", !!supabaseAnonKey);
}

export const supabase = isValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: localStorage,
        persistSession: true,
      }
    })
  : createMockClient();