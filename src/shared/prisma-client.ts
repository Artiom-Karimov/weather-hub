import { PrismaClient } from '@prisma/client';

export class PrismaConnection extends PrismaClient {
  async connect(): Promise<void> {
    await this.$connect();
  }
}
