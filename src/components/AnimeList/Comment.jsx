import prisma from '@/libs/prisma';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

const Comment = async ({ anime_mal_id, user_image, user }) => {
  const comments = await prisma.comment.findMany({
    where: {
      anime_mal_id,
    },
    include: {
      user: true,
    },
  });
  return (
    <>
      <h1 className="font-bold text-xl px-4">Comments</h1>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="w-full px-5 border-b border-color-primary pb-4 my-4"
        >
          <Link href={`/user/${comment.user.id}`}>
            <div className="flex gap-3">
              <Avatar
                alt={comment.user.image}
                src={comment.user.image}
                className="object-fit"
              />
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <h3 className="font-bold text-base">{comment.user.username}</h3>
                  <p className="text-xs">{comment.user.email}</p>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Comment;
