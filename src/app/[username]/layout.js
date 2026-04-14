import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

export async function generateMetadata({ params }) {
  const { username } = await params;

  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const name = userData.displayName || username;
      const bio = userData.about || `Check out ${name}'s professional portfolio on ShowMySkills.`;
      
      return {
        title: `${name} (@${username})`,
        description: bio.substring(0, 160),
        alternates: {
          canonical: `https://showmyskills.xyphx.com/${username}`,
        },
        openGraph: {
          title: `${name} | ShowMySkills Portfolio`,
          description: bio.substring(0, 160),
          images: [userData.profileImage || '/Logo.jpg'],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${name} | ShowMySkills Portfolio`,
          description: bio.substring(0, 160),
          images: [userData.profileImage || '/Logo.jpg'],
        },
      };
    }
    }
  } catch (error) {
    console.error('Error generating metadata for user:', error);
  }

  return {
    title: username,
    description: `View ${username}'s portfolio on ShowMySkills.`,
  };
}

export default function UserLayout({ children }) {
  return <>{children}</>;
}
