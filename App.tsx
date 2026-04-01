
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { UserRole, UserState, Topic, AccessibilitySettings, Curriculum, StudyMode, AppView } from './types';
import { curriculumData as defaultCurriculum } from './curriculum';
import { LearningEngineProvider } from './contexts/LearningEngineContext';
import { AuthProvider, useAuth } from './contexts/AuthContext'; 
import { VoiceAccessProvider, useVoiceAccess } from './contexts/VoiceAccessContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { seedDemoData } from './utils/demoDataSeeder'; 
import { 
  Map, LayoutDashboard, UserCircle, PenTool, LogOut, Shield, Library, Settings, 
  BookOpenCheck, Users, CalendarDays, Key, BookCopy, Swords, Loader2, AlertCircle, X
} from 'lucide-react';

// Critical Path Components (Eager Load)
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import MotlatsiLogo from './components/MotlatsiLogo';
import BlindModeUI from './components/BlindModeUI'; 
import BattleArena from './components/BattleArena';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkStatus from './components/NetworkStatus'; 
import TeacherDashboard from './components/TeacherDashboard'; // Eager load for debugging

// Lazy Load Heavy Components
const LessonWizard = React.lazy(() => import('./components/LessonWizard'));
const WorksheetGenerator = React.lazy(() => import('./components/WorksheetGenerator')); 
const JourneyMap = React.lazy(() => import('./components/JourneyMap'));
const SocraticChat = React.lazy(() => import('./components/SocraticChat'));
const ChalkboardView = React.lazy(() => import('./components/ChalkboardView'));
import ResourceLibrary from './components/ResourceLibrary';
// const ResourceLibrary = React.lazy(() => import('./components/ResourceLibrary'));
const UserProfile = React.lazy(() => import('./components/UserProfile'));
const QuizInterface = React.lazy(() => import('./components/QuizInterface'));
const StudentHub = React.lazy(() => import('./components/StudentHub'));
const TeacherClassroom = React.lazy(() => import('./components/TeacherClassroom'));
// const TeacherDashboard = React.lazy(() => import('./components/TeacherDashboard')); // Commented out
const SmartScheduler = React.lazy(() => import('./components/SmartScheduler'));
const StudentDashboard = React.lazy(() => import('./components/StudentDashboard'));
const ParentDashboard = React.lazy(() => import('./components/ParentDashboard'));
const ChoiceHub = React.lazy(() => import('./components/ChoiceHub'));
const InclusiveFlashcard = React.lazy(() => import('./components/InclusiveFlashcard'));
const InclusiveAudio = React.lazy(() => import('./components/InclusiveAudio'));
const InclusiveQuiz = React.lazy(() => import('./components/InclusiveQuiz'));
const InteractiveLesson = React.lazy(() => import('./components/InteractiveLesson')); 
const RevisionNotes = React.lazy(() => import('./components/RevisionNotes'));
const AccessibilitySettingsView = React.lazy(() => import('./components/AccessibilitySettings'));
const StudentLibrary = React.lazy(() => import('./components/StudentLibrary'));

// Admin Dedicated Components
const AdminOverview = React.lazy(() => import('./components/AdminOverview'));
const AdminUsers = React.lazy(() => import('./components/AdminUsers'));
const AdminCurriculum = React.lazy(() => import('./components/AdminCurriculumManager'));

// Lazy Load Bulk Planner Components
const BulkPlannerDashboard = React.lazy(() => import('./components/BulkPlannerDashboard'));
const BulkUnitCreator = React.lazy(() => import('./components/BulkUnitCreator'));
const BulkReporter = React.lazy(() => import('./components/BulkReporter'));
const ParentPortal = React.lazy(() => import('./components/ParentPortal'));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});

const LoadingFallback = () => (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[50vh] text-teacherBlue/50 animate-pulse">
        <Loader2 className="animate-spin mb-2" size={32} />
        <span className="text-xs font-bold uppercase tracking-widest">Loading Resource...</span>
    </div>
);

import { aiClient } from './src/utils/aiClient';

