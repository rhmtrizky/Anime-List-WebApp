'use client';

import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CommentInput = ({ anime_mal_id, anime_title, userId }) => {
  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleAddComment = async (e) => {
    e.preventDefault();
    const data = {
      anime_mal_id,
      anime_title,
      comment,
      userId,
    };
    const response = await fetch('/api/v1/comment', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const collection = await response.json();
    if (collection.status == 200) {
      setIsComment(collection.isCreated);
      setTimeout(() => {
        setIsComment(false);
        setComment('');
        router.refresh();
      }, 3000);
    }
  };
  return (
    <div className="flex flex-col gap-2 p-3">
      <textarea
        className="w-full h-10 p-2 rounded"
        placeholder="Write a comment..."
        onChange={handleChange}
        value={comment}
      />
      <div className="flex justify-start">
        {isComment ? (
          <button className="btn bg-color-accent text-color-dark">Submitted</button>
        ) : (
          <button
            onClick={handleAddComment}
            className="btn bg-color-accent text-color-dark"
          >
            Post Comment
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
