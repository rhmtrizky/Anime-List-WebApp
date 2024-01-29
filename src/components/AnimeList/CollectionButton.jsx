'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CollectionButton = ({ anime_mal_id, user_email, anime_image, anime_title }) => {
  const router = useRouter();
  const [isCollection, setIsCollection] = useState(false);
  const handleAddCollection = async (e) => {
    e.preventDefault();
    const data = {
      anime_mal_id,
      user_email,
      anime_image,
      anime_title,
    };
    const response = await fetch('/api/v1/collection', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const collection = await response.json();
    console.log({ collection });
    if (collection.status == 200) {
      setIsCollection(collection.isCreated);
    }
    router.refresh();
  };
  return (
    <>
      {isCollection ? (
        <p className="text-color-primary">Success Add To Your Collection</p>
      ) : (
        <button
          onClick={handleAddCollection}
          className="text-color-dark bg-color-accent px-2 py-1 rounded text-sm"
        >
          Add To Collection
        </button>
      )}
    </>
  );
};

export default CollectionButton;