const MagicGestureListener: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { toggleBlindMode, playEarcon } = useVoiceAccess();
    const pressTimer = useRef<any>(null);
    const warningTimer = useRef<any>(null);
    const hasTriggered = useRef(false);

    const startPress = () => {
        hasTriggered.current = false;
        warningTimer.current = setTimeout(() => {
            if (!hasTriggered.current) {
                playEarcon('rising');
            }
        }, 1000);

        pressTimer.current = setTimeout(() => {
            if (!hasTriggered.current) {
                toggleBlindMode();
                hasTriggered.current = true;
            }
        }, 1500); 
    };

    const cancelPress = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current);
        if (warningTimer.current) clearTimeout(warningTimer.current);
        pressTimer.current = null;
        warningTimer.current = null;
    };

    return (
        <div 
            onTouchStart={startPress} 
            onTouchEnd={cancelPress}
            onTouchMove={cancelPress} 
            onMouseDown={startPress} 
            onMouseUp={cancelPress}
            onMouseMove={cancelPress} 
            onMouseLeave={cancelPress}
            className="h-full w-full"
        >
            {children}
        </div>
    );
};

const AppContent: React.FC<{ user: UserState }> = ({ user }) => {
  const { signOut, updateUser, setUser } = useAuth();
  const { addToast } = useToast();
  const authUser = user;
  const authLoading = false; // authLoading is handled in AppWithUser

  const [currentView, setCurrentView] = useState<AppView>(() => {
      const saved = localStorage.getItem('motlatsi_nav_view');
      return (saved as AppView) || 'dashboard';
  });

  const [parentLinkCode, setParentLinkCode] = useState<string | null>(null);

  // URL Parsing for Parent Portal
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/parent\/([a-zA-Z0-9-]+)/);
    if (match && match[1]) {
        setParentLinkCode(match[1]);
    }
  }, []);

  const [showQuotaWarning, setShowQuotaWarning] = useState(false);

  // Listen for AI quota exceeded events
  useEffect(() => {
    aiClient.onQuotaExceeded = () => {
        setShowQuotaWarning(true);
    };
    
    aiClient.onConsumeCredit = async (params: any) => {
        if (!authUser) return true;
        
        // 1. Demo User: Use local credits
        if (authUser.isDemo) {
            const currentCredits = authUser.ai_credits ?? (authUser.role === 'student' ? 5 : 10);
            if (currentCredits <= 0) {
                addToast("Demo quota reached! Try exploring cached topics.", "error");
                return false;
            }
            updateUser({ ai_credits: currentCredits - 1 });
            return true;
        }
        
        // 2. Production User: Check Organization Quota
        const orgId = params?.orgId || authUser.organization_id;
        if (!orgId) return true; // Fallback if no org linked

        try {
            const { supabase } = await import('./lib/supabase');
            
            // Fetch current quota
            const { data: org, error } = await supabase
                .from('organizations')
                .select('ai_quota, used_quota')
                .eq('id', orgId)
                .single();

            if (error || !org) return true; // Safe fallback

            if (org.used_quota >= org.ai_quota) {
                addToast("School AI quota reached. Please contact your administrator.", "error");
                return false;
            }

            // Increment used quota (optimistic update on server)
            await supabase.rpc('increment_org_quota', { org_id: orgId });
            
            return true;
        } catch (e) {
            console.error("Quota check failed", e);
            return true; // Allow if check fails to prevent blocking users
        }
    };

    return () => {
        aiClient.onQuotaExceeded = null;
        aiClient.onConsumeCredit = null;
    };
  }, [authUser, updateUser, addToast]);

  const handleOpenKeySelector = async () => {
    try {
        // @ts-expect-error - window.aistudio is injected by the platform
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
            // @ts-expect-error - window.aistudio is injected by the platform
            await window.aistudio.openSelectKey();
            setShowQuotaWarning(false);
            addToast("API Key selection opened. Please select your paid project key.", "info");
        } else {
            addToast("API Key selector is not available in this environment.", "error");
        }
    } catch (e) {
        console.error("Failed to open key selector", e);
        addToast("Failed to open API Key selector.", "error");
    }
  };

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(() => {
      const saved = localStorage.getItem('motlatsi_nav_topic');
      return saved ? JSON.parse(saved) : null;
  });

  const [studyMode, setStudyMode] = useState<StudyMode>(() => {
      return (localStorage.getItem('motlatsi_nav_mode') as StudyMode) || 'intro';
  });

  const [coveredObjectives, setCoveredObjectives] = useState<string[]>([]);
  const [wizardContent, setWizardContent] = useState<string | undefined>(undefined);
  const [curriculum, setCurriculum] = useState<Curriculum>(() => {
      // Only load from localStorage if it's a demo user
      // Note: authUser might be null here, so we check if there's a demo user flag in localStorage
      const isDemo = localStorage.getItem('motlatsi_is_demo') === 'true';
      if (isDemo) {
          const saved = localStorage.getItem('motlatsi_curriculum');
          if (saved) {
              try {
                  return JSON.parse(saved);
              } catch (e) {
                  console.error("Failed to parse saved curriculum", e);
              }
          }
      }
      return defaultCurriculum;
  });

  // Fetch curriculum from Supabase on mount if real user
  useEffect(() => {
      const fetchCurriculum = async () => {
          if (authUser && !authUser.isDemo && authUser.school) {
              try {
                  const { supabase } = await import('./lib/supabase');
                  const { data, error } = await supabase
                      .from('school_settings')
                      .select('curriculum_data')
                      .eq('school_name', authUser.school)
                      .single();
                  
                  if (data && data.curriculum_data) {
                      setCurriculum(data.curriculum_data);
                  }
              } catch (err) {
                  console.error("Failed to fetch curriculum from Supabase", err);
              }
          }
      };
      
      fetchCurriculum();
  }, [authUser]);
  
  const [accessSettings, setAccessSettings] = useState<AccessibilitySettings>({
    dyslexicFont: false,
    highContrast: false,
    simplifiedLanguage: false,
    autoTranscript: true,
    dataSaver: false
  });

  useEffect(() => {
     if (!authLoading && authUser) {
       if (authUser.role === 'admin' && currentView === 'dashboard') {
           setTimeout(() => setCurrentView('admin'), 0);
       } else if (!localStorage.getItem('motlatsi_nav_view')) {
           const target = authUser.role === 'admin' ? 'admin' : 'dashboard';
           if (currentView !== target) {
               setTimeout(() => setCurrentView(target), 0);
           }
       }
     }
  }, [authUser, authLoading, currentView]);

  useEffect(() => {
      if (authUser?.isDemo) {
          localStorage.setItem('motlatsi_nav_view', currentView);
          if (selectedTopic) {
              localStorage.setItem('motlatsi_nav_topic', JSON.stringify(selectedTopic));
          } else {
              localStorage.removeItem('motlatsi_nav_topic');
          }
          localStorage.setItem('motlatsi_nav_mode', studyMode);
      }
  }, [currentView, selectedTopic, studyMode, authUser]);

  const handleLegacyLogin = (newUser: UserState) => {
    if (!newUser || !newUser.id || !newUser.role) {
        console.error("Invalid user data received during login:", newUser);
        return;
    }
    
    // Reset all session state to prevent remnants
    setSelectedTopic(null);
    setStudyMode('intro');
    setCoveredObjectives([]);
    setWizardContent(undefined);
    
    // Clear navigation persistence
    localStorage.removeItem('motlatsi_nav_view');
    localStorage.removeItem('motlatsi_nav_topic');
    localStorage.removeItem('motlatsi_nav_mode');
    
    setUser(newUser);
    
    // Force landing on the correct role's dashboard
    if (newUser.role === 'admin') setCurrentView('admin');
    else if (newUser.role === 'teacher') setCurrentView('dashboard');
    else if (newUser.role === 'student') setCurrentView('dashboard');
    else if (newUser.role === 'parent') setCurrentView('dashboard');
    else setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    console.log("Logout initiated from AppContent...");
    
    // 1. Clear local component state first for immediate UI response
    setSelectedTopic(null);
    setStudyMode('intro');
    setCoveredObjectives([]);
    setWizardContent(undefined);
    setCurrentView('dashboard');
    
    // 2. Call the centralized signOut which handles Supabase and localStorage
    try {
      await signOut();
    } catch (e) {
      console.error("Logout failed", e);
      // Fallback: Force clear and reload
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleTopicSelect = (topic: Topic, targetView?: string) => {
    setSelectedTopic(topic);
    if (targetView) {
        setCurrentView(targetView as AppView);
    } else if (user?.role === 'student') {
        setCurrentView('choice-hub'); 
    } else {
        setCurrentView('wizard');
    }
  };

  const handleOpenChalkboard = (topic: Topic, content?: string) => {
      setSelectedTopic(topic);
      setWizardContent(content);
      setCurrentView('chalkboard');
  };

  const handleObjectivesCovered = React.useCallback((objs: string[]) => {
    setCoveredObjectives(prev => [...new Set([...prev, ...objs])]);
  }, []);

  const handleCompleteTopic = async (topicId: string) => {
    if (authUser && !authUser.completedTopics.includes(topicId)) {
      const newCompletedTopics = [...authUser.completedTopics, topicId];
      
      updateUser({
        completedTopics: newCompletedTopics
      });

      if (!authUser.isDemo) {
        try {
            const { supabase } = await import('./lib/supabase');
            await supabase
                .from('profiles')
                .update({ completed_topics: newCompletedTopics })
                .eq('id', authUser.id);
            
            // Log activity
            await supabase.from('activity_logs').insert({
                user_id: authUser.id,
                action_type: 'topic_completed',
                details: { topic_id: topicId }
            });
        } catch (err) {
            console.error("Failed to save progress to Supabase", err);
        }
      }
    }
  };

  const updateCurriculum = async (newCurriculum: Curriculum) => {
      setCurriculum(newCurriculum);
      
      if (authUser?.isDemo) {
          localStorage.setItem('motlatsi_curriculum', JSON.stringify(newCurriculum));
      }
      
      if (authUser && authUser.role === 'admin' && !authUser.isDemo) {
          try {
              const { supabase } = await import('./lib/supabase');
              // We store curriculum in a dedicated table or as a JSON blob in a settings table.
              // For now, we'll try to upsert it into a 'school_settings' table linked to the admin's school.
              if (authUser.school) {
                  await supabase.from('school_settings').upsert({
                      school_name: authUser.school,
                      curriculum_data: newCurriculum,
                      updated_at: new Date().toISOString()
                  }, { onConflict: 'school_name' });
              }
          } catch (err) {
              console.error("Failed to save curriculum to Supabase", err);
          }
      }
  };

  const navigateHome = () => {
      if (user?.role === 'admin') setCurrentView('admin');
      else setCurrentView('dashboard');
  };

  if (authLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <Loader2 className="animate-spin text-teacherBlue" size={40} />
          </div>
      );
  }

  if (parentLinkCode) {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ParentPortal linkCode={parentLinkCode} />
        </Suspense>
    );
  }

  if (!authUser || !authUser.role) {
    return (
        <VoiceAccessProvider user={null}>
            <MagicGestureListener>
                <BlindModeUI />
                <ToastProvider>
                    <Login onLogin={handleLegacyLogin} />
                </ToastProvider>
            </MagicGestureListener>
        </VoiceAccessProvider>
    );
  }

  if (user.role === 'parent') {
    return (
      <MagicGestureListener key={user.id}>
        <BlindModeUI />
        <ToastProvider>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
                <ParentDashboard user={user} onLogout={handleLogout} />
            </Suspense>
          </ErrorBoundary>
        </ToastProvider>
      </MagicGestureListener>
    );
  }

  const appClasses = `h-screen overflow-hidden flex flex-col font-sans transition-all duration-300 
    ${accessSettings.dyslexicFont ? 'dyslexic-mode' : ''} 
    ${accessSettings.highContrast ? 'dark bg-background-dark text-white' : 'bg-background-light text-slate-900'}
  `;

  const IMMERSIVE_VIEWS: AppView[] = [
    'interactive-lesson', 
    'audio-lesson', 
    'inclusive-quiz', 
    'battle', 
    'flashcards',
    'wizard',
    'worksheet-generator',
    'revision-notes',
    'student-hub',
    'student-voice'
  ];
  
  const hideNavigation = IMMERSIVE_VIEWS.includes(currentView);

  const isFullWidthView = 
    currentView === 'journey' || 
    currentView === 'choice-hub' || 
    currentView === 'battle' || 
    currentView === 'interactive-lesson' || 
    currentView === 'audio-lesson' || 
    currentView === 'inclusive-quiz' || 
    currentView === 'flashcards' ||
    currentView === 'student-hub' || 
    currentView === 'student-voice' ||
    currentView === 'wizard' ||
    currentView === 'worksheet-generator' ||
    currentView === 'revision-notes' ||
    (currentView === 'dashboard' && user.role === 'student'); 

  return (
    <MagicGestureListener key={user.id}>
        <div className={appClasses}>
          <BlindModeUI />
          <NetworkStatus />
          <ErrorBoundary>
                {!hideNavigation && (
                <nav className={`fixed bottom-0 w-full md:w-64 md:h-screen md:top-0 md:left-0 border-t md:border-t-0 md:border-r z-50 px-2 py-3 md:p-6 flex md:flex-col justify-around md:justify-start gap-1 md:gap-4 shadow-lg md:shadow-none 
              ${accessSettings.highContrast ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              
              <div className="hidden md:flex flex-col gap-1 mb-8 px-4 mt-2 cursor-pointer group" onClick={navigateHome}>
                  <MotlatsiLogo className="h-10 w-auto self-start transition-transform group-hover:scale-105 origin-left" variant="full" />
                  <p className={`text-[10px] uppercase tracking-wider pl-1 ${accessSettings.highContrast ? 'text-gray-400' : 'text-gray-400'}`}>Lesotho Education</p>
              </div>

              {user.role === 'admin' ? (
                  <>
                      <NavButton active={currentView === 'admin'} onClick={() => setCurrentView('admin')} icon={<Shield size={24} />} label="Overview" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'admin-users'} onClick={() => setCurrentView('admin-users')} icon={<Users size={24} />} label="Users" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'admin-curriculum'} onClick={() => setCurrentView('admin-curriculum')} icon={<BookCopy size={24} />} label="Curriculum" highContrast={accessSettings.highContrast} />
                  </>
              ) : user.role === 'teacher' ? (
                  <>
                      <NavButton active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<LayoutDashboard size={20} />} label="Home" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'scheduler'} onClick={() => setCurrentView('scheduler')} icon={<CalendarDays size={20} />} label="Schedule" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'wizard'} onClick={() => setCurrentView('wizard')} icon={<PenTool size={20} />} label="Plan Lesson" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'classroom'} onClick={() => setCurrentView('classroom')} icon={<Users size={20} />} label="My Class" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'library'} onClick={() => setCurrentView('library')} icon={<Library size={20} />} label="Library" highContrast={accessSettings.highContrast} />
                  </>
              ) : (
                  <>
                      <NavButton active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<LayoutDashboard size={24} />} label="Home" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'journey'} onClick={() => setCurrentView('journey')} icon={<Map size={24} />} label="Journey" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'battle'} onClick={() => setCurrentView('battle')} icon={<Swords size={24} />} label="Battle" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'student-hub' || currentView === 'student-voice'} onClick={() => setCurrentView('student-hub')} icon={<BookOpenCheck size={24} />} label="Manage" highContrast={accessSettings.highContrast} />
                      <NavButton active={currentView === 'accessibility'} onClick={() => setCurrentView('accessibility')} icon={<Key size={24} />} label="Access" highContrast={accessSettings.highContrast} />
                  </>
              )}

              <div className="md:mt-auto pt-4 md:border-t border-gray-100 hidden md:block space-y-2">
                   <button onClick={() => setCurrentView('profile')} className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors ${currentView === 'profile' ? 'bg-gray-100 dark:bg-slate-800' : 'hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-teacherBlue font-bold uppercase">{user.name.charAt(0)}</div>
                      <div className="text-left overflow-hidden"><p className="font-medium text-sm truncate">{user.name}</p><p className="text-gray-500 text-xs capitalize">{user.role}</p></div>
                      <Settings size={16} className="ml-auto text-gray-400" />
                   </button>
                   <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg text-sm transition-colors mt-2">
                      <LogOut size={18} /> Sign Out
                   </button>
              </div>
            </nav>
            )}

            <main role="main" className={`flex-1 w-full overflow-y-auto flex flex-col ${!hideNavigation ? 'md:ml-64' : ''} ${isFullWidthView ? 'p-0' : 'p-4 md:p-8 max-w-7xl mx-auto'} ${accessSettings.highContrast ? 'bg-background-dark' : 'bg-gray-50'}`}>
              {showQuotaWarning && (
                <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between animate-in slide-in-from-top duration-300 z-[60]">
                  <div className="flex items-center gap-2 text-amber-800">
                    <AlertCircle size={14} className="shrink-0" />
                    <p className="text-[10px] font-medium">
                      AI Quota Limit Reached. To continue with higher limits, please connect your paid Google Cloud project key.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleOpenKeySelector}
                      className="px-2 py-1 bg-amber-600 text-white text-[9px] font-bold rounded-md hover:bg-amber-700 transition-colors"
                    >
                      Connect Key
                    </button>
                    <button 
                      onClick={() => setShowQuotaWarning(false)}
                      className="p-1 text-amber-400 hover:text-amber-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
              <Suspense fallback={<LoadingFallback />}>
                  {currentView === 'worksheet-generator' ? (
                       selectedTopic ? (
                           <WorksheetGenerator topic={selectedTopic} onBack={() => setCurrentView('wizard')} />
                       ) : (
                           <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
                               <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4"><AlertCircle className="text-red-400" size={32} /></div>
                               <h2 className="text-lg font-bold text-gray-800 mb-2">No Topic Selected</h2>
                               <p className="text-sm text-gray-500 mb-6">Please select a lesson plan first to generate worksheets.</p>
                               <button onClick={() => setCurrentView('wizard')} className="px-6 py-3 bg-teacherBlue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">Back to Lesson Planner</button>
                           </div>
                       )
                  ) : (
                      // ... other routes (Simplified for brevity, assuming standard router switch) ...
                      currentView === 'dashboard' ? (
                          user.role === 'teacher' ? <TeacherDashboard user={user} onNavigate={(view) => setCurrentView(view as AppView)} onLogout={handleLogout} /> :
                          user.role === 'student' ? <StudentDashboard user={user} onTopicSelect={handleTopicSelect} onLogout={handleLogout} onNavigate={(view) => setCurrentView(view as AppView)} /> :
                          user.role === 'admin' ? <AdminOverview user={user} onLogout={handleLogout} onNavigate={(view) => setCurrentView(view as AppView)} /> :
                          <Dashboard user={user} curriculum={curriculum} onTopicSelect={handleTopicSelect} onLogout={handleLogout} />
                      ) :
                      currentView === 'wizard' ? <LessonWizard topic={selectedTopic} onOpenChalkboard={handleOpenChalkboard} onBack={() => setCurrentView('dashboard')} onNavigate={(view) => setCurrentView(view as AppView)} onTopicSelect={handleTopicSelect} /> :
                      currentView === 'library' ? <ResourceLibrary user={user} onNavigate={(view) => setCurrentView(view as AppView)} /> :
                      currentView === 'scheduler' ? <SmartScheduler onNavigate={(view) => setCurrentView(view as AppView)} onTopicSelect={handleTopicSelect} /> :
                      currentView === 'classroom' ? <TeacherClassroom user={user} /> :
                      currentView === 'journey' ? <JourneyMap user={user} curriculum={curriculum} onTopicSelect={handleTopicSelect} /> :
                      currentView === 'profile' ? <UserProfile user={user} onUpdate={(updates) => updateUser(updates)} onLogout={handleLogout} /> :
                      currentView === 'accessibility' ? <AccessibilitySettingsView settings={accessSettings} onUpdate={setAccessSettings} onBack={() => setCurrentView('dashboard')} onNavigate={(view) => setCurrentView(view as AppView)} onLogout={handleLogout} /> :
                      currentView === 'student-hub' ? <StudentHub user={user} onNavigate={(view) => setCurrentView(view as AppView)} onTopicSelect={handleTopicSelect} onLogout={handleLogout} /> :
                      currentView === 'student-voice' ? <StudentHub user={user} initialView="voice" onNavigate={(view) => setCurrentView(view as AppView)} onTopicSelect={handleTopicSelect} onLogout={handleLogout} /> :
                      currentView === 'student-library' ? <StudentLibrary user={user} onNavigate={(view) => setCurrentView(view as AppView)} topic={selectedTopic} onSetMode={setStudyMode} /> :
                      currentView === 'battle' ? <BattleArena user={user} onBack={() => setCurrentView('dashboard')} onNavigate={(view) => setCurrentView(view as AppView)} /> :
                      currentView === 'choice-hub' && selectedTopic ? <ChoiceHub topic={selectedTopic} user={user} curriculum={curriculum} onTopicSelect={handleTopicSelect} onChoice={(mode, sMode) => { 
                          setStudyMode(sMode); 
                          setCoveredObjectives([]);
                          if (mode === 'read' && sMode === 'exam-prep') {
                              setCurrentView('revision-notes');
                          } else {
                              setCurrentView(mode === 'read' ? 'interactive-lesson' : mode === 'listen' ? 'audio-lesson' : 'inclusive-quiz'); 
                          }
                      }} /> :
                      currentView === 'interactive-lesson' && selectedTopic ? <InteractiveLesson topic={selectedTopic} mode={studyMode} onBack={() => setCurrentView('choice-hub')} onComplete={() => handleCompleteTopic(selectedTopic.id)} onNavigate={(view) => setCurrentView(view as AppView)} onObjectivesCovered={handleObjectivesCovered} /> :
                      currentView === 'revision-notes' && selectedTopic ? <RevisionNotes topic={selectedTopic} onBack={() => setCurrentView('choice-hub')} onNavigate={(view) => setCurrentView(view as AppView)} /> :
                      currentView === 'audio-lesson' && selectedTopic ? <InclusiveAudio topic={selectedTopic} mode={studyMode} onBack={() => setCurrentView('choice-hub')} settings={accessSettings} onObjectivesCovered={handleObjectivesCovered} /> :
                      currentView === 'inclusive-quiz' && selectedTopic ? <InclusiveQuiz topic={selectedTopic} onBack={() => setCurrentView('choice-hub')} onComplete={(score) => handleCompleteTopic(selectedTopic.id)} mode={studyMode} onNavigate={(view) => setCurrentView(view as AppView)} coveredObjectives={coveredObjectives} /> :
                      currentView === 'flashcards' && selectedTopic ? <InclusiveFlashcard topic={selectedTopic} onBack={() => setCurrentView('choice-hub')} settings={accessSettings} /> :
                      currentView === 'chalkboard' && selectedTopic ? <ChalkboardView topic={selectedTopic} customContent={wizardContent} onBack={() => setCurrentView('wizard')} /> :
                      currentView === 'chat' ? <div className="space-y-4"><SocraticChat topic={selectedTopic} user={user} onComplete={handleCompleteTopic} /></div> :
                      currentView === 'quiz' && selectedTopic ? <QuizInterface topic={selectedTopic} onBack={() => setCurrentView('journey')} onComplete={(score) => handleCompleteTopic(selectedTopic.id)} /> :
                      currentView === 'admin' ? <AdminOverview user={user} onLogout={handleLogout} onNavigate={(view) => setCurrentView(view as AppView)} /> :
                      currentView === 'admin-users' ? <AdminUsers user={user} onNavigate={(view) => setCurrentView(view as AppView)} /> :
                      currentView === 'admin-curriculum' ? <AdminCurriculum user={user} curriculum={curriculum} onUpdate={updateCurriculum} onNavigate={(view) => setCurrentView(view as AppView)} /> :
                      currentView === 'bulk-planner-dashboard' ? <BulkPlannerDashboard onNavigate={(view: AppView) => setCurrentView(view)} /> :
                      currentView === 'bulk-unit-creator' ? <BulkUnitCreator onNavigate={(view: AppView) => setCurrentView(view)} /> :
                      currentView === 'bulk-reporter' ? <BulkReporter onNavigate={(view: AppView) => setCurrentView(view)} /> :
                      null
                  )}
              </Suspense>
            </main>
          </ErrorBoundary>
        </div>
    </MagicGestureListener>
  );
};

const NavButton = ({ active, onClick, icon, label, highContrast }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, highContrast: boolean }) => (
    <button 
        onClick={onClick} 
        aria-label={label} 
        aria-current={active ? 'page' : undefined}
        className={`flex flex-col md:flex-row items-center md:gap-3 p-1 md:px-4 md:py-3 rounded-xl transition-all ${active ? (highContrast ? 'bg-primary text-white' : 'text-teacherBlue bg-blue-50 md:bg-blue-50') : (highContrast ? 'text-gray-400 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900')}`}>
        {icon}
        <span className="text-[10px] md:text-sm font-medium md:mt-0" aria-hidden="true">{label}</span>
    </button>
);

const App: React.FC = () => (
    <ErrorBoundary>
        <AuthProvider>
            <AppWithUser />
        </AuthProvider>
    </ErrorBoundary>
);

const AppWithUser: React.FC = () => {
    const { user, loading, setUser } = useAuth();
    
    useEffect(() => {
       seedDemoData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-teacherBlue" size={40} /></div>;
    
    if (!user) {
        return (
            <VoiceAccessProvider user={null}>
                <MagicGestureListener>
                    <BlindModeUI />
                    <ToastProvider>
                        <Login onLogin={(newUser) => setUser(newUser)} />
                    </ToastProvider>
                </MagicGestureListener>
            </VoiceAccessProvider>
        );
    }

    return (
      <LearningEngineProvider>
          <VoiceAccessProvider user={user}> 
            <QueryClientProvider client={queryClient}>
              <ToastProvider>
                <AppContent user={user} />
              </ToastProvider>
            </QueryClientProvider>
          </VoiceAccessProvider>
      </LearningEngineProvider>
    );
};

export default App;
