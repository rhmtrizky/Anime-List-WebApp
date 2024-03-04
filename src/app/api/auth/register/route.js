import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST = async (request, callback) => {
  try {
    const body = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return callback(false);
    }

    if (!body.email || !body.username || !body.password) {
      return callback(false);
    }

    const hashPassword = await bcrypt.hash(body.password, 10);

    const register = await prisma.user.create({
      data: {
        email: body.email,
        password: hashPassword,
        username: body.username,
      },
    });

    return NextResponse.json(register);
  } catch (error) {
    console.error('Error during user registration:', error);
    return callback(false);
  } finally {
    await prisma.$disconnect();
  }
};
