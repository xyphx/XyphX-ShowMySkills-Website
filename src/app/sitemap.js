import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

export default async function sitemap() {
  const baseUrl = 'https://showmyskills.xyphx.com';

  // Static routes
  const staticRoutes = [
    '',
    '/auth',
    '/home',
    '/about',
    '/learnmore',
    '/resume-builder',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic user profiles
  let userRoutes = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    userRoutes = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        if (data.username) {
          return {
            url: `${baseUrl}/${data.username}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          };
        }
        return null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error('Error generating sitemap for users:', error);
  }

  return [...staticRoutes, ...userRoutes];
}
