import Link from 'next/link';
import { FaFileCode } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <FaFileCode
        size={44}
        className="text-color-accent"
      />
      <h1 className="text-2xl text-color-accent font-bold">Page not found</h1>
      <Link
        href="/"
        className="text-color-primary underline"
      >
        Kembali
      </Link>
    </div>
  );
};

export default NotFound;
