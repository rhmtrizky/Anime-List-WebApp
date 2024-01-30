import authUserSession from '@/libs/auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const DELETE = async (request, { params: { id } }) => {
  try {
    const res = await prisma.collection.delete({ where: { id: Number(id) } });
    response.json({ status: 200, isDeleted: true });
  } catch (error) {
    console.error(error);
    response.status(500).json({ status: 500, isDeleted: false });
  }
};
