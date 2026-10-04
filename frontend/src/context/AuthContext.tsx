import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import type { User as AppUser } from '../types';
import { 
  registerWithFirebase, 
  loginWithFirebase, 
  logoutWithFirebase, 
  resetFirebasePassword,
  fetchUserFirestoreDoc 
} from '../services/authService';
import { DEMO_USER } from '../services/mockData';

export interface AuthContextType {
  currentUser: AppUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  idToken: string | null;
  register: (email: string, pass: string, name: string) => Promise<AppUser>;
  login: (email: string, pass: string) => Promise<AppUser>;
  logout: () => Promise<void>;
  sendResetPassword: (email: string) => Promise<void>;
  setCurrentUser: (user: AppUser | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(DEMO_USER);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const token = await fbUser.getIdToken();
          setIdToken(token);
          const appUser = await fetchUserFirestoreDoc(fbUser);
          setCurrentUser(appUser);
        } catch (err) {
          console.warn("Could not retrieve Firebase token or user doc:", err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, pass: string, name: string): Promise<AppUser> => {
    setLoading(true);
    try {
      const newUser = await registerWithFirebase(email, pass, name);
      setCurrentUser(newUser);
      setLoading(false);
      return newUser;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const login = async (email: string, pass: string): Promise<AppUser> => {
    setLoading(true);
    try {
      const loggedUser = await loginWithFirebase(email, pass);
      setCurrentUser(loggedUser);
      setLoading(false);
      return loggedUser;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutWithFirebase();
    } catch (err) {
      console.warn("Firebase logout warning:", err);
    }
    setCurrentUser(null);
    setFirebaseUser(null);
    setIdToken(null);
  };

  const sendResetPassword = async (email: string): Promise<void> => {
    await resetFirebasePassword(email);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        firebaseUser,
        loading,
        idToken,
        register,
        login,
        logout,
        sendResetPassword,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
