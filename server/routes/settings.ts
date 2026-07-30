import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin } from '../middleware/auth';

export const settingsRouter = Router();

function serialize(settings: { storeName: string; freeShippingThreshold: number; announcementMessages: string }) {
  let announcementMessages: string[] = [];
  try {
    announcementMessages = JSON.parse(settings.announcementMessages);
  } catch {
    announcementMessages = [];
  }
  return {
    storeName: settings.storeName,
    freeShippingThreshold: settings.freeShippingThreshold,
    announcementMessages,
  };
}

settingsRouter.get('/', async (_req, res) => {
  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, announcementMessages: '[]' },
  });
  res.json(serialize(settings));
});

settingsRouter.put('/', requireAdmin, async (req, res) => {
  const { storeName, freeShippingThreshold, announcementMessages } = req.body as {
    storeName?: string;
    freeShippingThreshold?: number;
    announcementMessages?: string[];
  };

  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      ...(storeName?.trim() ? { storeName: storeName.trim() } : {}),
      ...(typeof freeShippingThreshold === 'number' && freeShippingThreshold > 0
        ? { freeShippingThreshold }
        : {}),
      ...(Array.isArray(announcementMessages)
        ? { announcementMessages: JSON.stringify(announcementMessages) }
        : {}),
    },
    create: {
      id: 1,
      storeName: storeName?.trim() || undefined,
      freeShippingThreshold: freeShippingThreshold || undefined,
      announcementMessages: JSON.stringify(announcementMessages ?? []),
    },
  });

  res.json(serialize(settings));
});
