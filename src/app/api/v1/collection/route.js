import authUserSession from '@/libs/auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  const { anime_mal_id, anime_image, anime_title, userId } = await request.json();

  const data = { anime_mal_id, anime_image, anime_title, userId };

  const res = await prisma.collection.create({ data });
  if (!res) {
    return Response.json({ status: 500, isCreated: false });
  } else {
    return Response.json({ status: 200, isCreated: true });
  }
};

export const GET = async () => {
  const user = await authUserSession();

  const res = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
  });
  return NextResponse.json(res);
};
