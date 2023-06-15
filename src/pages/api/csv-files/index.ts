import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { csvFileValidationSchema } from 'validationSchema/csv-files';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCsvFiles();
    case 'POST':
      return createCsvFile();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCsvFiles() {
    const data = await prisma.csv_file
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'csv_file'));
    return res.status(200).json(data);
  }

  async function createCsvFile() {
    await csvFileValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.theme?.length > 0) {
      const create_theme = body.theme;
      body.theme = {
        create: create_theme,
      };
    } else {
      delete body.theme;
    }
    const data = await prisma.csv_file.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
