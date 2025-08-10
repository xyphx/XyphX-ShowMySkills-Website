"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/config/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  const signUp = async (email, password, displayName, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update display name
      await updateProfile(user, { displayName });
      
      // Create user document in Firestore with username
      await createUserDocument(user, { displayName, username, profileCompleted: false });
      
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document exists
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const isNewUser = !userSnap.exists();
      
      // Create user document in Firestore if it doesn't exist
      if (isNewUser) {
        await createUserDocument(user, { profileCompleted: false });
      }
      
      return { user, isNewUser };
    } catch (error) {
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Create user document in Firestore
  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;
    
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      
      try {
        await setDoc(userRef, {
          displayName,
          email,
          photoURL,
          createdAt,
          skills: [],
          college: '',
          location: '',
          stars: 0,
          starred: false,
          about: '',
          experience: [],
          achievements: [],
          works: [],
          profileCompleted: false,
          starredbyme: [], // Array of profile IDs this user has starred
          peoplewhostarredme: [], // Array of user IDs who starred this profile
          ...additionalData // This will include username from signUp function
        });
      } catch (error) {
        console.error('Error creating user document:', error);
      }
    }
  };

  // Check username availability
  const checkUsernameAvailability = async (username, currentUserId = null) => {
    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return true; // Username is available
      }
      
      // If there's a match, check if it's the current user's username
      if (currentUserId) {
        const matchingDoc = querySnapshot.docs[0];
        if (matchingDoc.id === currentUserId) {
          return true; // It's the current user's own username, so it's "available" for them
        }
      }
      
      return false; // Username is taken by someone else
    } catch (error) {
      console.error('Error checking username availability:', error);
      throw error;
    }
  };

  // Get user by username
  const getUserByUsername = async (username) => {
    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }
  };

  // Get user profile data from Firestore
  const getUserProfile = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (userId, data) => {
    try {
      // Remove email from data to prevent it from being updated
      const { email, ...updateData } = data;
      
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, updateData, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Create user document if it doesn't exist
        await createUserDocument(user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    getUserProfile,
    updateUserProfile,
    checkUsernameAvailability,
    getUserByUsername
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
