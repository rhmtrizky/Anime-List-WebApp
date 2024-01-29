'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ButtonUser = ({ collection }) => {
  const [showCollection, setShowCollection] = useState(true);
  const [showComment, setShowComment] = useState(false);
  console.log('collection user', collection);
  const handleShowCollection = () => {
    setShowCollection((prevState) => !prevState);
  };
  return (
    <>
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={handleShowCollection}
          className="bg-color-accent text-color-dark text-13px px-6 py-1 rounded font-bold"
        >
          My Collection
        </button>
        <button className="bg-color-accent text-color-dark text-13px px-6 py-1 rounded font-bold">My Comment</button>
      </div>
      {showCollection && (
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 px-3 mt-8">
          {collection?.map((item) => {
            return (
              <div
                className="shadow-xl text-color-primary hover:text-color-accent transition-all cursor-pointer"
                key={item.mal_id}
              >
                <Link href={`/anime/${item.anime_mal_id}`}>
                  <Image
                    src={item.anime_image}
                    alt="..."
                    height="350"
                    width="350"
                  />
                  <p className="p-4 md:text-md text-sm font-bold">{item.anime_title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ButtonUser;
