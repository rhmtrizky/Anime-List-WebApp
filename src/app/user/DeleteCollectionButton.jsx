'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GrFavorite } from 'react-icons/gr';

const DeleteCollectionButton = ({ collection }) => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleOpenModal = () => {
    setModal(!modal);
  };
  const handleDeleteCollection = async (collection_id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/v1/collection/${collection_id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        router.refresh();
        setIsLoading(false);
        setModal(false);
      } else {
        setIsLoading(false);
        setModal(false);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <button
        className="bg-color-red p-2 rounded-full"
        onClick={handleOpenModal}
      >
        <GrFavorite className="text-color-primary text-2xl " />
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleOpenModal}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to remove "{collection.anime_title}" from your collection? </h3>
          <div className="modal-action">
            <button
              type="button"
              className="btn"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => handleDeleteCollection(collection.id)}
            >
              <span>{isLoading ? 'Loading...' : 'Delete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteCollectionButton;
