export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profile-setup/', '/id/'],
      },
    ],
    sitemap: 'https://showmyskills.xyphx.com/sitemap.xml',
  }
}
