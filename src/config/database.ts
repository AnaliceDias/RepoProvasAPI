import { PrismaClient } from '@prisma/client';

import './setup';

const client = new PrismaClient();

export default client;