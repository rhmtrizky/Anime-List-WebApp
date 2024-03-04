import { loginWithGithub, loginWithGoogle, signIn } from '@/services/auth/service';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import githubAuth from 'next-auth/providers/github';
import googleAuth from 'next-auth/providers/google';
import { compare } from 'bcrypt';

export const authOption = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const user = await signIn(email);

          if (user) {
            const passwordConfirm = await compare(password, user.password);
            if (passwordConfirm) {
              return user;
            } else {
              throw new Error('Password does not match');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
    googleAuth({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    githubAuth({
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === 'credentials') {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.password = user.password;
      }

      if (account?.provider === 'google') {
        const data = {
          id: user?.id,
          email: user?.email,
          image: user?.image,
          username: user?.name,
          type: 'google',
        };

        await loginWithGoogle(data, (data) => {
          token.id = data.id;
          token.email = data.email;
          token.username = data.username;
          token.image = data?.image;
        });
      }

      if (account?.provider == 'github') {
        const data = {
          id: user?.id,
          email: user?.email,
          image: user?.image,
          username: user?.name,
          type: 'github',
        };

        await loginWithGithub(data, (data) => {
          token.id = data.id;
          token.email = data.email;
          token.username = data.username;
          token.image = data?.image;
          token.role = data.role;
        });
      }
      return token;
    },
    async session({ session, token }) {
      if ('id' in token) {
        session.user.id = token.id;
      }
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('username' in token) {
        session.user.username = token.username;
      }
      if ('password' in token) {
        session.user.password = token.password;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
