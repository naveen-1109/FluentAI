import { useState } from 'react';
import type { User, SessionAnalysis, LearningTask, Achievement, AuditLog } from './types';
import { 
  DEMO_USER, 
  INITIAL_SESSIONS, 
  INITIAL_LEARNING_TASKS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_AUDIT_LOGS 
} from './services/mockData';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AudioStudio } from './components/audio/AudioStudio';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { InterviewModePage } from './pages/InterviewModePage';
import { ConversationModePage } from './pages/ConversationModePage';
import { LearningPlanPage } from './pages/LearningPlanPage';
import { HistoryPage } from './pages/HistoryPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export function AppContent() {
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USER);
  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');

  const [sessions, setSessions] = useState<SessionAnalysis[]>(INITIAL_SESSIONS);
  const [tasks, setTasks] = useState<LearningTask[]>(INITIAL_LEARNING_TASKS);
  const [achievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const handleSessionAnalyzed = (newSession: SessionAnalysis) => {
    setSessions((prev) => [newSession, ...prev]);

    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        totalSessions: currentUser.totalSessions + 1,
        avgFluency: Math.round((currentUser.avgFluency + newSession.fluencyScore) / 2)
      });
    }

    const newLog: AuditLog = {
      id: `log-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      action: 'SPEECH_SESSION_ANALYZED',
      actor: currentUser?.email || 'user',
      details: `Analyzed speech recording (${newSession.durationSeconds}s). Score: ${newSession.fluencyScore}%.`
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentRoute(user.role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRoute('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F9] text-[#172B3A] font-sans selection:bg-[#EAF3F9] selection:text-[#1769AA]">
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        onNavigate={(route) => setCurrentRoute(route)}
        onLogout={handleLogout}
      />

      {/* Body Area */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={(route) => setCurrentRoute(route)}
          currentUser={currentUser}
        />

        {/* Main Content Pane */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* Public Landing Page */}
          {currentRoute === 'landing' && (
            <LandingPage onGetStarted={() => setCurrentRoute('login')} />
          )}

          {/* Login Page */}
          {currentRoute === 'login' && (
            <LoginPage 
              onLoginSuccess={handleLoginSuccess}
              onNavigateToRegister={() => setCurrentRoute('register')}
            />
          )}

          {/* Register Page */}
          {currentRoute === 'register' && (
            <RegisterPage 
              onRegisterSuccess={handleLoginSuccess}
              onNavigateToLogin={() => setCurrentRoute('login')}
            />
          )}

          {/* User Dashboard (Protected) */}
          {currentRoute === 'dashboard' && (
            <ProtectedRoute currentUser={currentUser} onUnauthorized={() => setCurrentRoute('login')}>
              {currentUser && (
                <DashboardPage
                  user={currentUser}
                  sessions={sessions}
                  tasks={tasks}
                  onNavigate={(route) => setCurrentRoute(route)}
                  onToggleTask={handleToggleTask}
                />
              )}
            </ProtectedRoute>
          )}

          {/* Speech Studio (Protected) */}
          {currentRoute === 'studio' && (
            <ProtectedRoute currentUser={currentUser} onUnauthorized={() => setCurrentRoute('login')}>
              <div className="space-y-6 max-w-7xl mx-auto">
                <div className="clinical-card p-6">
                  <h1 className="text-2xl font-bold text-slate-900">Speech Recording & FFT Studio</h1>
                  <p className="text-xs text-slate-500">Record reading passages or freestyle speech for live disfluency analysis</p>
                </div>
                <AudioStudio onSessionAnalyzed={handleSessionAnalyzed} />
              </div>
            </ProtectedRoute>
          )}

          {/* AI Interview Mode (Protected) */}
          {currentRoute === 'interview' && (
            <ProtectedRoute currentUser={currentUser} onUnauthorized={() => setCurrentRoute('login')}>
              <InterviewModePage onSessionAnalyzed={handleSessionAnalyzed} />
            </ProtectedRoute>
          )}

          {/* AI Conversation Mode (Protected) */}
          {currentRoute === 'conversation' && (
            <ProtectedRoute currentUser={currentUser} onUnauthorized={() => setCurrentRoute('login')}>
              <ConversationModePage />
            </ProtectedRoute>
          )}

          {/* Personalized Learning Plan (Protected) */}
          {currentRoute === 'learning' && (
            <ProtectedRoute currentUser={currentUser} onUnauthorized={() => setCurrentRoute('login')}>
              <LearningPlanPage tasks={tasks} onToggleTask={handleToggleTask} />
            </ProtectedRoute>
          )}

          {/* History Page (Protected) */}
          {currentRoute === 'history' && (
            <ProtectedRoute currentUser={currentUser} onUnauthorized={() => setCurrentRoute('login')}>
              <HistoryPage sessions={sessions} />
            </ProtectedRoute>
          )}

          {/* Achievements Page (Protected) */}
          {currentRoute === 'achievements' && (
            <ProtectedRoute currentUser={currentUser} onUnauthorized={() => setCurrentRoute('login')}>
              <AchievementsPage achievements={achievements} />
            </ProtectedRoute>
          )}

          {/* Profile Page (Protected) */}
          {currentRoute === 'profile' && (
            <ProtectedRoute currentUser={currentUser} onUnauthorized={() => setCurrentRoute('login')}>
              {currentUser && (
                <ProfilePage
                  user={currentUser}
                  onUpdateUser={(updated) => setCurrentUser(updated)}
                />
              )}
            </ProtectedRoute>
          )}

          {/* Admin Dashboard (Protected - Admin Only) */}
          {(currentRoute === 'admin' || currentRoute === 'admin-logs' || currentRoute === 'admin-users') && (
            <ProtectedRoute currentUser={currentUser} requireAdmin={true} onUnauthorized={() => setCurrentRoute('login')}>
              <AdminDashboardPage auditLogs={auditLogs} />
            </ProtectedRoute>
          )}

        </main>
      </div>

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
