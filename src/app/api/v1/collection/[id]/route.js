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
      return Response.json({ status: 200, isCreated: true });
    } else {
      return Response.json({ status: 500, isDeleted: false });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500, isDeleted: false });
  }
};
