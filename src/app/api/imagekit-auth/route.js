import { imageKit } from '@/config/imagekit';

export async function POST() {
  try {
    const authenticationParameters = imageKit.getAuthenticationParameters();
    return Response.json(authenticationParameters);
  } catch (error) {
    console.error('ImageKit auth error:', error);
    return Response.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
