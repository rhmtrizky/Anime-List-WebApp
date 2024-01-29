import { authOption } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const authUserSession = async () => {
  const session = await getServerSession(authOption);
  return session?.user;
};

export default authUserSession;
