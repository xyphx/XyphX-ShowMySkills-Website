"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export const useProfileCheck = () => {
  const { user, getUserProfile } = useAuth();
  const router = useRouter();
  const [profileComplete, setProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile && !profile.profileCompleted) {
            router.push('/profile-setup');
          } else {
            setProfileComplete(true);
          }
        } catch (error) {
          console.error('Error checking profile:', error);
        }
      }
      setLoading(false);
    };

    if (user) {
      checkProfile();
    } else {
      setLoading(false);
    }
  }, [user, getUserProfile, router]);

  return { profileComplete, loading };
};
