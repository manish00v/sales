import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSettings = async () => {
  return await prisma.settings.findFirst();
};

export const updateSettings = async (data) => {
  const settings = await prisma.settings.findFirst();
  if (!settings) {
    return await prisma.settings.create({ data });
  }
  return await prisma.settings.update({
    where: { id: settings.id },
    data,
  });
};