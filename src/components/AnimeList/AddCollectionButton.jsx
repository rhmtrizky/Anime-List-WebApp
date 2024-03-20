'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddCollectionButton = ({ anime_mal_id, anime_image, anime_title, userId }) => {
  const router = useRouter();
  const [isCollection, setIsCollection] = useState(false);
  const [isLoading, setISLoading] = useState(false);
  const handleAddCollection = async (e) => {
    e.preventDefault();
    setISLoading(true);
    const data = {
      anime_mal_id,
      anime_image,
      anime_title,
      userId,
    };
    const response = await fetch('/api/v1/collection', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const collection = await response.json();
    if (collection.status == 200) {
      setISLoading(false);
      setIsCollection(collection.isCreated);
      router.refresh();
      setTimeout(() => {
        setIsCollection(false);
      }, 3000);
    } else {
      setISLoading(false);
      setIsCollection(collection.isCreated);
    }
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
          <span>{isLoading ? 'Loading...' : 'Add To Collection'}</span>
        </button>
      )}
    </>
  );
};

export default AddCollectionButton;
