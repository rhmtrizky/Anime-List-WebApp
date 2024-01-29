import Link from 'next/link';
import InputNavbar from './InputNavbar';
import AuthButtonAction from '../Utilities/AuthButtonAction';

const Navbar = () => {
  return (
    <header>
      <div className="bg-color-accent items-center flex md:flex-row flex-col p-3 justify-between md:align-center gap-2">
        <Link href="/">
          <p className="font-bold text-2xl text-white text-center">ANIMEKUY</p>
        </Link>
        <InputNavbar />
        <AuthButtonAction />
      </div>
    </header>
  );
};

export default Navbar;
