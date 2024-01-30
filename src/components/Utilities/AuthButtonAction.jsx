import authUserSession from '@/libs/auth';
import Link from 'next/link';

const AuthButtonAction = async () => {
  const user = await authUserSession();

  const actionLable = user ? 'Sign Out' : 'Sign In';
  const actionURL = user ? '/api/auth/signout' : '/api/auth/signin';
  return (
    <div className="flex md:flex-row justify-between gap-2 items-center md:min-w-44 min-w-80">
      {user ? (
        <div className="flex items-center gap-1 text-color-dark md:absolute md:right-28 ">
          <p>Hi, </p>
          <Link href="/user">
            <p className="font-bold cursor-pointer">{user?.name}</p>
          </Link>
        </div>
      ) : null}
      <div className="flex md:justify-end md:w-44">
        <div className="bg-color-dark text-color-primary px-4 py-1 rounded ">
          <Link href={actionURL}>{actionLable}</Link>
        </div>
      </div>
    </div>
  );
};
export default AuthButtonAction;
