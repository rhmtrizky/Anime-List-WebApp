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

    try {
      const response = await fetch('/api/v1/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        router.refresh();
        setIsComment(true);
        setComment('');
        setTimeout(() => {
          setIsComment(false);
        }, 3000);
      } else {
        // Handle error response
        console.error(result.message);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
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
          <button
            className="btn bg-color-accent text-color-dark"
            disabled
          >
            Submitted
          </button>
        ) : (
          <button
            onClick={handleAddComment}
            className="btn bg-color-accent text-color-dark hover:bg-color-accent2"
          >
            Post Comment
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
