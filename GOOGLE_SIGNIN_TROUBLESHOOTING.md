# Google Sign-In Troubleshooting Guide

## 🔧 Common Issues & Solutions

### 1. **Firebase Console Configuration**

#### Check Authentication Providers:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `xyphx-showmyskills`
3. Navigate to **Authentication** → **Sign-in method**
4. Ensure **Google** provider is **ENABLED**

#### Authorized Domains:
Make sure these domains are added to Authorized domains:
- `localhost` (for development)
- Your production domain (e.g., `showmyskills.netlify.app`)

### 2. **Environment Variables**
Verify all Firebase environment variables are correctly set:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBTnGWkataNFiVfLeapjPaUpMdJB4WGbqo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xyphx-showmyskills.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xyphx-showmyskills
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xyphx-showmyskills.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=151749810186
NEXT_PUBLIC_FIREBASE_APP_ID=1:151749810186:web:ba70cd5bb753b720fd27f3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-N3H7KXPLLY
```

### 3. **Google Cloud Console OAuth Setup**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. Add these to **Authorized JavaScript origins**:
   - `http://localhost:3000` (development)
   - `https://your-production-domain.com`
6. Add these to **Authorized redirect URIs**:
   - `http://localhost:3000`
   - `https://xyphx-showmyskills.firebaseapp.com/__/auth/handler`
   - `https://your-production-domain.com`

### 4. **Browser Issues**

#### Clear Browser Data:
- Clear cookies and local storage
- Try in incognito/private mode
- Disable browser extensions temporarily

#### Allow Popups:
- Ensure popups are allowed for your domain
- Check if popup blockers are preventing the Google sign-in window

### 5. **Network & CORS Issues**

#### Development Server:
- Make sure you're accessing via `http://localhost:3000` (not `127.0.0.1`)
- Try running on different port if needed

#### Production:
- Ensure HTTPS is properly configured
- Check if domain is correctly configured in Firebase

### 6. **Code-Level Debugging**

Add error logging to debug the issue:

```javascript
const handleGoogleSignIn = async () => {
  setLoading(true);
  try {
    console.log('Attempting Google Sign-in...');
    const result = await signInWithGoogle();
    console.log('Google Sign-in successful:', result);
    
    if (result.isNewUser) {
      router.push('/profile-setup');
    } else {
      router.push('/home');
    }
  } catch (error) {
    console.error('Google Sign-in error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    setErrors({ submit: error.message });
  } finally {
    setLoading(false);
  }
};
```

### 7. **Common Error Codes**

- **auth/popup-blocked**: Browser is blocking the popup
- **auth/popup-closed-by-user**: User closed the popup before completing sign-in
- **auth/unauthorized-domain**: Domain not authorized in Firebase console
- **auth/operation-not-allowed**: Google provider not enabled in Firebase
- **auth/invalid-api-key**: Invalid Firebase API key

### 8. **Testing Steps**

1. **Check Browser Console**: Look for JavaScript errors
2. **Test in Incognito**: Rules out browser cache issues
3. **Test Different Browser**: Rules out browser-specific issues
4. **Check Network Tab**: Look for failed requests
5. **Verify Firebase Project**: Ensure correct project is selected

### 9. **Quick Fix Checklist**

- [ ] Google provider enabled in Firebase Console
- [ ] Authorized domains added (localhost + production)
- [ ] OAuth credentials configured in Google Cloud Console
- [ ] Environment variables correctly set
- [ ] Browser allows popups
- [ ] Using correct domain (localhost:3000, not 127.0.0.1)
- [ ] Clear browser cache/cookies
- [ ] Check browser console for errors

### 10. **If Still Not Working**

Try this manual test in browser console:
```javascript
// Open your app in browser, then run this in console:
firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```
