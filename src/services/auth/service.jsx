import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function signIn(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error during sign-in:', err);
    throw new Error('Error during sign-in');
  } finally {
    await prisma.$disconnect();
  }
}

export async function loginWithGoogle(data, callback) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      callback(user);
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: data.email,
          image: data.image,
          username: data.username,
        },
      });

      if (newUser) {
        return NextResponse.json(newUser);
      }
    }
  } catch (err) {
    console.error('Error during sign-in:', err);
    throw new Error('Error during sign-in');
  }
}

export async function loginWithGithub(data, callback) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      callback(user);
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: data.email,
          image: data.image,
          username: data.username,
        },
      });

      if (newUser) {
        return NextResponse.json(newUser);
      }
    }
  } catch (err) {
    console.error('Error during sign-in:', err);
    throw new Error('Error during sign-in');
  }
}
