import authUserSession from '@/libs/auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  const { anime_mal_id, user_email, anime_image, anime_title } = await request.json();

  const data = { anime_mal_id, user_email, anime_image, anime_title };

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
      user_email: user?.email,
    },
  });
  return NextResponse.json(res);
};
