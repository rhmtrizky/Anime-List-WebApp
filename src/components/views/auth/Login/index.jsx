'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginView = () => {
  const { push } = useRouter();
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const callbackUrl = '/';
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email.value,
      password: form.password.value,
      callbackUrl,
    });
    console.log(res);

    if (!res?.error) {
      push(callbackUrl);
      router.refresh();
      setIsLoading(false);
      form.reset();
    } else {
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <form
        className="w-96 flex flex-col gap-2 px-10 py-5 rounded-md shadow-2xl"
        action=""
        onSubmit={handleSubmit}
      >
        <h1 className="flex justify-center font-bold text-2xl my-3">Login</h1>
        <Input
          label="email"
          type="email"
          name="email"
          placeholder="example@example.com"
        />
        <Input
          label="password"
          type="password"
          name="password"
          placeholder="password"
        />
        <Button
          label={isLoading ? 'Loading' : 'Login'}
          type="submit"
          className="bg-color-green text-color-primary py-2 px-1 rounded-md"
        />
        {isError && <p className="text-color-red text-sm italic">Email or Password is incorrect</p>}
        <div className="flex gap-1 text-sm">
          <p>Haven't an account? </p>
          <Link href={'/auth/register'}>
            <p className="font-semibold text-color-blue italic">Register</p>
          </Link>
        </div>
        <hr className="text-color-gray" />

        <Button
          label="Google"
          type="button"
          className="bg-color-primary text-color-dark py-2 px-1 rounded-md"
          onClick={() => signIn('google', { callbackUrl: '/', redirect: false })}
          //   icon={GoogleIcon}
        />
        <Button
          label="Github"
          type="button"
          className="bg-color-primary text-color-dark py-2 px-1 rounded-md"
          onClick={() => signIn('github', { callbackUrl: '/', redirect: false })}
          //   icon={GithubIcon}
        />
      </form>
    </div>
  );
};

export default LoginView;
