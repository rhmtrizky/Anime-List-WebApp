import Link from 'next/link';

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="p-3 flex justify-between">
      <h1 className="font-bold text-xl text-color-primary ">{title}</h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="text-17px underline text-color-primary hover:text-color-accent cursor-pointer transition-all"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
