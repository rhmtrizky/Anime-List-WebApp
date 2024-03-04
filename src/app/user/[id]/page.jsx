import CollectionComment from '@/components/CollectionAndComment/CollectionComment';
import authUserSession from '@/libs/auth';
import prisma from '@/libs/prisma';
import { Avatar } from '@mui/material';

const DetailUser = async ({ params: { id } }) => {
  const user = await authUserSession();
  const detailUser = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      collections: true,
      comments: true,
    },
  });
  return (
    <div className="w-full border-color-accent p-3 min-h-screen">
      <div className="flex flex-col items-center gap-3 mt-2">
        <h1 className="text-color-primary font-bold text-2xl">Your Profile</h1>

        <Avatar
          className="border-2 border-color-primary"
          src={detailUser?.image}
          alt="..."
          width="250"
          height="250"
          sx={{ width: 230, height: 230 }}
        />
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl text-color-primary">{detailUser?.username}</h1>
          <h4 className="text-12px text-color-accent">{detailUser?.email}</h4>
        </div>
      </div>

      <div className="mt-4">
        <CollectionComment
          collection={detailUser?.collections}
          comments={detailUser?.comments}
          user={detailUser}
          userLogin={user}
        />
      </div>
    </div>
  );
};

export default DetailUser;
