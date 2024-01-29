import authUserSession from '@/libs/auth';
import Link from 'next/link';

const AuthButtonAction = async () => {
  const user = await authUserSession();

  const actionLable = user ? 'Sign Out' : 'Sign In';
  const actionURL = user ? '/api/auth/signout' : '/api/auth/signin';
  return (
    <div className="flex md:flex-row flex-col gap-2 items-center">
      {user ? (
        <div className="flex items-center gap-1">
          <p>Hi, </p>
          <Link href="/user">
            <p className="font-bold cursor-pointer">{user?.name}</p>
          </Link>
        </div>
      ) : null}
      <div className="bg-color-dark text-color-primary px-4 py-1 rounded">
        <Link href={actionURL}>{actionLable}</Link>
      </div>
    </div>
  );
};
export default AuthButtonAction;
