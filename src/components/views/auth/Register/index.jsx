'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterView = () => {
  const { push } = useRouter();
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formRegister, setFormRegister] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const data = formRegister;

    const result = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (result.status == 200) {
      form.reset();
      push('/auth/login');
      setIsLoading(false);
    } else {
      form.reset();
      setIsLoading(false);
      setIsError('Email is already registered');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <form
        className="w-96 flex flex-col gap-2 px-10 py-5 rounded-md shadow-2xl"
        action=""
        onSubmit={handleSubmit}
      >
        <h1 className="flex justify-center font-bold text-2xl my-3">Register</h1>

        <Input
          label="email"
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={handleChange}
        />
        <Input
          label="username"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <Input
          label="password"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        {formRegister.email === '' || formRegister.password === '' || formRegister.username === '' ? (
          <Button
            disabled={true}
            label={isLoading ? 'Loading...' : 'Register'}
            type="submit"
            className="bg-color-secondary text-color-primary py-2 px-1 rounded-md"
          />
        ) : (
          <Button
            label={isLoading ? 'Loading...' : 'Register'}
            type="submit"
            className="bg-color-blue text-color-primary py-2 px-1 rounded-md"
          />
        )}

        {isError && <p className="text-color-red text-sm italic">Email is already registered</p>}

        <div className="flex gap-1 text-sm">
          <p>Have an account? </p>
          <Link href={'/login'}>
            <p className="font-semibold text-color-green italic">Login</p>
            {/* <button onClick={() => signIn()}>Login</button> */}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;
