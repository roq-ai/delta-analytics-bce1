import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { themeValidationSchema } from 'validationSchema/themes';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getThemes();
    case 'POST':
      return createTheme();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getThemes() {
    const data = await prisma.theme
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'theme'));
    return res.status(200).json(data);
  }

  async function createTheme() {
    await themeValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.theme_group?.length > 0) {
      const create_theme_group = body.theme_group;
      body.theme_group = {
        create: create_theme_group,
      };
    } else {
      delete body.theme_group;
    }
    const data = await prisma.theme.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
