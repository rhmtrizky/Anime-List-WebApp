import authUserSession from '@/libs/auth';
import prisma from '@/libs/prisma';

export const DELETE = async (request, { params: { id } }) => {
  const user = await authUserSession();
  try {
    const res = await prisma.collection.delete({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });
    if (res) {
      response.json({ status: 200, isDeleted: true });
    } else {
      response.json({ status: 500, isDeleted: false });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ status: 500, isDeleted: false });
  }
};
