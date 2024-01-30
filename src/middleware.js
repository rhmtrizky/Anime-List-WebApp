export { default } from 'next-auth/middleware';

export const config = { matcher: ['/anime/:path*', '/user/:path*'] };
