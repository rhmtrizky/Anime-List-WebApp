'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import DeleteCollectionButton from '@/app/user/DeleteCollectionButton';
import { Avatar } from '@mui/material';

const CollectionComment = ({ collection, user, comments, userLogin }) => {
  const [showCollection, setShowCollection] = useState(true);
  const [showComment, setShowComment] = useState(false);

  const handleShowCollection = () => {
    setShowCollection(true);
    setShowComment(false);
  };
  const handleShowComment = () => {
    setShowComment(true);
    setShowCollection(false);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={handleShowCollection}
          className="bg-color-accent text-color-dark text-13px px-6 py-1 rounded font-bold"
        >
          Collection
        </button>
        <button
          onClick={handleShowComment}
          className="bg-color-accent text-color-dark text-13px px-6 py-1 rounded font-bold"
        >
          Comment
        </button>
      </div>
      {showCollection ? (
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 px-3 mt-4">
          {collection?.map((item) => {
            return (
              <div
                className="shadow-xl text-color-primary transition-all cursor-pointer"
                key={item?.anime_mal_id}
              >
                {userLogin?.id != user?.id && null}
                {userLogin?.id == undefined && (
                  <div className="relative top-5 right-1 flex justify-end">
                    <DeleteCollectionButton collection={item} />
                  </div>
                )}

                <Link href={`/anime/${item?.anime_mal_id}`}>
                  <Image
                    src={item?.anime_image}
                    alt="..."
                    height="350"
                    width="350"
                  />
                  <p className="p-4 md:text-md text-sm font-bold  hover:text-color-accent">{item?.anime_title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      ) : null}
      {showComment ? (
        <div className="mt-8">
          {comments?.map((comment) => {
            return (
              <div
                key={comment.id}
                className="w-full px-5 border-b border-color-primary pb-4 my-4"
              >
                <Link href={`/anime/${comment?.anime_mal_id}`}>
                  <div className="flex gap-4">
                    <Avatar src={user?.image} />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex md:flex-row flex-col md:justify-between">
                        <div className="flex flex-col">
                          <h3 className="font-bold text-base">{user?.username}</h3>
                          <p className="text-xs">{user?.email}</p>
                        </div>
                        <h3 className="md:flex flex-block font-bold">{comment?.anime_title}</h3>
                      </div>
                      <p className="text-sm">{comment?.comment}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default CollectionComment;
