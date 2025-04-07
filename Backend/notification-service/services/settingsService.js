import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSettings = async () => {
  return await prisma.settings.findFirst();
};

export const createOrUpdateSettings = async (data) => {
  // Check if settings already exist
  const existingSettings = await prisma.settings.findFirst();
  
  if (existingSettings) {
    // Update existing settings
    return await prisma.settings.update({
      where: { id: existingSettings.id },
      data: {
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        timezone: data.timezone,
      },
    });
  } else {
    // Create new settings
    return await prisma.settings.create({
      data: {
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        timezone: data.timezone,
      },
    });
  }
};