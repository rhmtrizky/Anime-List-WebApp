import ButtonUser from '@/components/Button/ButtonCollection';
import authUserSession from '@/libs/auth';
import prisma from '@/libs/prisma';
import { Avatar } from '@mui/material';

const PageUser = async () => {
  const user = await authUserSession();
  const collection = await prisma.collection.findMany({
    where: {
      user_email: user?.email,
    },
  });
  console.log('collection', collection);

  return (
    <div className="w-full border-color-accent p-3">
      <div className="flex flex-col items-center gap-3 mt-8">
        <h1 className="text-color-primary font-bold text-2xl">Your Profile</h1>
        <Avatar
          className="border-2 border-color-primary"
          src={user?.image}
          alt="..."
          width="250"
          height="250"
          sx={{ width: 230, height: 230 }}
        />
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl text-color-primary">{user?.name}</h1>
          <h4 className="text-12px text-color-accent">{user?.email}</h4>
        </div>
      </div>
      <div className="mt-4">
        <ButtonUser collection={collection} />
      </div>
    </div>
  );
};

export default PageUser;
